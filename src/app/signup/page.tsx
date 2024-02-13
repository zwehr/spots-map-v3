'use client';

import { useState } from 'react';
import { merriweather } from '../fonts';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [isSignupComplete, setIsSignupComplete] = useState<boolean>(false);

  const supabase = createClientComponentClient();

  const router = useRouter();

  const handleSignUp = async () => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setUser(res.data.user);
    router.refresh();
    setEmail('');
    setPassword('');
    setIsSignupComplete(true);
  };

  if (isSignupComplete)
    return (
      <div className='max-w-lg mx-auto text-center mt-48'>
        <p className={merriweather.className}>
          Thanks for creating an account!
        </p>
        <p className={merriweather.className}>
          Check your email for a confirmation link before{' '}
          <Link href='login' className='link'>
            logging in
          </Link>
          .
        </p>
      </div>
    );

  return (
    <>
      <h1 className='uppercase'>Create an Account</h1>
      <div className='bg-slate-100 p-8 mt-24 rounded-lg shadow-md w-96 mx-auto'>
        <input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className={`mb-4 w-full p-3 rounded-md border text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 ${merriweather.className}`}
        />
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className={`mb-4 w-full p-3 rounded-md border text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 ${merriweather.className}`}
        />
        <button
          onClick={handleSignUp}
          className='w-full mb-2 p-3 rounded-md bg-blue-800 text-white hover:bg-blue-700 focus:outline-none'
        >
          <span className='text-lg'>SIGN UP</span>
        </button>
      </div>
    </>
  );
}
