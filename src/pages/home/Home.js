import { useEffect, useState } from 'react';
import RecipeList from '../../components/RecipeList';
import { projectFirestore } from '../../firebase/config';
import './Home.css'

export default function Home() {
const [data,setData]=useState(null)
const [isPending,setIsPending]=useState(false)
const [error,setError]=useState(false)
    useEffect(()=>{
        setIsPending(true)
        const unsub=projectFirestore.collection("recipes").onSnapshot((snapshot)=>{
            if(snapshot.empty){
                setError('No recipes to load');
                setIsPending(false);
            }else{
                let resource=[]
                snapshot.docs.forEach(doc => {
                    resource.push({id:doc.id,...doc.data()})
                });
                setData(resource)
                setIsPending(false)
            }
        },(err)=>{
            setError(err.message)
            setIsPending(false)
        })

        return()=>{
            unsub()
        }
    },[])

    return (
        <div className='home'>
           {error && <p className='error'>{error}</p>}
           {isPending && <p className='loading'>Loading...</p>}
           {data && <RecipeList recipes={data}></RecipeList>}
        </div>
    )
}
