import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export default function ShareWithMeGrid({ task, deleteItem, openDetail,makeCloneOfTask,index }) {
    const [flag, setflag] = useState(true);

    return (
        <>
            {
                flag ? (
                    <div className='  border min-w-[280px] max-w-[290px] p-5  bg-orange-200 flex flex-col  gap-4 rounded-md'>
                        <div className='flex flex-row justify-between'>
                            <span onClick={() => { openDetail(task) }} className='cursor-pointer text-2xl font-semibold'>
                                {task.title.length > 12 ? `${task.title.slice(0, 11)}...` : task.title}
                            </span>

                            <div onClick={()=>deleteItem(task,index)} className=' cursor-pointer'>
                                {/* <Image onClick={()=>{openNotification(task)}} className=' cursor-pointer' src={notImage} width={22} height={22} alt='notification'></Image> */}
                                <span>X</span>
                            </div>
                        </div>
                        <div className='w-fit'>
                            {/* <Image src={schedule} width={15} height={15} alt='date'></Image> */}
                            <p className='text-base  font-medium bg-white px-2 p-1'>
                                {task.shareBy}
                            </p>
                        </div>
                        <div className='flex justify-center text-center '>
                            <div className='w-full bg-white flex flex-row gap-4 rounded-md  flex-wrap justify-start'>
                                <div className='min-w-[78px]  max-w-fit   px-2 py-2  justify-start text-center'>
                                    {task.subname}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-4  '>
                            <div className='text-base whitespace-nowrap max-w-fit bg-white px-2 p-1 text-black font-medium rounded-md p-[5px] px-4'>
                        {task.due_date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ',' + task.due_date.getFullYear()}

                            </div>
                            <div onClick={() => { makeCloneOfTask(task,index)}} className={`${task.clone === 'clone' ? 'cursor-pointer bg-white' : ' bg-red-200'} elipses text-base font-medium px-2 py-1 rounded-md `}>{task.clone}</div>
                        </div>
                    </div>
                ) : ''}
        </>
    )
}
