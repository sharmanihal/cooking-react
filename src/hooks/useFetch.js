import { useEffect, useState } from "react"

export const useFetch=(url,method='GET')=>{
const [data,setData]=useState(null)
const [isPending,setIsPending]=useState(false)
const [error,setError]=useState(null)
const [options,setOptions]=useState(null)
const postData=(postData)=>{
    setOptions({
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(postData)
    }) 
}
    useEffect(() => {
        const controller=new AbortController();
        const fetchData=async (fetchOptions)=>{
            try{
            setIsPending(true)
            const response = await fetch(url,{...fetchOptions,signal:controller.signal})
            if(!response.ok){
                
                throw new Error("Couldn't fetch data !")
            }
            const jsonData= await response.json();
            setIsPending(false)
            setError(null)
            setData(jsonData)
            }catch(err){
                if(err.name==='AbortError'){
                    console.log(err.message)
                }else{
                setIsPending(false)
                setError(err.message)
                }
                
            }
        }
        if(method==='GET'){
            fetchData();
        }
        if(method ==="POST" && options){
            fetchData(options)
        }
        
        return()=>{
            controller.abort()
        }
    }, [url,options,method])

    return{data,isPending,error,postData}
}