import ExcelJS from "exceljs"
import axios from "axios";

import _ from 'lodash'

export default async function exportPenjualan(req, res) {
    const { query, method } = req
    const {start, end} = req.body

    const tanggal = (date)=>new Date(date).toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour12: false,
      })

    const fetchData = async () => {
        const objek = await axios
            .get(process.env.NEXT_PUBLIC_API_URI + '/objects')
            .then((res) => {
                return res.data
            })
        const json = await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI +
          `/bookings?status=success&${start != ''?'created_at_gte='+start: ''}&${end != ''?'created_at_lte='+end: ''}`
        )
        .then((res) => {
          return res.data.map(d=>({...d, penginapan: objek.filter(o=>o.id==d.room.object)[0].name}))
        })

        return json
    }

    const generate = async (req, res) => {
        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.readFile('./src/templates/laporan-penginapan.xlsx');
    
        const sheet = workbook.worksheets[0];
        sheet.getRow(1).getCell(1).value = `Laporan Booking Penginapan Periode ${start != ''? tanggal(start) : '-'} s/d ${end != ''?tanggal(end):'-'}`;
    
        const json = await fetchData()

        let rowStart = 4;

        for (let i = 0; i < json.length; i++) {
            const order = json[i];

            sheet.getRow(rowStart + i).getCell(1).value = order.created_at.slice(0, 10)
            sheet.getRow(rowStart + i).getCell(2).value = order.id
            sheet.getRow(rowStart + i).getCell(3).value = order.name
            sheet.getRow(rowStart + i).getCell(4).value = order.email
            sheet.getRow(rowStart + i).getCell(5).value = order.checkin 
            sheet.getRow(rowStart + i).getCell(6).value = order.checkout 
            sheet.getRow(rowStart + i).getCell(7).value = order.penginapan 
            sheet.getRow(rowStart + i).getCell(8).value = order.room.name
            sheet.getRow(rowStart + i).getCell(9).value = order.price
        }

        const filedate = Date.now();

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + `laporan-penginapan-${filedate}.xlsx`
        );
    
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    }
    


    switch (method) {
      case 'POST':
        await generate(req, res)
        break
      default:
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }