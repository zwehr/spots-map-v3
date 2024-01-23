'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { merriweather } from '../fonts';
import { User } from '@supabase/auth-helpers-nextjs';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      try {
        const {
          data: { user },
        }: { data: { user: User | null } } = await supabase.auth.getUser();

        setUser(user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    }

    getUser();
  }, []);

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
  };

  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(res.data.user);
    router.refresh();
    setEmail('');
    setPassword('');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  console.log({ loading, user });

  if (loading) {
    return (
      <p className={`text-center mt-24 ${merriweather.className}`}>
        Loading...
      </p>
    );
  }

  if (user) {
    return (
      <div className='h-screen flex flex-col justify-center items-center'>
        <div className='bg-slate-100 p-8 rounded-lg shadow-md w-96 text-center'>
          <h1
            className={`mb-8 text-xl font-bold text-slate-900 ${merriweather.className}`}
          >
            You're logged in.
          </h1>
          <button
            onClick={handleLogout}
            className='uppercase w-full p-3 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none'
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className='h-screen flex items-center justify-center p-6'>
      <div className='bg-slate-100 p-8 rounded-lg shadow-md w-96'>
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
          onClick={handleSignIn}
          className='w-full mb-2 p-3 rounded-md bg-blue-800 text-white hover:bg-blue-700 focus:outline-none'
        >
          <span className='text-lg'>LOG IN</span>
        </button>
        <button
          onClick={handleSignUp}
          className='w-full p-3 rounded-md bg-slate-600 text-white hover:bg-slate-500 focus:outline-none'
        >
          <span className='text-lg'>SIGN UP</span>
        </button>
      </div>
    </main>
  );
}
