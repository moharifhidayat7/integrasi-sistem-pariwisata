const Index = () => {
  return <></>
}

export default Index

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/admin/dashboard',
      permanent: false,
    },
  }
}
