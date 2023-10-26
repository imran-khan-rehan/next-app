import React, { useEffect, useState } from 'react'
import { destroyCookie, parseCookies } from 'nookies';
export default function CreateNewTaskHead({openForm,username}) {
  const cookies = parseCookies();
  const userId = cookies.userId;
  const uname = cookies.username;
  const [name,setname]=useState('');
  useEffect(()=>{
setname(uname);
  },[]);
  return (
    <div className='mt-8 shadow-custom  m-5  bg-white rounded-md  flex flex-col gap-5 p-5'>
      <div className='text-3xl font-semibold'> Hi {name}!</div>
      <div className='f font-normal text-lg text-[#222F43]'>Welcome back to your trusted and efficient to-do list app.</div>
      <div onClick={openForm} className='cursor-pointer font-semibold text-lg px-5 py-3 bg-yellow-500 w-fit rounded-md text-white'>Create a new task</div>
    </div>
  )
}
