import React from 'react'
import Image from 'next/image'
import notImage from '@/public/icons/alarm.svg'
import share from '@/public/icons/share.svg'
import schedule from '@/public/icons/schedule.svg'

export default function TaskList({ task, openDetail, openShare, openNotification }) {
    return (
        <div className='w-full bg-pink-100 flex flex-row  rounded-md py-2 max-lg:hidden px-2'>
            <div className='w-[15%]'>
                <p
                    onClick={() => { openDetail(task) }}
                    className='elipses cursor-pointer text-lg font-semibold'
                >
                    {task.title}
                </p>
            </div>

            <div className='flex flex-row gap-2 items-start  w-[32%] m-auto '>
                <div style={{ backgroundColor: task.scolor }} className='text-white elipses w-[55%] text-base font-medium rounded-md px-2 py-1 xl:pl-[10%]   whitespace-nowrap'>{task.sname}</div>
                <div style={{ backgroundColor: task.pcolor }} className='text-white elipses w-[45%] text-base font-medium rounded-md px-2 py-1 xl:pl-[10%] whitespace-nowrap'>{task.pname}</div>

            </div>
            <div className='w-[25%] elipses  flex justify-center text-center m-auto  font-medium text-base'>

                <div className='bg-white py-1  w-[80%] rounded-md '>  {task.subname}</div>


            </div>
            <div className='flex flex-row gap-2 elipses bg-white rounded-md  py-1 w-[20%] justify-center m-auto'>
                <Image src={schedule} width={15} height={15} alt='date'></Image>
                <p className='text-base  font-medium '>
                    {task.due_date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ',' + task.due_date.getFullYear()}
                </p>
            </div>
            <div className='flex flex-row gap-3 justify-end w-[10%]'>
                <Image onClick={() => { openNotification(task) }} className=' cursor-pointer' src={notImage} width={22} height={22} alt='notification'></Image>
                <Image onClick={() => { openShare(task) }} className=' cursor-pointer' src={share} width={22} height={22} alt='share'></Image>

            </div>
        </div>
    )
}
