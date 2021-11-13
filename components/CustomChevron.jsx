import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowBarRight,
  ArrowDownLeftSquareFill,
} from 'react-bootstrap-icons'
const CustomChevron = ({ direction, className, style: customStyle }) => {
  return (
    <div className={className}>
      {direction == 'left' ? (
        <ChevronLeft
          size={60}
          className='iconChev shadow'
          style={customStyle}
        />
      ) : (
        <ChevronRight
          size={60}
          className='iconChev shadow'
          style={customStyle}
        />
      )}
    </div>
  )
}

export default CustomChevron
