import Layout from '@components/Layouts/Admin'
import Content from '@components/Content'
import { Button, PrintIcon, Table, BarcodeIcon } from 'evergreen-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ResponsiveLine } from '@nivo/line'
import { area, curveMonotoneX } from 'd3-shape'
import * as time from 'd3-time'
import { timeFormat } from 'd3-time-format'
import useSWR from 'swr'
import { useState } from 'react'
import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import _ from 'lodash'

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
const Pengunjung = ({ session }) => {
  const router = useRouter()

  const getPengunjung = async (url) => {
    const json = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }).then((res) => res.json())
    const d = json.map((j) => ({ x: j.created_at.slice(0, 10), y: j.people }))

    return _.chain(d)
      .groupBy((s) => s.x)
      .map((value, key) => ({
        x: key,
        y: _.sumBy(value, 'y'),
      }))
      .value()
  }

  const { data, mutate, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URI}/visitors`,
    getPengunjung
  )

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
            <Button
              size='large'
              iconBefore={BarcodeIcon}
              onClick={() => console.log(data)}
            >
              Download QR Code
            </Button>
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
                      id: 'Pengunjung',
                      data: data ? data : [{ x: '2021-12-12', y: 0 }],
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
export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: { session },
  }
}
