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
        const json = await axios
        .get(
          process.env.NEXT_PUBLIC_API_URI +
            `/orders?status=success&${start != ''?'created_at_gte='+start: ''}&${end != ''?'created_at_lte='+end: ''}`
        )
        .then((res) => {
          return res.data
        })

        return json
    }

    const generate = async (req, res) => {
        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.readFile('./src/templates/laporan-penjualan.xlsx');
    
        const sheet = workbook.worksheets[0];
        const sheet2 = workbook.worksheets[1];
        sheet.getRow(1).getCell(1).value = `Laporan Penjualan Periode ${start != ''? tanggal(start) : '-'} s/d ${end != ''?tanggal(end):'-'}`;
        sheet2.getRow(1).getCell(1).value = `Laporan Penjualan Produk Periode ${start != ''? tanggal(start) : '-'} s/d ${end != ''?tanggal(end):'-'}`;
    
        const json = await fetchData()

        let rowStart = 4;
        let produkRow = 4;

        for (let i = 0; i < json.length; i++) {
            const order = json[i];

            const subTotal = _.sumBy(
                order.items,
                (k) =>
                  k.qty * (k.variation.price + k.variation.fee)
              )
            const fee = _.sumBy(
                order.items,
                (k) =>
                  k.qty * k.variation.fee
              )

            const total = _.sumBy(
                order.items,
                (k) =>
                  k.qty * (k.variation.price + k.variation.fee)
              ) + order.ongkir
            sheet.getRow(rowStart + i).getCell(1).value = order.created_at.slice(0, 10)
            sheet.getRow(rowStart + i).getCell(2).value = order.id
            sheet.getRow(rowStart + i).getCell(3).value = order.users_permissions_user.name
            sheet.getRow(rowStart + i).getCell(4).value = order.users_permissions_user.email
            sheet.getRow(rowStart + i).getCell(5).value = subTotal 
            sheet.getRow(rowStart + i).getCell(6).value = order.ongkir 
            sheet.getRow(rowStart + i).getCell(7).value = fee 
            sheet.getRow(rowStart + i).getCell(8).value = {
                formula: `E${rowStart+i}+F${rowStart+i}`,
                result: total
            }
            
            for (let j = 0; j < order.items.length; j++) {
                const item = order.items[j];
                sheet2.getRow(produkRow + j).getCell(1).value = order.created_at.slice(0, 10)
                sheet2.getRow(produkRow + j).getCell(2).value = order.id
                sheet2.getRow(produkRow + j).getCell(3).value = item.product.name
                sheet2.getRow(produkRow + j).getCell(4).value = item.variation.variation
                sheet2.getRow(produkRow + j).getCell(5).value = item.product.object.name
                sheet2.getRow(produkRow + j).getCell(6).value = item.variation.price
                sheet2.getRow(produkRow + j).getCell(7).value = item.variation.fee
                sheet2.getRow(produkRow + j).getCell(8).value = item.qty
                
                sheet2.getRow(produkRow + j).getCell(9).value = {
                    formula: `(F${produkRow+j}+G${produkRow+j})*H${produkRow+j}`,
                    result: (item.variation.price + item.variation.fee) * item.qty
                }

                produkRow++
            }
        }

        const filedate = Date.now();

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + `laporan-penjualan-${filedate}.xlsx`
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