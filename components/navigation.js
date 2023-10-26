import React from 'react'
import Image from 'next/image'
import navigationBtn from '@/public/icons/navigation.svg'

export default function Navigation({openMenu}) {
  return (
    <div className='w-screen flex flex-row justify-between p-3'>
            <p className='font-bold py-[12px] text-2xl'>OrganizeIB</p>
            <Image onClick={() =>{openMenu(true)}} src={navigationBtn} width={20} height={15} alt='menu' />
    </div>
  )
}
