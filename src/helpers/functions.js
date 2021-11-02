export function formatRp(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
    .format(number)
    .slice(0, -3)
}
