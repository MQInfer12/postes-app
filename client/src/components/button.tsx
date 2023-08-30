interface Props {
  children: string
  onClick: () => any
}

const Button = ({ onClick, children }: Props) => {
  return (
    <button onClick={onClick} className='button'>{ children }</button>
  )
}

export default Button