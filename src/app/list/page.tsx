import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { User } from '@supabase/auth-helpers-nextjs';
import { merriweather } from '../fonts';

export default async function ListSelection() {
  /*
  const cookieStore = cookies;
  const supabase = createServerComponentClient({
    cookies: () => cookieStore(),
  });

  const {
    data: { user },
  }: { data: { user: User | null } } = await supabase.auth.getUser();

  console.log({ user });

  if (!user) {
    return (
      <main className={`text-center mt-24 ${merriweather.className}`}>
        <p className='p-2'>
          You must have a (free) account to view and filter spot/park lists.
        </p>
        <p className='p-2'>
          <Link href={'/login'} className='link'>
            Click here
          </Link>{' '}
          to log in or sign up.
        </p>
      </main>
    );
  }
  */

  return (
    <>
      <h1>Lists</h1>
      <div className='flex justify-center bg-gray-200 max-w-2xl mx-auto rounded-md shadow-lg p-4'>
        <div className='flex justify-center mx-auto p-2 space-x-4 text-xl'>
          <Link href='/list/skate-spots' className='link'>
            <div className='bg-gray-400 p-2 rounded-sm shadow-md hover:scale-105 transition-transform duration-300 ease-in-out'>
              <div className='w-full h-24 rounded bg-gray-50'>[Spot Image]</div>
              View Spots List
            </div>
          </Link>
          <Link href='/list/skate-parks' className='link'>
            <div className='bg-gray-400 p-2 rounded-sm shadow-md hover:scale-105 transition-transform duration-300 ease-in-out'>
              <div className='w-full h-24 rounded bg-gray-50'>[Park Image]</div>
              View Parks List
            </div>
          </Link>
          <Link href='/list/skate-shops' className='link'>
            <div className='bg-gray-400 p-2 rounded-sm shadow-md hover:scale-105 transition-transform duration-300 ease-in-out'>
              <div className='w-full h-24 rounded bg-gray-50'>[Shop Image]</div>
              View Shops List
            </div>
          </Link>
          <Link href='/list/skate-videos' className='link'>
            <div className='bg-gray-400 p-2 rounded-sm shadow-md hover:scale-105 transition-transform duration-300 ease-in-out'>
              <div className='w-full h-24 rounded bg-gray-50'>
                [Video Image]
              </div>
              View Videos List
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
