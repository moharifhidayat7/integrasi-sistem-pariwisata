import Layout from '@components/Layouts/Admin'
import Content from '@components/Content'
import { Heading, Pane, Card, Text } from 'evergreen-ui'

const index = () => {
  return (
    <Layout title='Dashboard'>
      <Content>
        <Content.Body>
          <Pane className='mt-5'>
            <Heading is='h1' size={900} className='pb-4'>
              Dashboard
            </Heading>
            <Pane>
              {/* <Card
                elevation={1}
                float='left'
                className='col-3 bg-white'
                height={120}
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
              >
                <Text>Penjualan Produk</Text>
                <Text size={300}>100</Text>
              </Card> */}
            </Pane>
          </Pane>
        </Content.Body>
      </Content>
    </Layout>
  )
}

export default index
