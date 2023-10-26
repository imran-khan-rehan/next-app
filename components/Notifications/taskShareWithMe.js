
import React, { useEffect, useState } from 'react';
import { taskShareWithMe, deleteNotificationFromReceiver, makeClone } from '@/lib/actions/user.actions';
import ShareWithMeGrid from './ShareWithMeGrid';
import ShareWithMeDetails from './shareWithMeDetails';
import { revalidatePath } from 'next/cache';
import schedule from '@/public/icons/schedule.svg'
import Image from 'next/image';
import Loading from '../Loading';
export default function ShareWithMe({ userId,setClone }) {
    const [tasks, setTasks] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState('');
    const [flag, setFlag] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    // ... rest of your code

    // const deleteItem = (task) => {
    //     setItemToDelete(task);
    //     setShowConfirmation(true);
    // };

    // const confirmDelete = () => {
    //     deleteNotificationFromReceiver(itemToDelete)
    //     // Perform the deletion logic here using itemToDelete
    //     // Once deleted, close the confirmation modal
    //     setShowConfirmation(false);
    //    setv("fdf");
    //   // revalidatePath('/alltasks');
    // };
    const [selectedIndex, setSelectedIndex] = useState(null);
    const deleteItem = (task, i) => {
        setItemToDelete(task);
        setShowConfirmation(true);
        setSelectedIndex(i);
    };

    const confirmDelete = () => {
        deleteNotificationFromReceiver(itemToDelete)
        setShowConfirmation(false);
        var t = tasks;
        t[selectedIndex].receiverStatus = "viewed";
        setTasks(t);
    };
    const cancelDelete = () => {
        // Close the confirmation modal without deleting
        setShowConfirmation(false);
    };
    function makeCloneOfTask(task, index) {
        setClone("hi how are ");
        makeClone(task,userId,task.notId);
       var t = [...tasks]; // Create a copy of tasks array
       t[index].clone = "cloned";
        t[index].receiverStatus='pending';
       // console.log('cloned task i s',t[index]);
        
        setTasks(t);
    }
    useEffect(() => {
        console.log("iam in get tasks of share with me ", userId);
        getTasks();
    }, []);
    function openDetail(task) {
        setOpen(true);
        setSelectedTask(task);
    }
    async function getTasks() {
        try {
            setIsLoading(true);

            const result = await taskShareWithMe(userId);
            console.log("Data fetched from API task share with me :", result);
            setTasks(result);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching tasks of share with me :", error);
        }
    }
  
    return (
        <div>
            {tasks && tasks.length > 0 && (

                <div className='flex flex-row max-lg:hidden  w-full bg-[#F6F6F6] px-4 py-2 font-medium text-base mb-3'>
                    <div className='w-[20%]'>Task name</div>
                    <span className='w-[30%] gap-2 flex flex-row'>
                        <span className='w-[55%] '>Shared By</span>
                        <span className='w-[45%]'>Clone</span>
                    </span>
                    <span className='w-[25%] flex justify-center text-center m-auto'>Subject</span>
                    <span className='w-[20%] flex justify-center m-auto'>Due Date</span>

                    <span className='w-[10%] '></span>
                </div>

            )}

            <div className='flex flex-col gap-4 max-lg:hidden'>
                {tasks && tasks.map((task, index) => (task.receiverStatus === "pending" ? (
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
                            <div className='bg-white elipses w-[55%] text-base font-medium rounded-md px-2 py-1 flex justify-center   whitespace-nowrap'>{task.shareBy}</div>
                            <div onClick={() => { makeCloneOfTask(task,index)}} className={`${task.clone === 'clone' ? 'cursor-pointer bg-white' : ' bg-red-200'} elipses w-[45%] text-base font-medium rounded-md px-2 py-1 xl:pl-[10%] `}>{task.clone}</div>

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
                        <div onClick={() => { deleteItem(task, index) }} className=' cursor-pointer flex flex-row gap-3 justify-end w-[10%] my-auto'>
                            X
                        </div>
                    </div>) : (<></>)
                ))}

            </div>

            {open && <ShareWithMeDetails Open={open} task={selectedTask} onclose={setOpen} />}

            <div className='lg:hidden'>
                {tasks && tasks.map((task, index) => (task.receiverStatus === "pending" ? (
                    <ShareWithMeGrid task={task} deleteItem={deleteItem} openDetail={openDetail} makeCloneOfTask={makeCloneOfTask} index={index} />
                ) : (<></>)
                ))}
            </div>
            {showConfirmation && (
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
            )}

        </div>
    );
}
