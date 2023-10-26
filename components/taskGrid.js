import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import notImage from '@/public/icons/alarm.svg'
import share from '@/public/icons/share.svg'
import schedule from '@/public/icons/schedule.svg'
import edit from '@/public/icons/pencil.svg'

import { subPrioStatType } from '@/lib/actions/user.actions'
export default function TaskGrid({ task, openDetail,openShare,openNotification }) {
    const [flag, setflag] = useState(true);

    return (
        <>
            {
                flag ? (
                    <div className='  border min-w-[280px] max-w-[285px] p-5  bg-orange-200 flex flex-col  gap-4 rounded-md'>
                        <div className='flex flex-row justify-between'>
                            <span onClick={() => { openDetail(task) }} className='cursor-pointer whitespace-nowrap text-2xl font-semibold'>
                                {task.title.length > 12 ? `${task.title.slice(0, 11)}...` : task.title}
                            </span>

                            <div className='flex flex-row gap-3 pl-2'>
                            <Image onClick={()=>{openDetail(task)}} className=' cursor-pointer' src={edit} width={15} height={15} alt='notification'></Image>

                                <Image onClick={()=>{openNotification(task)}} className=' cursor-pointer' src={notImage} width={22} height={22} alt='notification'></Image>
                                <Image onClick={()=>{openShare(task)}} className=' cursor-pointer' src={share} width={22} height={22} alt='share'></Image>
                            </div>
                        </div>
                        <div className='w-fit flex flex-row gap-3 bg-white p-2 rounded-md'>
                            <Image src={schedule} width={15} height={15} alt='date'></Image>
                            <p className='text-base  font-medium'>
                                {task.due_date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ',' + task.due_date.getFullYear()}
                            </p>
                        </div>
                        <div className='flex justify-center text-center '>
                            <div className='w-full bg-white flex flex-row gap-4 rounded-md  flex-wrap justify-start'>
                                <div className='elipses min-w-[78px]  max-w-fit   px-2 py-2  justify-start text-center'>
                                    {task.subname}
                                </div>


                            </div>
                        </div>
                        <div className='flex flex-row  gap-4'>
                            <div style={{ backgroundColor: task.scolor }} className='elipses text-base text-white whitespace-nowrap font-medium rounded-md p-[5px] '>
                                {task.sname}
                            </div>

                            <div style={{ backgroundColor: task.pcolor }} className='elipses text-base whitespace-nowrap text-white font-medium rounded-md p-[5px] '>{task.pname}</div>

                        </div>
                    </div>
                ) : ''}
        </>
    )
}
