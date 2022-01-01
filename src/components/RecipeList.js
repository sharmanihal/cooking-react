import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import trashcan from '../assets/trashcan.svg'
import './RecipeList.css'
import { projectFirestore } from '../firebase/config';
export default function RecipeList({recipes}) {
    const {color}=useTheme();
    const {mode}=useTheme()
    if(recipes.length===0){
        return (<p className='page-title'>Oops no recipe with that name</p>)
    }
    const handleClick= (id)=>{
          projectFirestore.collection('recipes').doc(id).delete()
    }
 
    return (
        <div className='recipe-list'>
           {recipes.map(function(recipe){
               return(
                   <div className={`card ${mode}`} key={recipe.id}>
                       <h3>{recipe.title}</h3>
                       <p>{recipe.cookingTime} to make.</p>
                       <div>{recipe.method.substr(0,101)}...</div>
                       <Link style={{background:color,color:'white'}} to={'/recipes/'+recipe.id}>Cook This</Link>
                       <img
                       src={trashcan}
                       className='delete'
                       onClick={()=>handleClick(recipe.id)}
                       ></img>
                    </div>
               )
           })}
        </div>
    )
}
