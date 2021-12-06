import Layout from '@components/Layouts/Admin'
import Content from '@components/Content'
import { Button, PrintIcon, Table } from 'evergreen-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Parkir = () => {
  const router = useRouter()

  const commonProperties = {
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
    animate: true,
    enableSlices: 'x',
  }

  return (
    <Layout title='Parkir'>
      <Content>
        <Content.Header
          title='Laporan Parkir'
          //   button={
          //     <Link href={`${router.asPath}/tambah`}>
          //       <a>
          //         <Button size='large' iconBefore={PrintIcon}>
          //           Download QR Code
          //         </Button>
          //       </a>
          //     </Link>
          //   }
        />
        <Content.Body>
          <div>
            <div className='row gy-3'>
              <Table>
                <Table.Head>
                  <Table.TextHeaderCell>No. Urut</Table.TextHeaderCell>
                  <Table.TextHeaderCell>Nomor Polisi</Table.TextHeaderCell>
                  <Table.TextHeaderCell>Jenis Kendaraan</Table.TextHeaderCell>
                  <Table.TextHeaderCell>Check In</Table.TextHeaderCell>
                  <Table.TextHeaderCell>Check Out</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                  {[1, 2, 3, 4, 5, 6, 7, 78, 8].map((profile, index) => (
                    <Table.Row key={index}>
                      <Table.TextCell>{index}</Table.TextCell>
                      <Table.TextCell>B-01256</Table.TextCell>
                      <Table.TextCell>Mobil</Table.TextCell>
                      <Table.TextCell>
                        {new Date().toLocaleString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour12: false,
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </Table.TextCell>
                      <Table.TextCell>
                        {new Date().toLocaleString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour12: false,
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </Table.TextCell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </Content.Body>
      </Content>
    </Layout>
  )
}

export default Parkir
