import React, { useState } from 'react'
import Chat from './Chat'

const Home = () => {
  const[message,setMessage]=useState('');

  const handleSend=()=>{
      if(!message.trim()){
        return(
          message
          
        )
      }
    
  }
  return (
    <div className='flex relative'>
      <Chat className='px-6' />

      <div className='bg-white h-96 w-96 flex justify-center '>
{/* 

*/}
<div>
  {message}
</div>

        <div className='absolute bottom-2 flex gap-4'>
        <input type="text" className='bg-amber-50 border
         w-72 'placeholder='Enter your text'
         onChange={(e)=>setMessage(e.target.value)}
         value={message} />
<h1 className='bg-black text-white px-2 py-1 rounded-lg active:bg-amber-950 cursor-pointer'
onClick={()=> handleSend()}>send</h1>
        </div>
       
      </div>
    </div>
  )
}

export default Home
