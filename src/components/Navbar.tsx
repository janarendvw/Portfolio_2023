import { Link } from 'react-router-dom'

type Props = {}

function Navbar({}: Props) {
  return (
    <>
    <div className='flex gap-12 absolute top-8 right-12 tracking-wide font-medium'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
        <Link to='/projects'>Projects</Link>
    </div>
    </>
  )
}

export default Navbar