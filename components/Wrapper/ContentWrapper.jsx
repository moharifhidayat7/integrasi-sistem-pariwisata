import { Pane } from 'evergreen-ui'
import style from './ContentWrapper.module.scss'
const ContentWrapper = ({ children }) => {
  return (
    <Pane
      className={`container ${style.contentWrapperMargin}`}
      backgroundColor='#f4f6fa'
    >
      {children}
    </Pane>
  )
}

export default ContentWrapper
