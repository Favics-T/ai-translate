import React from 'react'
import { Link } from 'react-router-dom'

const Chat = () => {
  return (
    <div>
      <div className='flex flex-col gap-4 bg-gray-200 justify-center h-screen items-center'>
        <h1 className='text-3xl font-bold text-[#09122C]'>Welcome to <span className='text-blue-800'>PGpt</span></h1>
       <Link to='/chats'><p className='bg-[#09122C] px-2 py-1 rounded-[8px] hover:bg-pink-800 hover:font-bold text-[rgb(255,105,140)] cursor-pointer'>Get Started </p></Link> 
      </div>
    </div>
  )
}

export default Chat
