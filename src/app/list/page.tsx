import Link from 'next/link';

export default function ListSelection() {
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
