import Layout from '@components/Layout'
const ClientLogin = ({ children }) => {
  return (
    <Layout withFooter={false}>
      <div className='container'>{children}</div>
    </Layout>
  )
}

export default ClientLogin
