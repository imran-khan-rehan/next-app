import React, { useEffect, useState, useRef } from 'react'
import Menulist from './menulist'
import ima from '@/public/icons/alltasks.svg'
import duetoday from '@/public/icons/duetoday.svg'
import archive from '@/public/icons/archive.svg'
import alarm from '@/public/icons/alarm.svg'
import logout from '@/public/icons/logout.svg'
import cross from '@/public/icons/cross.svg'

import subject from '@/public/icons/subject.svg'
import Image from 'next/image'
import { allSubjectsOfUser } from '@/lib/actions/user.actions'
import Loading from './Loading'
const  Menu=React.memo(({ userId, openMenu, getmenuItem, selected,allSubjects })=> {
  const [subjects, setsubjects] = useState(["jf", "ff"]);
  useEffect(() => {
    async function fetchPrograms() {
      try {
        const allPrograms = await allSubjectsOfUser(userId);
        console.log("all programs in menu are ",allPrograms);
        console.log("all subjects passed are ",allSubjects);
        setsubjects(allPrograms);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    }

    fetchPrograms();
  }, [allSubjects]);
  const dropdownRef = useRef(null);

  const closeDropdown = () => {
    // setIsOpenstatus(false);
    openMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={dropdownRef} className=' w-[300px]  flex flex-col gap-4 shadow-custom h-fit pb-[100px]  bg-white max-md:items-start z-50'>
      <div className='flex flex-row justify-between px-5 py-5 w-[244px]'>
        <div onClick={() =>{openMenu(false)}} className='md:hidden cursor-pointer  my-auto'>  <Image src={cross} width={15} height={15} /></div>
        <p className='font-bold  text-3xl max-md:text-lg '>OrganizeIB</p>
      </div>
      <div className='text-white rounded-md'>

        <Menulist isSelected={selected} getSelectedMenu={getmenuItem} name="All tasks" imageurl={<Image src={ima} width={25} height={25} alt='all' />} />
      </div>
      <div className=' rounded-md'>
        <Menulist isSelected={selected} getSelectedMenu={getmenuItem} name="Due Today" imageurl={<Image src={duetoday} width={25} height={25} alt='date' />} />
      </div>
      <div className='relative'>{subjects.length===0 &&(<Loading/>)}</div>
      {subjects && subjects.length ? (
        subjects.map((sub, index) => (
          <div key={index} className='rounded-md'>
            <Menulist isSelected={selected} getSelectedMenu={getmenuItem} name={sub.name} imageurl={<Image src={subject} width={25} height={25} alt='sub' />} />
          </div>
        ))
      ) : ''}

      <Menulist isSelected={selected} getSelectedMenu={getmenuItem} name="Archived Tasks" imageurl={<Image src={archive} width={25} height={25} />} />
      <Menulist isSelected={selected} getSelectedMenu={getmenuItem} name="Notification" imageurl={<Image src={alarm} width={25} height={25} />} />
      <Menulist isSelected={selected} getSelectedMenu={getmenuItem} name="Log out" imageurl={<Image src={logout} width={25} height={25} />} />

    </div>
  )
})
export default Menu
