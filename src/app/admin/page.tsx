import Link from 'next/link';

export default function AddSelection() {
  return (
    <>
      <h1 className='uppercase'>Admin Panel</h1>
      <div className='flex flex-col text-center bg-gray-200 max-w-sm mx-auto rounded m-2 mb-6 p-2 shadow-md'>
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
      <div className='flex flex-col text-center bg-gray-200 max-w-sm mx-auto rounded m-2 p-2 shadow-md'>
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
}
