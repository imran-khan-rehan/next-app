import React, { useState } from 'react'
import ShareByMe from './taskShareByMe';
import ShareWithMe from './taskShareWithMe';
import AllReminders from './allReminders';
export default function Reminder({userId,setClone}) {
  const [isReminder, setIsReminder] = useState(true);
  const [isShareWithMe, setShareWithMe] = useState(false);
  const [isShareByMe, setShareByMe] = useState(false);

  return (
    <div className='flex flex-col'>
    <div className='w-full flex flex-row rounded font-semibold flex-wrap gap-3 justify-around p-2 text-black border'>
      <span onClick={()=>{setIsReminder(true),setShareByMe(false),setShareWithMe(false) }} className={` cursor-pointer bg-[#F6F6F6] px-2 py-1 rounded ${isReminder?'bg-yellow-500 text-white':''}`} >Reminders</span>
      <span onClick={()=>{setIsReminder(false),setShareByMe(false),setShareWithMe(true) }} className={` cursor-pointer bg-[#F6F6F6] px-2 py-1 rounded ${isShareWithMe?'bg-yellow-500 text-white':''}`}>Task Shared with me</span>
      <span onClick={()=>{setIsReminder(false),setShareByMe(true),setShareWithMe(false) }} className={` cursor-pointer bg-[#F6F6F6] px-2 py-1 rounded ${isShareByMe?'bg-yellow-500 text-white':''}`}>Task Shared by me</span>
      </div>
      <div className={`${isReminder ? 'w-[]' : 'hidden'}`}>
        <AllReminders userId={userId}/>
      </div>
      <div className={`${isShareByMe ? '' : 'hidden'}`}>
        <ShareByMe userId={userId}/>
      </div>
      <div className={`${isShareWithMe ? '' : 'hidden'}`}>
        <ShareWithMe userId={userId} setClone={setClone}/>
      </div>
    </div>
    
  )
}
