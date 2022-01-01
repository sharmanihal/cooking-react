import './App.css'
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'

//pages
import Create from './pages/create/Create'
import Home from './pages/home/Home'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'

//Styles
import './App.css'
//components
import Navbar from './components/Navbar'
import ThemeSelector from './components/ThemeSelector'
import { useTheme } from './hooks/useTheme'
function App() {
  const {mode}=useTheme()
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar></Navbar>
        <ThemeSelector/>

        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/create' element={<Create/>}></Route>
          <Route exact path='/search' element={<Search/>}></Route>
          <Route exact path='/recipes/:id' element={<Recipe/>}></Route>
          <Route path="*" element={<Navigate to='/'/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
