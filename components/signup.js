"use client";
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import warimage from '../public/icons/warning.svg'
import eyeimage from '../public/icons/eye.svg'
import eyeslash from '../public/icons/eye-slash.svg'
import Submitbutton from './submitbutton';
import { useRouter } from 'next/navigation';
import Loading from './Loading';
const Login = () => {
    const router=useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [isvalidemail, setvalidemail] = useState(true);
    const [matchpassword, setmatchpassword] = useState(true);
    const [messageEmail, setmessageEmail] = useState("Enter a valid email address");
    const [isLoading,setIsLoading]=useState(false);
    const handleEmailChange = (e) => {
        setmessageEmail("Enter a valid email address");
        setEmail(e.target.value);
        setvalidemail(true);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setmatchpassword(true);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setmatchpassword(true);
    };

    const handleSignIn = async (e) => {

        const checkbox = document.getElementById('checkbtn');
        if (!checkbox.checked && isvalidemail && matchpassword&&email.length>0&&password.length>0&&password===confirmPassword) {
            alert("Please agree to the Terms of Service.");
            e.preventDefault(); // Prevent form submission
        }
        if (checkbox.checked && isvalidemail && matchpassword&&email.length>0&&password.length>0&&password===confirmPassword) {

            const parts = email.split('@');
            const username = parts[0].replace(/\./g, '');
              setIsLoading(true);
            await signIn('signup', {
                email, password, username,
                redirect: false

            }).then(res => {
                console.log(res)
                if (res.error) {
                    setmessageEmail("Email already exist");
                    setvalidemail(false);
                    
                }
                else
                {
                    router.push('/signin');
                }
                setIsLoading(false);
            })
        }

    };
    function checkEmail()
    {
           if(email.length>0)
           {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        setvalidemail(emailRegex.test(email));
           }
    }
    function checkPassword()
    {
        if (password === confirmPassword) {
            setmatchpassword(true);
        }
        else {
            setmatchpassword(false);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const togglePasswordVisibility1 = () => {

        setShowPassword1((prevShowPassword) => !prevShowPassword);
    };
    if(isLoading)
    {
        return <Loading/>
    }
    else
    {
    return (
        <div className=" min-h-screen bg-yellow-500 flex justify-center items-center text-sm">
            <div className="fixwidth bg-white h-1/2 p-8  rounded-md border-1 border-solid border-yellow-500 shadow-md
            max-md:p-8 max-md:w-80 max-md:pt-8 max-md:pb-8 font-medium text-base">
                <div className=" text-3xl font-bold leading-9 text-center">
                    Create account
                </div>
                <div className="text-gray-600 font-open-sans text-xs font-normal leading-6 text-center">
                    Already have an account? <a href="/signin" className="underline text-yellow-500">Sign In</a>
                </div>
                <div className="mb-3 mt-7 font-poppins">
                    <div className="mb-2 flex justify-between">
                        <label className="text-black block">E-mail</label>
                        <div className={`max-md:hidden ${isvalidemail ? 'hidden' : 'flex'}`}>
                            <Image src={warimage} width={20} height={20} className=' text-white max-md:hidden'></Image>
                            
                            <p className='pl-1 text-red-700'>{messageEmail}</p>
                        </div>
                    </div>
                    <input
                        type="email"
                        label='email'
                        placeholder='name@email.com'
                        value={email}
                        onBlur={checkEmail}
                        onChange={handleEmailChange}
                        className="border border-solid border-yellow-500 w-full p-2 rounded-md text-sm font-normal"
                    />
                    <div className='h-2'>
                        <div className={`md:hidden ${isvalidemail ? 'hidden' : 'flex'}`}>
                            <Image src={warimage} width={20} height={20}></Image>
                            <p className='pl-2 text-red-700'>{messageEmail}</p>
                        </div>
                    </div>
                </div>
                <div className="mb-4 mt-4 font-poppins">
                    <label className="mb-2 text-black block">Password:</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            label='password'
                            placeholder='Set your password'
                            onChange={handlePasswordChange}
                            className="border border-solid border-yellow-500 w-full p-2 pr-10 rounded-md text-sm font-normal"
                        />
                        <Image
                            src={showPassword ? eyeslash : eyeimage}
                            width={18}
                            height={28}
                            alt="Show Password"
                            className={`absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer ${showPassword ? 'text-black' : ''
                                } ${password.length >= 1 ? 'block' : 'hidden'}`}
                            onClick={togglePasswordVisibility}
                        />
                    </div>
                </div>
                <div className="mb-4 mt-4 font-poppins">
                    <div className="mb-2 flex">

                        <label className="text-black">Confirm Password:</label>
                        <div className={`ml-auto max-md:hidden ${matchpassword ? 'hidden' : 'flex'}`}>
                            <Image src={warimage} width={20} height={20}></Image>
                            <p className='ml-1 text-red-700'>Password doesn't match.</p>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword1 ? 'text' : 'password'}
                                onBlur={checkPassword}
                            value={confirmPassword}
                            placeholder='Confirm your password'
                            onChange={handleConfirmPasswordChange}
                            className="border border-solid border-yellow-500 w-full p-2 rounded-md pr-10 text-sm font-normal"
                        />
                        <Image
                            src={showPassword1 ? eyeslash : eyeimage}
                            width={18}
                            height={28}
                            alt="Show Password"
                            className={`absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer ${showPassword1 ? 'text-black' : ''
                                } ${confirmPassword.length >= 1 ? 'block' : 'hidden'}`}
                            onClick={togglePasswordVisibility1}
                        />
                    </div>
                    <div className='h-3'>
                        <div className={`md:hidden ${matchpassword ? 'hidden' : 'flex'}`}>
                            <Image src={warimage} width={20} height={20}></Image>
                            <p className='pl-2 text-red-700'>Password doesn't match.</p>
                        </div>
                    </div>
                </div>
                <span className='max-md:hidden'>  <Submitbutton message='Sign up' handleSignIn={handleSignIn} /></span>
                <span className='max-md:block hidden w-56 text-center mx-auto mt-6'>
                    <Submitbutton message='Sign' handleSignIn={handleSignIn} /></span>


                <div className="flex flex-row justify-center mt-4 text-xs text-gray-600  text-center whitespace-nowrap">
                    <input
                        id='checkbtn'
                        type="checkbox"
                        required
                        className="form-checkbox  text-yellow-500"
                        style={{ width: '15px', height: '16px' }} />
                    <div className='pl-1'>I have read and agree to the <a href="/terms" className="pl-1 text-xs font-normal text-yellow-500">Terms of Service</a></div>
                </div>
                
            </div>
            {isLoading && <Loading/>}
        </div>
    );
                            }
};

export default Login;
