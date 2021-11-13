import Layout from '@components/Layout'
const ClientLogin = ({ children, title }) => {
  return (
    <Layout title={title} withFooter={false}>
      <div className='container'>{children}</div>
    </Layout>
  )
}

export default ClientLogin
