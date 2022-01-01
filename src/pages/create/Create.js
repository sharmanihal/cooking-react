import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { projectFirestore } from '../../firebase/config';
import { useTheme } from '../../hooks/useTheme';
import './Create.css'

export default function Create() {
    const [title,setTitle]=useState('');
    const [method,setMethod]=useState('')
    const [cookingTime,setCookingTime]=useState('')
    const [newIngredient,setNewIngredient]=useState('')
    const [ingredients,setIngredients]=useState([])
    const ingredientInput=useRef(null)
   
    const navigate =useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const doc ={title,ingredients,method,cookingTime:cookingTime+' minutes'}
        
        try{
            await projectFirestore.collection('recipes').add(doc)
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }
    const handleAdd=(e)=>{
        e.preventDefault();
        const ing=newIngredient.trim();
        if(ing && !ingredients.includes(ing)){
            setIngredients(prevIng=>[...prevIng,ing])
        }
        setNewIngredient('')
        ingredientInput.current.focus()
    }
    const {color}=useTheme();
    return (
        <div className='create'>
            <h2 className='page-title'>Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe title:</span>
                    <input
                        type='text'
                        onChange={(e)=>setTitle(e.target.value)}
                        value={title}
                        required></input>
                </label>
                <label>
                    <span>Recipe ingredients:</span>
                    <div className='ingredients'>
                        <input ref={ingredientInput}
                         type='text' value={newIngredient} onChange={(e)=>setNewIngredient(e.target.value)}></input>
                        <button className='btn' style={{background:color}} onClick={handleAdd}>add</button>
                    </div>
                    <p>Current ingredients :
                    {ingredients.map(function(ing){
                        return (
                            <em key={ing}>{ing}, </em>
                        )
                    })}</p>
                </label>
                <label>
                    <span>Recipe method:</span>
                    <textarea
                        onChange={(e)=>setMethod(e.target.value)}
                        value={method}
                        required></textarea>
                </label>
                <label>
                    <span>Cooking time (minutes):</span>
                    <input
                        type='number'
                        onChange={(e)=>setCookingTime(e.target.value)}
                        value={cookingTime}
                        required></input>
                </label>

                <button style={{background:color}} className="button">Submit</button>
            </form>
        </div>
    )
}
