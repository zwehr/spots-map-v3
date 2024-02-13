import Link from 'next/link';
import {
  User,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { SiAdblock } from 'react-icons/si';
import { merriweather } from '../fonts';

export default async function AddSelection() {
  const cookieStore = cookies;
  const supabase = createServerComponentClient({
    cookies: () => cookieStore(),
  });

  const {
    data: { user },
  }: { data: { user: User | null } } = await supabase.auth.getUser();
  console.log(user);

  const { data, error } = await supabase.from('roles').select('role');
  console.log('data: ', data);

  if (data && data.length > 0 && data[0].role === 'admin') {
    return (
      <>
        <h1 className='uppercase'>Admin Panel</h1>
        <div className='flex flex-col text-center bg-gray-200 w-72 mx-auto rounded m-2 mb-6 p-2 shadow-md'>
          <h2 className='mb-2'>Add to Database</h2>
          <Link href='/admin/add/spot' className='link text-xl m-0.5'>
            Add a Spot
          </Link>
          <Link href='/admin/add/park' className='link text-xl m-0.5'>
            Add a Park
          </Link>
          <Link href='/admin/add/shop' className='link text-xl m-0.5'>
            Add a Shop
          </Link>
          <Link href='/admin/add/video' className='link text-xl m-0.5'>
            Add a Video
          </Link>
        </div>
        <div className='flex flex-col text-center bg-gray-200 w-72 mx-auto rounded m-2 p-2 shadow-md'>
          <h2 className='mb-2'>Admin Lists</h2>
          <Link href='/admin/list/skate-spots' className='link text-xl m-0.5'>
            Spots List
          </Link>
          <Link href='/admin/list/skate-parks' className='link text-xl m-0.5'>
            Parks List
          </Link>
          <Link href='/admin/list/skate-shops' className='link text-xl m-0.5'>
            Shops List
          </Link>
          <Link href='/admin/list/skate-videos' className='link text-xl m-0.5'>
            Videos List
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <div className='max-w-sm mx-auto flex flex-col justify-items-center items-center mt-24'>
        <SiAdblock className='text-red-600 text-8xl text-center' />
        <h1 className='uppercase'>Admin Only Area</h1>
        <p className={merriweather.className}>
          You aren't an admin, or you need to{' '}
          <Link href='/login' className='link'>
            login
          </Link>{' '}
          first.
        </p>
      </div>
    );
  }
}
