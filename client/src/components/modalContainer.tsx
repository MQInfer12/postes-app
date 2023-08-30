import Button from './button'
import './modalContainer.css'

interface Props {
  title: string
  children: JSX.Element
  cerrar: () => void
}

const ModalContainer = ({ title, children, cerrar }: Props) => {
  return (
    <div className='modalContainer-all'>
      <div className='modalContainer-bg' />
      <div className='modalContainer-container'>
        <div className='modalContainer-titleContainer'>
          <p>{title}</p>
          <Button onClick={cerrar}>Cerrar</Button>
        </div>
        { children }
      </div>
    </div>
  )
}

export default ModalContainer