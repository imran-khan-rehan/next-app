
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import menu from '../public/icons/menu.svg';
import blackmenu from '../public/icons/blackmenu.svg';

export default function DropdownMenu({ statusColors, heading, selectedvalue, SetselectedValue, statuses,setSaveTask=null }) {
    const [isOpenstatus, setIsOpenstatus] = useState(false);
    const [text, settext] = useState(true);

    const toggleDropdown = () => {
        setIsOpenstatus(!isOpenstatus);
    };

    const handleStatusChange = (newStatus) => {
        SetselectedValue(newStatus);
        if(setSaveTask)
        {
            setSaveTask(true);
        }
    };

    useEffect(() => {
         //console.log("subjects in drop menu are ", statuses, heading, selectedvalue, statusColors)
        if (statusColors === "") {
            settext(false);
        }
        if (!selectedvalue && statuses) {

            SetselectedValue(statuses[0])
        }
    }, [statusColors]); // Include statusColors in the dependency array

    const getButtonStyle = (status) => {
       
        return {
            backgroundColor: text ? status ? status.color : 'black' : 'rgba(250, 250, 250, 1)',
            color: text ? status&&status.color==='#F6F6F6'?'black':'white' : 'black',
        };
    };

    const dropdownRef = useRef(null);

    const closeDropdown = () => {
        setIsOpenstatus(false);
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
        <div ref={dropdownRef}>
            <div className='flex flex-row justify-between items-center'>
                <h1 className={`${heading === '' ? 'hidden' : 'flex'}font-semibold text-lg max-md:text-base z-10`}>{heading}</h1>

                <div className="relative inline-block text-left">
                    <div
                        onClick={toggleDropdown}
                        className={` cursor-pointer flex ${text ?selectedvalue&&selectedvalue.color==='#F6F6F6'?'text-black':'text-white' : 'text-black'} flex-row justify-between rounded-md h-9 min-w-[150px] px-2 py-1 gap-3 font-semibold text-base `}
                        style={getButtonStyle(selectedvalue)}
                    >
                        {selectedvalue && selectedvalue.name ? selectedvalue.name : `select ${heading}`}
                        <Image src={text ? selectedvalue&&selectedvalue.color==='#F6F6F6'?blackmenu: menu : blackmenu} width={10} height={5} alt='^' className='my-auto'></Image>
                    </div>
                    {isOpenstatus && statuses && (
                        <ul className="z-20 absolute left-0 mt-2 min-w-[100%] max-w-fit py-2 bg-white border border-gray-300 rounded-lg shadow-md">
                            {statuses.map((status, index) => (
                                <li key={index}>
                                    <div
                                        onClick={() => { handleStatusChange(status); toggleDropdown(); }}
                                        className=" cursor-pointer flex flex-row gap-2 text-left w-full px-3 py-2 text-gray-800 hover:bg-blue-100 focus:outline-none whitespace-nowrap"
                                    >
                                        <div className='h-[24px] flex justify-center items-center'>
                                            <div className={`w-[7px] h-[7px] rounded`} style={getButtonStyle(status)}></div>
                                        </div>
                                        <p className='font-medium text-sm'>{status.name}</p>
                                    </div>
                                </li>
                            ))}

                        </ul>
                    )}
                </div>
                <p></p>
            </div>
        </div>
    );
}
