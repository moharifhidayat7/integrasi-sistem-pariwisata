import { formatRp } from '@helpers/functions'
import _ from 'lodash'
const Ongkir = ({ data, active, onClick }) => {
  return (
    <div
      className={`card p-3 col-sm-12 col-md-6 col-lg-4 col-xl-3 border ${
        active.service == data.service ? 'border-3 border-success' : ''
      }`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <strong>JNE {data.service}</strong>
      Estimasi : {data.cost[0].etd} Hari
      <br />
      Ongkir : {formatRp(data.cost[0].value)}
    </div>
  )
}

export default Ongkir
