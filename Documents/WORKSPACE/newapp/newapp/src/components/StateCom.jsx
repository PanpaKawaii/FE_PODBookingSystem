import React, { useEffect, useState } from 'react'

export default function StateCom() {
    const [count,setCount]= useState(0);
    const [vnd, setVND]= useState(0);
    useEffect(() =>{
        setVND(count*25000)
    }, [count] )
  return (
    <div>StateCom</div>
  )
}
