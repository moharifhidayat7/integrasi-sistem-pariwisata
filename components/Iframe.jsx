import { Pane } from 'evergreen-ui'
import './Iframe.module.scss'

const Iframe = ({ url = '', height = 290 }) => {
  return (
    <Pane className='videowrapper' position='relative'>
      <iframe
        width='100%'
        height={height}
        src={url}
        title='Video Profil'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </Pane>
  )
}

export default Iframe
