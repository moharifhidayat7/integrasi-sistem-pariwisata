import { Pane } from 'evergreen-ui'
import style from './ContentWrapper.module.scss'
const ContentWrapper = ({ children }) => {
  return (
    <Pane className={`container ${style.contentWrapperMargin}`}>
      {children}
    </Pane>
  )
}

export default ContentWrapper
