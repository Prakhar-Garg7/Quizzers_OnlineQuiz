import React, { useEffect, useState } from "react";

function Github(){
    const [data,setData]=useState([])
    useEffect(()=>{ 
        fetch('https://api.github.com/users/keshavk27')
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setData(data)

        })
    },[])

    return (
        <>
        <div className="text-center m-4 bg-gray-500 text-white p-3 text-3xl">GitHub Id: {data.name} </div>
        <div className="text-center m-4 bg-gray-500 text-white p-3 text-3xl">GitHub follower: {data.followers} </div>
        </>
    )
}

export default Github