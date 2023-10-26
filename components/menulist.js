import React from 'react';
import Image from 'next/image'; // Import the 'next/image' component

export default function Menulist({ name, imageurl, getSelectedMenu,isSelected }) {
  return (
    <div onClick={() =>{ getSelectedMenu(name) ,isSelected=name}} className={`py-2 cursor-pointer hover:bg-slate-200 shadow-custom w-[244px] flex flex-row rounded-md ${isSelected===name?'bg-yellow-500 text-white hover:bg-yellow-500':'bg-white text-black'}`}>
    <div className={`px-4 ${isSelected === name ? (name === 'All tasks' ? '' : 'invert') : (name === 'All tasks' ? 'invert' : '')}`}>{imageurl}</div>
      <p className='text-lg font-medium'>{name}</p>
    </div>
  );
}
