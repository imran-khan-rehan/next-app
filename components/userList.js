
import React, { useEffect, useState } from 'react';
import { allUser } from '@/lib/actions/user.actions';
const UserList = ({ onUserSelect,userId,users }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
   //const [users, setusers] = useState([]);

    // useEffect(() => {
    //     console.log("HI iam in share list ");
    //     getusers();
    // }, []);
    // async function getusers() {
    //     console.log("HI iam in share list");
    //     const allusers =await allUser(userId);
    //     setusers(allusers);
    //     console.log("all usrs are ", allusers, users);
    // }
    // Function to handle user selection (by checkbox or clicking on the name)
    const handleUserSelection = (user) => {
        const updatedSelectedUsers = selectedUsers.includes(user)
            ? selectedUsers.filter((selectedUser) => selectedUser !== user)
            : [...selectedUsers, user];
        setSelectedUsers(updatedSelectedUsers);
        onUserSelect(updatedSelectedUsers);
    };

    // Function to filter users by search term
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className=' h-full overflow-y-auto'>
            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                className='border border-yellow-500 p-1 rounded'
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className='flex flex-col gap-2 '>
                {filteredUsers.map((user, index) => (
                    <li key={index} onClick={() => handleUserSelection(user)} className=' cursor-pointer flex flex-row gap-2 hover:bg-gray-200 p-1'>
                        <input
                            type="checkbox"
                            checked={selectedUsers.includes(user)}
                            onChange={() => handleUserSelection(user)}
                        />
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default UserList;