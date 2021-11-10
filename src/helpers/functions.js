import axios from 'axios'

export function formatRp(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
    .format(number)
    .slice(0, -3)
}

export function YouTubeGetID(url) {
  url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/)
  return undefined !== url[2] ? url[2].split(/[^0-9a-z_\-]/i)[0] : ''
}

export function isValidEmail(email) {
  // eslint-disable-next-line no-useless-escape
  ;/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  )
}

export const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
})
