const Index = () => {
  return <></>
}

export default Index

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/pengelola/dashboard',
      permanent: false,
    },
  }
}
