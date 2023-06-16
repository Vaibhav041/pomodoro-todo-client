"use client"
import { Inter } from 'next/font/google'
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push('/home-page');
    }  
  })
  return (
    <div className='w-full h-screen bg-cover' style={{backgroundImage:"url('/login.jpg')"}}>
      <div className='p-10 flex flex-col items-center sm:items-end'>
        <div className='sm:w-96 w-auto'>
          <h1 className='text-white text-5xl mb-5'>Welcome to Todo!</h1>
          <p className='text-blue-300 text-lg mb-5'> "time management application that combines the pomodoro technique and task list."</p>
          <Link className='bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full block text-center rounded-full text-white font-semibold text-lg' href={'/api/auth/login'}>Login</Link>
        </div>
      </div>
    </div>
  )
}
