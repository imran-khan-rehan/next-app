import { useState, useEffect, useRef } from 'react';
import FileAttachment from './attachement';
import cross from '../public/icons/cross.svg'
import schedule from '../public/icons/schedule.svg'
import Calendar from './callendar';
import DropDownMenu from './dropDownMenu';
import Image from 'next/image';
import notImage from '@/public/icons/alarm.svg'
import share from '@/public/icons/share.svg'
import warimage from '../public/icons/warning.svg'

import { allSubjectsOfUser, allStatus, updateTask } from '@/lib/actions/user.actions'
import Loading from './Loading';

const TaskDetail = ({ userId, Open, onClose, onSubmit, task, openShare, openNotification, allData }) => {

    const [taskname, setTaskName] = useState('');
    const [taskdescription, setTaskDescription] = useState('');
    const [selectedlevel, setselectedlevel] = useState('hard');
    const [levels, setlevels] = useState([])
    const [selectedStatus, setSelectedStatus] = useState(null); // Initialize with a default status
    const [statuses, setstatuses] = useState([])

    const [selectedSubject, setselectedSubject] = useState(null);
    const [subjects, setSubjects] = useState([])
    const [type, settype] = useState({});
    const [alltypes, setalltypes] = useState([]);
    const [saveTask, setSaveTask] = useState(false);
    useEffect(() => {

        async function fetchPrograms() {
            try {
                console.log("hi iam in fetch program", task);
                //  const allsubjects = await allSubjectsOfUser(userId);
                // const allstatus = await allStatus();
                setSubjects(allData.allsubject);
                setstatuses(allData.allstatus);
                if (task) {
                    setSelectedStatus({ statusId: task.sid, name: task.sname, color: task.scolor });
                    setlevels(allData.allpriorities);
                    setselectedlevel({ priorityId: task.pid, name: task.pname, color: task.pcolor });
                    setselectedSubject({ subId: task.subId, name: task.subname });
                    setalltypes(allData.alltypes);
                    settype({ typeId: task.tid, name: task.tname });
                    console.log("selected are ", type, selectedStatus, selectedSubject, selectedlevel);
                    setTaskName(task.title);
                    setTaskDescription(task.description);
                    setSelectedDate(task.due_date);
                }
            } catch (error) {
                console.error('Error fetching programs:', error);
            }
        }
        fetchPrograms();
    }, [task]);


    const statusColors = {
        'Pending': 'orange',
    };
    const [isLoading, setIsLoading] = useState(false);
    const [message, setmessage] = useState('');
    const addTask = async (e) => {
        e.preventDefault();
        let m = "";
        if (taskname === '') {
            m += "task name ";
        }
        if (taskdescription === "") {
            m += "task description";
        }
        if (m != "") {
            m += " can't be empty ";
            setmessage(m);
        }
        else {
            setIsLoading(true);

            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',

                timeZone: 'Asia/Kolkata'
            };

            const formattedDate = selectedDate.toLocaleString('en-GB', options);
            console.log("date after formatiing i ", formattedDate);

            let task2 = await updateTask(formattedDate, taskname, taskdescription, Date.now(), selectedStatus.statusId, type.typeId, selectedlevel.priorityId, selectedDate, selectedSubject.subId, userId, task.taskId);
            console.log("task updated is ", task2);
            setIsLoading(false);
            onSubmit();
        }
    }


    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
        setSaveTask(true);
        setmessage('');
    };
    const handleTaskDescChange = (e) => {
        setTaskDescription(e.target.value);
        setSaveTask(true);
        setmessage('');

    };
    const [selectedDate, setSelectedDate] = useState(new Date());
    var [showCalendar, setShowCalendar] = useState(false);

    const handleButtonClick = () => {
        if (showCalendar) {
            setShowCalendar(false);
        } else {
            setShowCalendar(true);
        }

    };

    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    //     setShowCalendar(false);
    //     setSaveTask(true);

    // };
    const handleDateChange = (date) => {
        // Get the current date
        const currentDate = new Date();

        // If the selected date is before the current date, set it to the current date
        if (date < currentDate) {
            date = currentDate;
        }

        // Update the state with the selected date
        setSelectedDate(date);
        //setShowCalendar(false);
        setSaveTask(true);
    };

    const dropdownRef = useRef(null);

    const closeDropdown = () => {
        setShowCalendar(false);
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
    //const createAccountRef = useRef(null);

    function closeCreate() {
        onClose();
    }

    if (isLoading) {
        return <Loading />
    }
    return (
        <form>
            <div
                className={`fixed z-30  top-0 left-0 w-screen  right-0 h-screen    bg-opacity-30 bg-black transition-opacity ${Open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none '}`}>

                <div className=" absolute lg:top-[2vh] lg:left-[12%]  max-lg:w-screen max-lg:h-screen  lg:w-3/4 lg:h-[95vh]  rounded-lg shadow-md flex flex-row  max-md:bg-rose-300 max-md:flex-col overflow-y-auto bg-white">
                    <div className='w-[50%]  flex flex-col pt-5 px-5 gap-4 max-md:w-[100%] h-fit ' style={{ backgroundColor: 'rgba(255, 251, 243, 1)' }} >
                        <span className='flex justify-between'>
                            <p className='cursor-pointer text-[rgba(34, 47, 67, 1)]'>Task Details are</p>

                            <div className='flex flex-row gap-3 pl-2 md:hidden'>
                                <div className="relative group">
                                    <Image onClick={() => { openNotification(task) }} className=' cursor-pointer' src={notImage} width={22} height={22} alt='notification'></Image>
                                </div>
                                <div onClick={() => { openShare(task.taskId) }} className="relative cursor-pointer">
                                    <Image src={share} width={22} height={22} alt='share'></Image>
                                </div>
                                <div className="relative group" onClick={closeCreate}>
                                    <Image className='cursor-pointer' src={cross} width={12} height={12} alt='cross'></Image>
                                </div>
                            </div>

                        </span>
                        <div>
                            <label htmlFor="taskName" className="font-semibold text-lg max-md:text-base">
                                Task Name
                            </label>
                            <input
                                type="text"
                                id="taskName"
                                required
                                className="rounded py-2 px-3 w-full border border-white focus:border focus:border-yellow-500 outline-none"
                                placeholder="Task name"
                                value={taskname}
                                onChange={handleTaskNameChange}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="taskDesc" className="font-semibold text-lg max-md:text-base">
                                Description                        </label>
                            <textarea
                                type="text"
                                id="taskDesc"

                                className="rounded py-2 border border-white min-h-[25vh] max-h-[25vh]  px-3 w-full focus:border focus:border-yellow-500 outline-none"
                                placeholder="Project description"
                                value={taskdescription}
                                style={{ resize: 'none' }}

                                onChange={handleTaskDescChange}
                            />
                        </div>
                        <div className='h-[200px] overflow-y-auto p-4'>
                            <FileAttachment />
                        </div>
                    </div>
                    <div className=' w-[50%]  bg-white  flex flex-col justify-between max-md:w-[100%] '>
                        <div className='relative flex flex-col p-5 gap-8'>
                            <span className='flex justify-between max-md:hidden'>  <p className=' font-normal text-base'></p>
                                <div className='flex flex-row gap-3 pl-2'>
                                    <Image onClick={() => { openNotification(task) }} className=' cursor-pointer' src={notImage} width={22} height={22} alt='notification'></Image>
                                    <Image onClick={() => { openShare(task.taskId) }} className=' cursor-pointer' src={share} width={22} height={22} alt='share'></Image>
                                    <Image className=' cursor-pointer' onClick={onClose} src={cross} width={12} height={12} alt='cross'></Image>
                                </div>
                            </span>
                            <div>
                                <DropDownMenu statusColors={""} heading={"Type"} selectedvalue={type} SetselectedValue={settype} statuses={alltypes} setSaveTask={setSaveTask} />
                            </div>
                            <div><DropDownMenu statusColors={statusColors} heading={"Status"} selectedvalue={selectedStatus} SetselectedValue={setSelectedStatus} statuses={statuses} setSaveTask={setSaveTask} /></div>

                            <div><DropDownMenu statusColors={statusColors} heading={"Priority"} selectedvalue={selectedlevel} SetselectedValue={setselectedlevel} statuses={levels} setSaveTask={setSaveTask} /></div>
                            <div><DropDownMenu statusColors={""} heading={"Subject"} selectedvalue={selectedSubject} SetselectedValue={setselectedSubject} statuses={subjects} setSaveTask={setSaveTask} /></div>
                            <div className='flex flex-col'>
                                <div className='flex flex-row justify-between relative'>
                                    <div onClick={handleButtonClick} className='b font-semibold text-[rgba(34, 47, 67, 1)] text-lg cursor-pointer max-md:text-base'>Due Date</div>
                                    <div onClick={handleButtonClick} className='t text-center flex flex-row gap-2 cursor-pointer'>
                                        <Image className='pb-1' src={schedule} width={15} height={15} alt='' />

                                        {selectedDate && (
                                            <p className='font- text-base'>
                                                {selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ',' + selectedDate.getFullYear()}

                                            </p>
                                        )}
                                    </div>

                                    <p className=' w-[8%] max-md:w-[4%]'></p>
                                </div>
                                {/* <div className='w-[90%] text-red-500 font-semibold max-md:text-base'>{message}</div> */}
                               
                                {showCalendar && (
                                    <div ref={dropdownRef} className="absolute left-0 top-[12%] z-[100] w-[75%] max-md:w-[280px] flex justify-center items-center">
                                        <Calendar selectedDate={selectedDate} setSelectedDate={handleDateChange} />
                                    </div>
                                )}
                            </div>
                            <div className={` ${message.length > 1 ? '' : 'hidden'} gap-1 text-red-500 font-medium flex flex-row`}>
                                <Image src={warimage} width={20} height={20}></Image>

                                {message}
                                </div>
                        </div>
                        <div className='flex flex-row  mb-9 p-4 flex-wrap gap-3 max-md:flex-col max-md:items-center max-md:gap-6 '>
                            {saveTask && <button type='submit' onClick={addTask} className='px-7 py-1 bg-yellow-500 rounded-md text-white font-semibold text-lg hover:bg-black max-md:w-[50%] max-md:py-2 max-sm:text-sm'>Save task</button>}

                        </div>
                    </div>
                </div>

            </div>
        </form>
    );
};

export default TaskDetail;

