
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import './Navbar.css'
import SearchBar from './SearchBar'

export default function Navbar() {
    const {color,changeColor}=useTheme()
    return (
        <div className='navbar' style={{background:color}}>
            <nav>
                <Link className="brand" to='/'>
                    <h1>Cooking Ninja</h1>
                </Link>
                <SearchBar></SearchBar>
                <Link to='/create'>
                    <h1>Create Recipe</h1>
                </Link>
              
            </nav>
        </div>
    )
}
