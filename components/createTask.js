
import { useState, useEffect, useRef } from 'react';
import FileAttachment from './attachement';
import cross from '../public/icons/cross.svg'
import schedule from '../public/icons/schedule.svg'
import Calendar from './callendar';
import DropDownMenu from './dropDownMenu';
import Image from 'next/image';
import warimage from '../public/icons/warning.svg'

import { allSubjectsOfUser, allStatus, insertTask } from '@/lib/actions/user.actions'
import Loading from './Loading';

const CreateTask = ({ userId, Open, onClose, onSubmit, allData }) => {

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
    useEffect(() => {

        async function fetchPrograms() {
            try {
                console.log("hi iam in create task 44", allData);
                const allsubjects = allData.allsubject;
                setstatuses(allData.allstatus);
                setSelectedStatus(statuses[0]);
                setlevels(allData.allpriorities);
                setselectedlevel(levels[0])
                setalltypes(allData.alltypes);
                settype(allData.alltypes[0]);
                //const allstatus = await allStatus();
                //  console.log("status received are ",allstatus);
                setSubjects(allsubjects);
                setselectedSubject(allsubjects[0])

                //console.log("selected are ",type,allstatus.alltypes[0]);

            } catch (error) {
                console.error('Error fetching programs:', error);
            }
        }
        fetchPrograms();
    }, []);
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
            m += " task description";
        }
        if (m != "") {
            m += " can't be empty ";
            setmessage(m);
        }
        else {
            setIsLoading(true);

            console.log("add task");
            console.log("selected subject is ", selectedSubject);
            console.log("selected status is ", selectedStatus);
            console.log("selected priority is ", selectedlevel);
            console.log("selected name is ", taskname);
            console.log("selected desc is ", taskdescription);
            console.log("selected date is ", selectedDate);
            let task = await insertTask(taskname, taskdescription, Date.now(), selectedStatus.statusId, type.typeId, selectedlevel.priorityId, selectedDate, selectedSubject.subId, userId);
            console.log("task updated is id is ", task);
            setIsLoading(false);

            onSubmit();
        }
    }


    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
        setmessage('');
    };
    const handleTaskDescChange = (e) => {
        setTaskDescription(e.target.value);
        setmessage('');
    };
    const [selectedDate, setSelectedDate] = useState(new Date());
    var [showCalendar, setShowCalendar] = useState(false);

    const handleButtonClick = () => {
        setShowCalendar(!showCalendar);
    };

    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    //     setShowCalendar(false);
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
    };

    const dropdownRef = useRef(null);
    const createAccountRef = useRef(null);
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

    function closeCreate() {
        onClose();
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (createAccountRef.current && !createAccountRef.current.contains(event.target)) {
                closeCreate();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    if (isLoading) {
        return <Loading />
    }
    return (
        <form>
            <div
                className={`fixed z-30  top-0 left-0 w-screen  right-0 h-screen min-h-fit    bg-opacity-30 bg-black transition-opacity ${Open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none '}`}>
                <div ref={createAccountRef} className=" absolute lg:top-[2vh] lg:left-[12%] max-lg:min-h-fit  max-lg:w-screen max-lg:h-screen  lg:w-3/4 lg:h-[94vh]  rounded-lg shadow-md flex flex-row  max-md:bg-rose-300 max-md:flex-col overflow-y-auto bg-white">
                    <div className='w-[50%]  flex flex-col pt-5 px-5 gap-4 max-md:w-[100%] h-fit ' style={{ backgroundColor: 'rgba(255, 251, 243, 1)' }} >
                        <p className='cursor-pointer text-[rgba(34, 47, 67, 1)]'>Create a task</p>
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
                                required
                                className="   rounded flex flex-wrap items-start py-2 border border-white max-h-[25vh] min-h-[25vh]  px-3 w-full focus:border focus:border-yellow-500 outline-none"
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
                        <div className=' relative flex flex-col p-5 gap-8'>
                            <p className=' font-normal text-base'>Attributes</p>
                            <div>
                                <DropDownMenu statusColors={""} heading={"Type"} selectedvalue={type} SetselectedValue={settype} statuses={alltypes} />
                            </div>
                            <div><DropDownMenu statusColors={statusColors} heading={"Status"} selectedvalue={selectedStatus} SetselectedValue={setSelectedStatus} statuses={statuses} /></div>

                            <div><DropDownMenu statusColors={statusColors} heading={"Priority"} selectedvalue={selectedlevel} SetselectedValue={setselectedlevel} statuses={levels} /></div>
                            <div><DropDownMenu statusColors={""} heading={"Subject"} selectedvalue={selectedSubject} SetselectedValue={setselectedSubject} statuses={subjects} /></div>
                            <div className=' flex flex-col'>
                                <div className='flex flex-row justify-between items-center relative'>
                                    <div onClick={handleButtonClick} className='b font-semibold text-[rgba(34, 47, 67, 1)] text-lg cursor-pointer max-md:text-base'>Due Date</div>
                                    <div onClick={handleButtonClick} className=' max-w-fit  text-center flex flex-row gap-3 cursor-pointer'>
                                        <Image className='pb-1' src={schedule} width={15} height={15} alt='' />

                                        {selectedDate && (
                                            <p className='font- text-base '>
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
                        <div className='flex flex-row justify-around mb-9 p-4 flex-wrap gap-3 max-md:flex-col max-md:items-center max-md:gap-6 '>
                            <button type='submit' onClick={addTask} className='px-7 py-1 bg-yellow-500 rounded-md text-white font-semibold text-lg hover:bg-black max-md:w-[50%] max-md:py-2 max-sm:text-sm'>Add task</button>
                            <div onClick={onClose} className=' cursor-pointer text-center px-7 py-1 bg-yellow-500 rounded-md text-white font-semibold text-lg hover:bg-black max-md:w-[50%] max-md:py-2 max-sm:text-sm'>Cancel</div>

                        </div>
                    </div>
                </div>

            </div>
        </form>
    );
};

export default CreateTask;

