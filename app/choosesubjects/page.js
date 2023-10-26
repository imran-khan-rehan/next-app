"use client";
import Submitbutton from '@/components/submitbutton';
import { allSubjectsOFAllPrograms, getPrograms, setProfile, storeUserSubjects, getProfile } from '@/lib/actions/user.actions'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading';

const Subjects = () => {
    const router = useRouter();
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [programSubjects, setProgramSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [allSubjectsPrograms, setAllSubjectsProgram] = useState({});
    // const [isLoading,setIsLoading]=useState(false);
    const handleProgramChange = async (programId) => {
        if (programId) {
            setSelectedProgram(programId);
            const subjects = getSubjectsWithProgId2(programId);
            setProgramSubjects(subjects);
            setSelectedSubjects(subjects);

            //  console.log("programs subjects are read and marked", selectedSubjects, programSubjects);
        } else {
            console.log("program id is null");
        }

    };
    function getSubjectsWithProgId2(programId) {
        // console.log("all is ",allSubjectsPrograms);
        const d = allSubjectsPrograms[programId];
        //  console.log("data is from get os ",d);
        return d;
    }
    const [isLoading, setLoading] = useState(true);
    const [profile, setprofile] = useState('');
    useEffect(() => {
        const cookies = parseCookies();
        const userId = cookies.userId;
        const username = cookies.username;

        if (userId && username) {

            console.log("Cookies exist. User ID:", userId, "Username:", username);
            async function fetchProfile() {
                const p = await getProfile(userId);
                console.log("profile in function is ", p);
                setprofile(p[0].profile);
                if (p[0].profile === 'completed') {
                    router.push('/alltasks');
                }
            }
            fetchProfile();
            if (profile === 'pending') {
                async function fetchPrograms() {
                    try {
                        getPrograms().then(allPrograms => {
                            setPrograms(allPrograms);
                            allSubjectsOFAllPrograms().then(data => {
                                setAllSubjectsProgram(data);
                                
                                if (allPrograms && allPrograms.length > 0) {
                                    setSelectedProgram(allPrograms[0].progId);
                                }
                                setLoading(false);
                            });
                            //setLoading(false);

                        });
                       
                        //console.log("data is all subje",data);
                    } catch (error) {
                        console.error('Error fetching programs:', error);
                    }
                }

                fetchPrograms();
            }


        } else {
            router.push('/signin')
        }

    }, [profile]);


    // Use a useEffect to update selectedProgram and programSubjects when programs change
    // useEffect(() => {
    //     if (programs.length > 0) {

    //         setSelectedProgram(programs[0].progid);
    //          console.log("selected program is ",programs[0].progid);

    //     }
    // }, [programs]);


    useEffect(() => {
        // Execute logic that depends on selectedProgram here
        if (selectedProgram !== null) {
            handleProgramChange(selectedProgram);
        }
    }, [selectedProgram]);


    const handleSubjectChange = (subjectId) => {
        // console.log("in handle subject", selectedSubjects);
        // Check if the subjectId is already in the selectedSubjects array
        if (selectedSubjects.includes(subjectId)) {
            // If it's already selected, remove it from the array

            setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
        } else {
            // console.log(" If it's not selected, add it to the array");
            setSelectedSubjects([...selectedSubjects, subjectId]);
        }
    };
    const handlecontinue = async (e) => {
        const cookies = parseCookies();
        const userId = cookies.userId;
        const username = cookies.username;
        console.log("User ID:", userId);
        console.log("Username:", username);
        if (selectedSubjects.length >= 1) {
            setLoading(true);
            storeUserSubjects(userId, selectedSubjects, selectedProgram).then(insertion => {
                if (insertion === "success") {
                    //alert(insertion);
                    setProfile(userId);
                    router.push('/alltasks');

                }
                else if (insertion === "error") {
                    alert("error in choose subjects");
                    setLoading(true);

                }
            });

        } else {
           
            alert("select one subject atleast");
            
        }
    }
    if (isLoading) {
        return <Loading/>
    }
    return (
        <div className='bg-yellow-500  w-screen min-h-screen flex justify-center items-center max-h-fit'>
            <div className="w-[458px] pt-12 pb-12  pl-12 pr-12 bg-white rounded-md shadow-md max-sm:pl-8 max-sm:pr-8 max-sm:w-[383px] ">
                <div className="text-2xl font-bold leading-10 text-center whitespace-nowrap">
                    Pick your subjects!
                </div>

                <div className='mt-12 mb-6 text-2xl font-semibold leading-10 text-center'>Program</div>
                <div className="flex flex-wrap justify-center gap-5 mx-auto w-fit">
                    {programs.map((program) => (
                        <div
                            key={program.progId}
                            className={`cursor-pointer text-lg font-medium border border-yellow-500 w-max min-w-[95px] px-2 h-9 text-center pt-1 rounded-md ${selectedProgram === program.progId ? 'bg-yellow-500 text-white' : 'bg-orange-50'
                                }`}
                            onClick={() => handleProgramChange(program.progId)}
                        >
                            {program.name}

                        </div>
                    ))}
                </div>
                <div className='text-center text-2xl font-semibold mb-6 mt-6'>Select subjects</div>

                {selectedProgram && programSubjects && programSubjects.length >= 1 && (
                    <div className='flex justify-center'>
                        <div className=' flex-container'>
                            {programSubjects.map((subject) => (
                                <div key={subject.subId}
                                    className={`cursor-pointer border w-28 min-w-fit py-[6px] px-1 max-h-fit  text-center  rounded-md ${selectedSubjects.includes(subject)
                                        ? 'bg-yellow-500 text-white'
                                        : 'bg-orange-50'
                                        }`}
                                    onClick={() => handleSubjectChange(subject)}
                                >
                                    {subject.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <span className='w-56 overflow-hidden'><a href='#'>  <Submitbutton message='Continue' handleSignIn={handlecontinue} /></a></span>
            </div>
        </div>

    );
};
export default Subjects;
