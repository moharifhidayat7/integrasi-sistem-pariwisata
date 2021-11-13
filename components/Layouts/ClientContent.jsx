import style from './ClientContent.module.scss'
const ClientContent = ({ children }) => {
  return <div className={style.clientContent}>{children}</div>
}

export default ClientContent
