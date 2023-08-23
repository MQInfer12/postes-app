import './modalContainer.css'

interface Props {
  title: string
  children: JSX.Element
  cerrar: () => void
}

const ModalContainer = ({ title, children }: Props) => {
  return (
    <div className='modalContainer-all'>
      <div className='modalContainer-bg' />
      <div className='modalContainer-container'>
        <div className='modalContainer-titleContainer'>
          <p>{title}</p>
          <button>Cerrar</button>
        </div>
        { children }
      </div>
    </div>
  )
}

export default ModalContainer