import React, { useEffect } from 'react'
import Image from 'next/image'
import list from '@/public/icons/list.svg'
import grid from '@/public/icons/grid.svg'
import DropdownMenu from './dropDownMenu'
import { destroyCookie, parseCookies, setCookie } from 'nookies';

export default function Sorting({name, gridview, setgridview, selectedpriority, Setselectedpriority, priorities, selectedstatus, Setselectedstatus, allstatuses, sortbydate }) {
    

    return (
        <div className='my-5 flex flex-row justify-between max-lg:flex-col'>
            <div className='text-black 0 font-semibold text-3xl py-2 px-6 rounded-md whitespace-nowrap'>
                {name}
            </div>
            <div className='flex flex-row flex-wrap gap-3 items-center'>
                <div className='  cursor-pointer h-fit rounded-md text-base font-medium min-w-[163px] '>
                    <DropdownMenu statusColors={["jkff"]} heading={''} selectedvalue={selectedpriority} SetselectedValue={Setselectedpriority} statuses={priorities} />
                </div>
                <div className='  cursor-pointer h-fit rounded-md text-base font-medium min-w-[163px]'>
                    <DropdownMenu statusColors={["jkff"]} heading={''} selectedvalue={selectedstatus} SetselectedValue={Setselectedstatus} statuses={allstatuses} />
                </div>
                <div onClick={sortbydate} className='hover:bg-yellow-500 hover:text-white cursor-pointer bg-[#F6F6F6] px-4 py-2 h-fit rounded-md text-base font-semibold'>
                    Sorts by date
                </div>
                <div onClick={() => { setgridview(false) }} className={`cursor-pointer flex flex-row  justify-between  w-[80px] max-lg:hidden ${gridview?'bg-[#F6F6F6] rounded-md':' pl-9 '}`}>
                    <div className={`${gridview ? 'p-2' : 'p-2 bg-yellow-500 rounded-md'} `}>
                        <Image className={`${gridview ? '' : 'invert'} `} src={list} width={21} height={21} alt='list'></Image>
                    </div>
                    <span className={`${gridview ? 'p-2' : 'hidden'}`}>List</span>
                </div>
                <div onClick={() => { setgridview(true) }} className={` cursor-pointer  flex flex-row justify-between  w-[90px] max-lg:hidden ${gridview?'justify-center':'bg-[#F6F6F6] rounded-md '}`}>
                    <div className={`${gridview ? 'p-2 bg-yellow-500 rounded-md' : 'p-2'} `} >  <Image className={`${gridview ? 'invert' : ''} `} src={grid} width={19} height={19} alt='grid'></Image></div>
                    <span className={`${gridview ? 'hidden' : 'p-2'} `}>Grid</span>
                </div>
            </div>
        </div>
    )
}
