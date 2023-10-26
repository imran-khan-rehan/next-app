// import React from 'react'

// export default function AllReminders() {
//     return (
//         <div>
//             <div className='flex flex-row gap-4'>
//                 <span>title</span>
//                 <span>subject</span>
//                 <span>priority</span>
//                 <span>status</span>
//             </div>
//             <div>

//             </div>
//         </div>
//     )
// }


import React, { useEffect, useState } from 'react';
import { allReminder, deleteReminder } from '@/lib/actions/user.actions';
import ReminderWithMeGrid from './allReminderGrid';
import ReminderDetails from './allReminderDetails';
import Loading from '../Loading';
import schedule from '@/public/icons/schedule.svg'
import Image from 'next/image';
export default function AllReminders({ userId }) {
    const [tasks, setTasks] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState('');

    // function deleteItem (task) {
    //     console.log("item to delete is ",task);
    //     setItemToDelete(task);
    //     setShowConfirmation(true);
    // };

    // const confirmDelete = () => {
    //     deleteReminder(itemToDelete)
    //     setShowConfirmation(false);
    //     setv("jffdsf");
    // };
    const [selectedIndex,setSelectedIndex]=useState(null);
    const deleteItem = (task,i) => {
        setItemToDelete(task);
        setShowConfirmation(true);
       setSelectedIndex(i);
    };

    const confirmDelete = () => {
        deleteReminder(itemToDelete)
        setShowConfirmation(false);
       const t=tasks;
       t[selectedIndex].status="viewed";
       setTasks(t);
    };
    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    useEffect(() => {
        getTasks();
    }, []);

    function openDetail(task) {
        setSelectedTask(task);
        setOpen(true);
    }
    const [isLoading, setIsLoading] = useState(false);
    async function getTasks() {
        try {
            setIsLoading(true);
            const result = await allReminder(userId);
            console.log("Data fetched from API of all reminder are :", result);

            // Get the current date
            const currentDate = new Date();

            // Filter tasks based on due_date and days
            const filteredTasks = result.filter(task => {
                // Parse due_date from the task object and calculate the difference in days
                const dueDate = new Date(task.due_date);
                const status = task.status;
                const timeDifference = dueDate.getTime() - currentDate.getTime();
                const differenceInDays = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days

                // Compare the difference in days with the task's days property
                return differenceInDays <= task.days && status === 'pending';
            });
            console.log("filtered tasks are of get remider all is ", filteredTasks);
            // Set filtered tasks to state
            setTasks(filteredTasks);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    return (
        <div>
            {isLoading && <Loading />}
            {tasks && tasks.length > 0 && (
            
                <div className='flex max-lg:hidden flex-row  w-full bg-[#F6F6F6] px-4 py-2 font-medium text-base mb-3'>
                    <div className='w-[20%]'>Task name</div>
                    <span className='w-[30%] gap-2 flex flex-row'>
                        <span className='w-[55%] '>Status</span>
                        <span className='w-[45%]'>Priority</span>
                    </span>
                    <span className='w-[25%] flex justify-center text-center m-auto'>Subject</span>
                    <span className='w-[20%] flex justify-center m-auto'>Due Date</span>

                    <span className='w-[10%] '></span>
                </div>

            )}

            <div className='flex flex-col gap-4 max-lg:hidden'>
                {tasks && tasks.map((task,index) => (task.status === "pending" ? (
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
                            <div style={{ backgroundColor: task.scolor }} className='text-white elipses w-[55%] text-base font-medium rounded-md px-2 py-1 flex justify-center  whitespace-nowrap'>{task.sname}</div>
                            <div style={{ backgroundColor: task.pcolor }} className='text-white elipses w-[45%] text-base font-medium rounded-md px-2 py-1 flex justify-center whitespace-nowrap'>{task.pname}</div>

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
                        <div onClick={()=>{deleteItem(task,index)}} className=' cursor-pointer flex flex-row gap-3 justify-end w-[10%] my-auto'>
                    X
                        </div>
                    </div> ) : (<></>)
                ))}

            </div>

            {open && <ReminderDetails Open={open} task={selectedTask} onclose={setOpen} />}

            <div className='lg:hidden flex flex-row flex-wrap justify-center gap-3'>
                {tasks && tasks.map((task,index) => (
                    <ReminderWithMeGrid task={task} deleteItem={deleteItem} openDetail={openDetail} index={index} />
                ))}
            </div>
            {showConfirmation && (
                <div className="fixed inset-0 flex  items-center justify-center z-50">
                    <div className="bg-black p-8 rounded shadow-lg">
                        <p className='text-white font-medium text-base'>Do you like to delete this item?</p>
                        <div className="flex justify-end mt-4">
                            <button className="mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={confirmDelete}>
                                Confirm
                            </button>
                            <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={cancelDelete}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

