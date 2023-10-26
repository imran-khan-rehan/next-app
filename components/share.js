import React, { useEffect, useRef } from 'react'
import Image from 'next/image';
import cross from '../public/icons/cross.svg';
import whatsapp from '../public/icons/whatsapp.svg';
import mail from '../public/icons/mail.svg';
import gmailIcon from '../public/icons/gmailIcon.svg';
import { useState } from 'react';
import UserList from './userList';
import { allUser } from '@/lib/actions/user.actions';
import Submitbutton from './submitbutton';
import { sendTask } from '@/lib/actions/user.actions';
export default function Share({ userId, Open, task, openShare, users }) {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [userShare, setUserShare] = useState(true);
    // const [users, setusers] = useState([]);
    const handleUserSelect = (selectedUsers) => {
        setSelectedUsers(selectedUsers);
    };

    function shareTOUsers() {
        openShare(-1);

        selectedUsers.map((receiver) => {
            const r = sendTask(userId, receiver.userId, task);

        }
        )
        setSelectedUsers(null);

    }

    const dropdownRef = useRef(null);

    const closeDropdown = () => {
        openShare(-1);
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
    function openGmail() {
        const subject = "Task " + task.title + " shared by " + task.uname;

        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${"Title = " + task.title + "%0A" + "Description = " + task.description + "%0A" + "Due Date = " + task.due_date + "%0A" + "Status = " + task.sname
            + "%0A" + "Priority = " + task.pname}`;
        window.location.href = mailtoLink;
    }
    return (
        <div className={`fixed z-30  top-0 left-0 w-screen    right-0 h-screen flex justify-center items-center bg-opacity-60 bg-black transition-opacity ${Open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none '}`}>
            <div ref={dropdownRef} className=' absolute  flex flex-col justify-around gap-4 w-[298px] max-h-3/4  p-5 text-black  bg-white rounded-lg'>
                <div className='flex flex-row justify-between'>
                    <h1 className=' font-semibold text-xl'>Share</h1>
                    <Image onClick={() => { openShare(-1) }} className=' cursor-pointer' src={cross} width={8} height={8} alt='close' />
                </div>
                <div className='flex flex-row justify-around '>
                    <a href={`https://wa.me/?text=${"Title = " + task.title + "%0A" + "Description = " + task.description + "%0A" + "Due Date = " + task.due_date + "%0A" + "Status = " + task.sname
                        + "%0A" + "Priority = " + task.pname}`} target='_blank'>
                        <Image className='cursor-pointer' src={whatsapp} width={51} height={68} alt='whatsapp' />
                    </a>
                    <div className='relative cursor-pointer' onClick={openGmail}>
                        <Image src={mail} width={51} height={68} alt='mail' />
                        <div className='absolute top-[20%] left-[30%]'>
                            <Image src={gmailIcon} width={25} height={25} alt='mail' />
                        </div>
                    </div>
                </div>

                <div className='h-[300px]'>
                    <p className='text-xl font-semibold'>Share with User</p>
                    <div className={`${userShare ? '  h-[80%] overflow-y-auto' : ''}`}>
                        {userShare && <UserList onUserSelect={handleUserSelect} userId={userId} users={users} />}
                    </div>
                    <Submitbutton message={"Share"} handleSignIn={shareTOUsers} />
                </div>
            </div>
        </div>

    )
}
