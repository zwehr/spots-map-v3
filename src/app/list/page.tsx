import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { User } from '@supabase/auth-helpers-nextjs';
import { merriweather } from '../fonts';

export default async function ListSelection() {
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

  return (
    <>
      <h1>Lists</h1>
      <h2>
        <Link href='/list/skate-spots' className='link'>
          View Spots List
        </Link>
      </h2>
      <h2>
        <Link href='/list/skate-parks' className='link'>
          View Parks List
        </Link>
      </h2>
    </>
  );
}
