import Link from 'next/link';

export default function AdminListSelection() {
  return (
    <>
      <h1>Admin Lists</h1>
      <h2>
        <Link href='/admin-list/skate-spots' className='link'>
          View Admin Spots List
        </Link>
      </h2>
      <h2>
        <Link href='/admin-list/skate-parks' className='link'>
          View Admin Parks List
        </Link>
      </h2>
    </>
  );
}
