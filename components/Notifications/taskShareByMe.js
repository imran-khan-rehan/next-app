import React, { useEffect, useState } from 'react';
import { taskShareByMe, deleteNotification } from '@/lib/actions/user.actions';
import ShareTaskGrid from './sharedTaskGrid';
import ShareByMeDetails from './ShareByMeDetails';
import schedule from '@/public/icons/schedule.svg'
import Image from 'next/image';
export default function ShareByMe({ userId }) {

    const [tasks, setTasks] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [v, setv] = useState('hi');
    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState('');
    const [selectedIndex,setSelectedIndex]=useState(null);
    const deleteItem = (task,i) => {
        setItemToDelete(task);
        setShowConfirmation(true);
       setSelectedIndex(i);
    };

    const confirmDelete = () => {
        deleteNotification(itemToDelete)
        setShowConfirmation(false);
       const t=tasks;
       t[selectedIndex].senderStatus="viewed";
       setTasks(t);
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
    };
    function openDetail(task)
    {
        setOpen(true);
        setSelectedTask(task);
    }
    useEffect(() => {
        getTasks();
    }, []);
    const [isLoading, setIsLoading] = useState(false);
    async function getTasks() {
        try {
            setIsLoading(true);
            const result = await taskShareByMe(userId);
            console.log("Data fetched from API: task share by me ", result);
            setTasks(result);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }
    return (
        <div>
            {tasks && tasks.length > 0 && (

                <div className='flex max-lg:hidden flex-row  w-full bg-[#F6F6F6] px-4 py-2 font-medium text-base mb-3'>
                    <div className='w-[20%]'>Task name</div>
                    <span className='w-[30%] gap-2 flex flex-row'>
                        <span className='w-[50%] '>Share with</span>
                        <span className='w-[50%]'>Priority</span>
                    </span>
                    <span className='w-[25%] flex justify-center text-center m-auto'>Subject</span>
                    <span className='w-[20%] flex justify-center m-auto'>Due Date</span>

                    <span className='w-[10%] '></span>
                </div>

            )}

            <div className='flex flex-col gap-4 max-lg:hidden'>
                {tasks && tasks.map((task,index) => (task.senderStatus === "pending" ? (
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
                            <div className='bg-white elipses w-[55%] text-base font-medium rounded-md px-2 py-1 xl:pl-[10%]   whitespace-nowrap'>{task.shareWith}</div>
                            <div style={{ backgroundColor: task.pcolor }} className='text-white elipses w-[45%] text-base font-medium rounded-md px-2 py-1 xl:pl-[10%] whitespace-nowrap'>{task.pname}</div>

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
                        <div onClick={() => { deleteItem(task,index) }} className=' cursor-pointer flex flex-row gap-3 justify-end w-[10%] my-auto'>
                            X
                        </div>
                    </div>) : (<></>)
                ))}

            </div>


            {open && <ShareByMeDetails Open={open} task={selectedTask} onclose={setOpen} />}
            <div className='lg:hidden flex flex-row flex-wrap justify-center gap-3'>
                {tasks && tasks.map((task,index) => (task.senderStatus === "pending" ? (
                    <ShareTaskGrid task={task} deleteItem={deleteItem} index={index}/>
                ) : (<></>)
                ))}
            </div>
            {
                showConfirmation && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
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
                )
            }

        </div >
    );
}
