import { rajaOngkir } from '@helpers/functions'

export default async function ongkirHandler(req, res) {
  const { query, method } = req

  const getOngkir = async () => {
    return await rajaOngkir
      .post('/cost', {
        destination: query.destination,
        weight: query.weight,
        origin: 42,
        courier: 'jne',
      })
      .then((res) => {
        return res.data.rajaongkir.results
      })
  }

  switch (method) {
    case 'GET':
      res.status(200).json(await getOngkir())
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
