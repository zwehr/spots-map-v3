import Link from 'next/link';

export default async function SpotsList() {
  return (
    <>
      <h1>Spots List</h1>
      <p className='text-xl text-red-500 text-center mt-12'>
        [Will be updated to match{' '}
        <Link href='/list/skate-videos' className='link'>
          public videos list style
        </Link>
        ]
      </p>
    </>
  );
}
