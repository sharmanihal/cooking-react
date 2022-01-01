import { useEffect, useState } from 'react';
import {useParams } from 'react-router'
import { projectFirestore } from '../../firebase/config';

import { useTheme } from '../../hooks/useTheme';
import './Recipe.css'
export default function Recipe() {
const [data,setData]=useState(null)
const [isPending,setIsPending]=useState(false)
const [error,setError]=useState(false)
const {id} =useParams();
    useEffect(()=>{
        setIsPending(true);
        const unsub =projectFirestore.collection('recipes').doc(id).onSnapshot((doc)=>{
            if(!doc.exists){
                setIsPending(false)
                setError('The recipe does not exist')
            }else{
                setIsPending(false)
                setData(doc.data())
            }
        },(err)=>{
                setError(err.message)
                setIsPending(false)
        })

        return ()=>{
            unsub()
        }
    },[id])
    const {mode}=useTheme()

   const handleClick=()=>{
    projectFirestore.collection('recipes').doc(id).update({
        title:' Vey Stew Pizza'
    })
    }
    return (
        <div className={`recipe ${mode}`}>
            {error && <p className='error'>{error}</p>}
            {isPending && <p>Loading...</p>}
            {data && (
               <>
               <h2 className='page-title'>{data.title}</h2>
               <p>Takes {data.cookingTime} to cook</p>
               <ul>
                   {data.ingredients.map(ing=><li key={ing}>{ing}</li>)}
               </ul>
               <p className='method'>{data.method}</p>
               <button onClick={handleClick}>Update</button>
               </>
                )}
        </div>
    )
}
