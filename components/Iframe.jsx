import { Pane } from 'evergreen-ui'
import './Iframe.module.scss'

const Iframe = ({
  url = 'https://www.youtube.com/embed/tnGaCZZ5Z28',
  height = 290,
}) => {
  return (
    <Pane className='videowrapper' position='relative'>
      <iframe
        width='100%'
        height={height}
        src={url}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </Pane>
  )
}

export default Iframe
