"use client";
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils';
import { handleSignIn2 } from '@/lib/actions/user.actions'
import Image from 'next/image';
import React, { useState } from 'react';
import eyeimage from '../public/icons/eye.svg'
import eyeslash from '../public/icons/eye-slash.svg'
import Submitbutton from './submitbutton';
import { setCookie, destroyCookie } from 'nookies';
import { useRouter } from 'next/navigation'
import Loading from './Loading';

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isvalidcred, setvalidcred] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setmessage] = useState("Incorrect email or password. Please try again.")
  const [isLoading, setIsLoading] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setvalidcred(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setvalidcred(true);
  };



  const handleSignIn = async (e) => {

    if (email && password)//check if any of email or password is wrong
    {
      setIsLoading(true);
      //  console.log("pasword is ",password,email)
      handleSignIn2(email, password).then(user => {
        console.log(user);

        // console.log("user is return", user);

        if (user != "error" && user != "password") {
          setvalidcred(true);
          const userId = user[0].userId;
          const name = user[0].name;
          const profile2 = user[0].profile;
          destroyCookie(null, 'userId');
          destroyCookie(null, 'username');
          destroyCookie(null, 'profile');
          setCookie(null, 'userId', userId, {
            maxAge: 30 * 24 * 60 * 60, // Cookie will expire in 30 days
            path: '/', // Cookie is available on all paths
          });

          setCookie(null, 'username', name, {
            maxAge: 30 * 24 * 60 * 60, // Cookie will expire in 30 days
            path: '/', // Cookie is available on all paths
          });
          setCookie(null, 'profile', profile2, {
            maxAge: 30 * 24 * 60 * 60, // Cookie will expire in 30 days
            path: '/', // Cookie is available on all paths
          });
          const profile = user[0].profile;
          console.log("cookies are set hi iam a t profile ", name, userId, user[0].profile);
          if (user[0].profile === 'pending') {
            router.push('/choosesubjects');
          }
          else {
            router.push('/alltasks');
          }
        }
        else if (user === "password") {
          setmessage("password is incorrect");
          setvalidcred(false);
        }
        else if (user === "error") {
          setmessage("Incorrect email or there is no account on given email");
          setvalidcred(false);
        }
        else {
          setmessage("an error ");
          setvalidcred(false);
        }
        setIsLoading(false);
      }
      );
    }

  };
  const togglePasswordVisibility = () => {
    console.log("toogle  ", showPassword);
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className='bg-yellow-500 w-screen h-screen flex justify-center items-center'>
      <div className="fixwidth p-20  bg-white rounded-md shadow-md max-md:pt-20 max-md:pb-20 max-md:pl-10 max-md:pr-10 max-md:w-80">
        <div className=" text-3xl font-bold leading-9 text-center">
          Sign in
        </div>
        <div className="text-gray-600 text-xs font-normal leading-0 mt-3 text-center">
          Don't have an account?<a href="/signup" className="ml-1 underline text-yellow-500">Sign up</a>
        </div>
        <div className="mb-2 mt-7 font-poppins">
          <div className="flex justify-between">
            <label className="text-black block font-medium text-base">E-mail</label>

          </div>
          <input
            type="email"
            label='email'
            placeholder='name@email.com'
            value={email}
            onChange={handleEmailChange}
            className="border border-solid border-yellow-500 w-full p-2 rounded-xl text-sm font-normal"
          />

        </div>
        <div className="font-poppins mb-2">
          <label className="text-black block font-medium text-base">Password:</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              label='password'
              placeholder='enter your password'
              onChange={handlePasswordChange}
              className="border border-solid border-yellow-500 w-full p-2 pr-10 rounded-xl text-sm font-normal"
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

        <div className='h-11'>
          <div className={`bg-red-200 p-2 rounded-xl text-red-700 font-medium text-base ${isvalidcred ? 'hidden' : 'flex'}`}>
            {message}
          </div>
        </div>
        <Submitbutton message='Sign in' handleSignIn={handleSignIn} />      </div>
      {isLoading && <Loading />}
    </div>
  )
}
