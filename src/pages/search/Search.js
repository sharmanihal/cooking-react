import { useLocation } from 'react-router-dom'
import RecipeList from '../../components/RecipeList';
import { useFetch } from '../../hooks/useFetch';
import './Search.css'

export default function Search() {
    const queryParam=useLocation().search
    const params=new URLSearchParams(queryParam);
    const query=params.get('q')
    const url='http://localhost:3000/recipes?q='+query
    const {data,isPending,error}=useFetch(url)
    return (
        <div>
            <h2 className='page-title'>
                Recipes including "{query}"
            </h2>
            
            {error && <p className='error'>{error}</p>}
           {isPending && <p className="loading">Loading...</p>}
           {data && <RecipeList recipes={data}></RecipeList>}
           
        </div>
    )
}
