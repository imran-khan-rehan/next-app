import React from 'react'

export default function ShareWithMeDetails({ Open, task, onclose }) {
    return (
        <div className={`fixed z-30  top-0 left-0 w-screen  right-0 h-screen    bg-opacity-30 bg-black transition-opacity ${Open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none '}`}>
        <div className=" absolute top-[2vh] sm:left-[12%] p-3   w-1/2 h-[95vh] max-sm:w-screen   rounded-lg shadow-md flex flex-row  max-md:bg-rose-300 flex-col gap-7 overflow-y-auto bg-white">
            <span className='flex flex-row justify-between'>
                <p>Task Details</p>
                <span className=' cursor-pointer' onClick={() => { onclose(false) }}>X</span>
            </span>
            <div className='flex flex-row justify-between bg-slate-200 p-3'>
                <span className='whitespace-nowrap'>Title</span>
                <span className='w-[65%]  break-words'>{task.title}</span>
            </div>
            <div className='flex flex-row justify-between bg-slate-200 p-3'>
                <span className='flex-1' >Subject</span>
                <span className='w-[65%]'>{task.subname}</span>

            </div>
           
            <div className='flex flex-row justify-between bg-slate-200 p-3'>
                <span className='flex-1'>Share by</span>
                <span className='w-[65%]'>{task.shareBy}</span>
            </div>
            <div className='flex flex-row justify-between bg-slate-200 p-3'>
                <span className='flex-1'>Due date</span>

                <div className=' w-[65%] text-base   text-black font-medium rounded-md '>
                    {task.due_date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ',' + task.due_date.getFullYear()}
                </div>

            </div>
        </div>
    </div>
    )
}
