import Layout from '@components/Layouts/Admin'
import Content from '@components/Content'
import { Button, PrintIcon, Table, BarcodeIcon } from 'evergreen-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ResponsiveLine } from '@nivo/line'
import { area, curveMonotoneX } from 'd3-shape'
import * as time from 'd3-time'
import { timeFormat } from 'd3-time-format'
const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
  <g>
    <circle
      fill='#fff'
      r={size / 2}
      strokeWidth={borderWidth}
      stroke={borderColor}
    />
    <circle
      r={size / 5}
      strokeWidth={borderWidth}
      stroke={borderColor}
      fill={color}
      fillOpacity={0.35}
    />
  </g>
)
const Pengunjung = () => {
  const router = useRouter()

  const commonProperties = {
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
    animate: true,
    enableSlices: 'x',
  }

  return (
    <Layout title='Pengunjung'>
      <Content>
        <Content.Header
          title='Laporan Pengunjung'
          button={
            <Link href={`${router.asPath}/tambah`}>
              <a>
                <Button size='large' iconBefore={BarcodeIcon}>
                  Download QR Code
                </Button>
              </a>
            </Link>
          }
        />
        <Content.Body>
          <div>
            <div className='row my-5'>
              <div style={{ height: '25rem' }}>
                <ResponsiveLine
                  {...commonProperties}
                  data={[
                    {
                      id: 'fake corp. A',
                      data: [
                        { x: '2018-01-01', y: 7 },
                        { x: '2018-01-02', y: 5 },
                        { x: '2018-01-03', y: 11 },
                        { x: '2018-01-04', y: 9 },
                        { x: '2018-01-05', y: 12 },
                        { x: '2018-01-06', y: 20 },
                        { x: '2018-01-07', y: 13 },
                        { x: '2018-01-08', y: 13 },
                      ],
                    },
                  ]}
                  xScale={{
                    type: 'time',
                    format: '%Y-%m-%d',
                    useUTC: false,
                    precision: 'day',
                  }}
                  xFormat='time:%Y-%m-%d'
                  yScale={{
                    type: 'linear',
                  }}
                  axisBottom={{
                    format: '%b %d',
                    tickValues: 'every 2 days',
                    legendOffset: -12,
                  }}
                  enablePointLabel={true}
                  pointSymbol={CustomSymbol}
                  pointSize={16}
                  pointBorderWidth={1}
                  pointBorderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.3]],
                  }}
                  useMesh={true}
                  enableSlices={false}
                />
              </div>
            </div>
            {/* <div className='row'>
              <Table>
                <Table.Head>
                  <Table.TextHeaderCell>Last Activity</Table.TextHeaderCell>
                  <Table.TextHeaderCell>Last Activity</Table.TextHeaderCell>
                  <Table.TextHeaderCell>ltv</Table.TextHeaderCell>
                </Table.Head>
                <Table.Body>
                  {[1, 2, 3, 4, 5, 6, 7, 78, 8].map((profile, index) => (
                    <Table.Row key={index}>
                      <Table.TextCell>34</Table.TextCell>
                      <Table.TextCell>3434</Table.TextCell>
                      <Table.TextCell isNumber>3434</Table.TextCell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div> */}
          </div>
        </Content.Body>
      </Content>
    </Layout>
  )
}

export default Pengunjung
