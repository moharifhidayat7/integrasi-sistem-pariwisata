import { Pane } from 'evergreen-ui'
import NavMenu from './NavMenu'

const Sidebar = () => {
  return (
    <Pane width={250} height='100vh' backgroundColor='#474D66' position='fixed'>
      <NavMenu />
    </Pane>
  )
}

export default Sidebar
