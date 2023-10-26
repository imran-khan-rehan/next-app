"use client";
import { useEffect, useState } from 'react';
import Menu from '@/components/menu'
import TaskGrid from '@/components/taskGrid'
import TaskList from '@/components/taskList'
import CreateNewTaskHead from '@/components/createNewTaskHead'
import Sorting from '@/components/sorting'
import { destroyCookie, parseCookies } from 'nookies';
import CreateTask from '@/components/createTask';
import Navigation from '@/components/navigation';
import { allUser, allTasksOfUser, allStatusPriority, getProfile, allStatus, allSubjectsOfUser } from '@/lib/actions/user.actions';
import TaskDetail from '@/components/taskDetails';
import Share from '@/components/share';
import Reminder from '@/components/Notifications/reminder';
import ReminderSetDays from '@/components/reminderDaysSet';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
export default function page() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  function handleFormSubmit() {
    closeForm();
    gettasks();
  };
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const openDetail = (task) => {
    console.log("hi iam in open details here is task", task);
    setIsDetailOpen(true);
    setSelectedTask(task);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
  };

  function handleDetailUpdate() {
    closeDetail();
    gettasks();
  };

  const cookies = parseCookies();
  const userId = cookies.userId;
  const username = cookies.username;
  const [uname,setName]=useState("");
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [tasks, settasks] = useState([]);
  const [gridview, setgridview] = useState(true);
  const [selectedpriority, setselectedpriority] = useState({ name: 'Filter by priority', color: '#F6F6F6' });
  const [allpriorities, setallpriorities] = useState([]);
  const [selectedstatus, setselectedstatus] = useState({ name: 'Filter by status', color: '#F6F6F6' });
  const [allstatus, setallstatus] = useState([]);
  const [alltasks, setalltasks] = useState([]);
  const [selectedAllTasks, setSelectedAllTasks] = useState([]);
  const [selectedTaskForDetail, setSelectedTask] = useState(null);
  const [isShare, setIsShare] = useState(false);
  const [sharedTask, setSharedTask] = useState(null);
  const [isReminder, setIsReminder] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [notifiedTask, setnotifiedTask] = useState('')
  const [dataToCreateTask, setDataToCreateTask] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedMenu, setselectedMenu] = useState('All tasks');

  function openShare(flag) {
    if (flag === -1) {
      setIsShare(false);
    }
    else {
      setIsShare(true);
      setSharedTask(flag);
      //  console.log("set is share is open now ", flag);
    }
  }
  function openNotification(flag) {
    if (flag === -1) {
      setShowReminder(false);
    }
    else {
      setShowReminder(true);
      setnotifiedTask(flag);
      //  console.log("set is share is open now ", flag);
    }
  }
  function openMenu(flag) {
    setIsOpenMenu(flag);
  }
  const route = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (userId && username) {
        console.log("user name is ", username, userId);
        setName(username);
       // const profile = await getProfile(userId);
       const profile=cookies.profile;
        console.log("profile is  ", profile);
        if (profile === 'pending') {
          route.push('/choosesubjects');
        } else {

          let statuspriority = await allStatus();
          let allsubjects = await allSubjectsOfUser(userId);
          
          setallpriorities([{ name: 'All priority', color: 'black' }]);
          setallstatus([{ name: 'All status', color: 'black' }]);
          setallpriorities(prev => ([...prev, ...statuspriority.allpriorities]));
          setallstatus(prev => ([...prev, ...statuspriority.allstatus]))
          setDataToCreateTask({ allstatus: statuspriority.allstatus, allpriorities: statuspriority.allpriorities, alltypes: statuspriority.alltypes, allsubject: allsubjects });
        if(allpriorities.length)
        {
          setIsLoading(false);
        }
        }
      } else {

        route.push('/signin');
      }
      // Set loading to false after authentication check is completed
    };

    fetchData();

  }, []);
  const [v, setv] = useState('init');

  useEffect(() => {
    gettasks();
  }, [v]);

  async function gettasks() {
    console.log("all tasks received iam in this");
   // setIsLoading(true);
    let task2 = await allTasksOfUser(userId);
    const name = selectedMenu;
    setselectedpriority({ name: 'Filter by priority', color: '#F6F6F6' });
    setselectedstatus({ name: 'Filter by status', color: '#F6F6F6' });

    if (name === 'All tasks') {
      setSelectedAllTasks(task2);
      settasks(task2);
    }
    else if (name === 'Due Today') {
      const currentDate = new Date();
      const tasksDueToday = task2.filter(task => {
        const dueDate = new Date(task.due_date);
        return dueDate.getDate() === currentDate.getDate() &&
          dueDate.getMonth() === currentDate.getMonth() &&
          dueDate.getFullYear() === currentDate.getFullYear();
      });
      settasks(tasksDueToday);
      setSelectedAllTasks(tasksDueToday);
    }
    else if (name === 'Archived Tasks') {
      settasks([]);
      const completedTasks = task2.filter(task => task.sname.toLowerCase() === 'complete');
      settasks(completedTasks);
      setSelectedAllTasks(completedTasks);
      console.log("now i am in arciende d", tasks);
      //setv("kfjkd");
    }
    else {
      const filteredTasks = task2.filter(task => {
        const matchPriority = (name === task.subname);
        return matchPriority;
      });
      settasks(filteredTasks);
      setSelectedAllTasks(filteredTasks);

    }
    setalltasks(task2);
    setIsLoading(false);
  }


  useEffect(() => {
    const filteredTasks = selectedAllTasks.filter(task => {
      const matchPriority = selectedpriority.name === 'Filter by priority' || selectedpriority.name === 'All priority' || selectedpriority.name === task.pname;

      const matchStatus = selectedstatus.name === 'Filter by status' || selectedstatus.name === 'All status' || task.sname === selectedstatus.name;
      return matchPriority && matchStatus;
    });

    settasks(filteredTasks);

    //setv("Filter by  due grid view" + selectedstatus.name, gridview);
  }, [selectedpriority, selectedstatus, gridview])

  function setview(view) {
    setgridview(view);
  }


  function sortByDueDate() {
    let sortedTasks = [...tasks]; // Create a new array to avoid mutating state directly.
    sortedTasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

    settasks(sortedTasks);

  }
  function getmenu(name) {
    setselectedpriority({ name: 'Filter by priority', color: '#F6F6F6' });
    setselectedstatus({ name: 'Filter by status', color: '#F6F6F6' });
    setselectedMenu(name);
    openMenu(false);
    setIsReminder(false);
    // console.log("menu is selected ", selectedMenu, name);
    if (name === 'All tasks') {
      setSelectedAllTasks(alltasks);
      settasks(alltasks);
    }
    else if (name === 'Due Today') {
      const currentDate = new Date();
      const tasksDueToday = alltasks.filter(task => {
        const dueDate = new Date(task.due_date);

        return dueDate.getDate() === currentDate.getDate() &&
          dueDate.getMonth() === currentDate.getMonth() &&
          dueDate.getFullYear() === currentDate.getFullYear();
      });
      settasks(tasksDueToday);
      setSelectedAllTasks(tasksDueToday);
    }
    else if (name === 'Archived Tasks') {
      settasks([]);
      const completedTasks = alltasks.filter(task => task.sname.toLowerCase() === 'complete');
      settasks(completedTasks);
      setSelectedAllTasks(completedTasks);
      console.log("now i am in arciende d", alltasks);

      //setv("kfjkd");
    }
    else if (name === 'Notification') {
    //  console.log("set is reminder ff", name);
      setIsReminder(true);

    }
    else if (name === 'Log out') {
      setIsLoading(true);
      destroyCookie(null, 'userId');
      destroyCookie(null, 'username');
      route.push('/signin');
    }
    else {
      const filteredTasks = alltasks.filter(task => {
        const matchPriority = name === task.subname;
        console.log("match or not ", matchPriority, name, task.subname);
        return matchPriority;
      });
      settasks(filteredTasks);
      setSelectedAllTasks(filteredTasks);
    }
  }
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await allUser(userId);
        setUsers(user);
      } catch (error) {
        // Handle errors, e.g., set an error state
        console.error('Error fetching user data:', error);
      }
    };

    fetchData(); // Call the async function inside useEffect

  }, [isShare]); // Add dependencies to the dependency array if needed
  return (
    <>
      <div className='flex flex-row bg-[rgba(246, 246, 246, 1)] gap-5 max-md:flex-col'>
        <div className={` w-72  max-md:${isOpenMenu ? ' z-50 flex w-screen h-screen bg-black bg-opacity-30  overflow-y-auto fixed' : 'hidden '}`}>
          <Menu userId={userId} openMenu={openMenu} getmenuItem={getmenu} selected={selectedMenu} allSubjects={dataToCreateTask.allsubject} />
        </div>
        <div className='md:hidden'>
          <Navigation openMenu={openMenu}></Navigation>
        </div>
        <div className='w-full'>
          <CreateNewTaskHead openForm={openForm} username={uname}  />
          <div>
            {isFormOpen && <CreateTask userId={userId} Open={isFormOpen} onClose={closeForm} onSubmit={handleFormSubmit} allData={dataToCreateTask} />}
          </div>
          <div className={`${isReminder ? 'hidden' : 'block'} shadow-custom p-1 m-5`}>
            <Sorting name={selectedMenu} gridview={gridview} setgridview={setview} selectedpriority={selectedpriority} Setselectedpriority={setselectedpriority} priorities={allpriorities} selectedstatus={selectedstatus} Setselectedstatus={setselectedstatus} allstatuses={allstatus} sortbydate={sortByDueDate} />
            <div>
              <div className={`${gridview ? 'flex flex-row flex-wrap justify-start items-center gap-5' : 'hidden max-lg:flex max-lg:flex-row max-lg:flex-wrap max-lg:justify-start max-lg:items-center max-lg:gap-5'} max-lg:items-center max-lg:justify-center max-lg:mr-auto`}>
                {tasks && tasks.length ? tasks.map((task) => {
                  return <TaskGrid task={task} openDetail={openDetail} openShare={openShare} openNotification={openNotification} />;
                }) : ""}

              </div>
              <div className={`w-full flex flex-col gap-3 ${gridview ? 'hidden' : 'flex'} max-lg:hidden`}>
                <div className='flex flex-row  w-full bg-[#F6F6F6] px-4 py-2 font-medium text-base mb-3'>
                  <div className='w-[20%]'>Task name</div>
                  <span className='w-[30%] gap-2 flex flex-row'>
                    <span className='w-[55%] '>Status</span>
                    <span className='w-[45%]'>Priority</span>
                  </span>
                  <span className='w-[25%] flex justify-center text-center m-auto'>Subject</span>
                  <span className='w-[20%] flex justify-center m-auto'>Due Date</span>

                  <span className='w-[10%] '></span>
                </div>
                {tasks && tasks.length ? tasks.map((task) => {
                  return <TaskList task={task} openDetail={openDetail} openShare={openShare} openNotification={openNotification} />;
                }) : ""}
              </div>
            </div>

          </div>

          <div className={`${isReminder ? 'm-5' : ''}`}>{isReminder && <Reminder userId={userId} setClone={setv}/>}</div>
          {isLoading && <Loading />}
          <div>{isDetailOpen && <TaskDetail userId={userId} Open={isDetailOpen} onClose={closeDetail} onSubmit={handleDetailUpdate} task={selectedTaskForDetail} openShare={openShare} openNotification={openNotification} allData={dataToCreateTask} />}</div>
          <div>{isShare && <Share userId={userId} Open={isShare} openShare={openShare} task={sharedTask} users={users} />} </div>
          {showReminder && notifiedTask && <ReminderSetDays task={notifiedTask} onClose={openNotification} />}

        </div>
      </div>
    </>
  )
}

