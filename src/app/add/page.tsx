import Link from 'next/link';

export default function AddSelection() {
  return (
    <>
      <h1>Add to Database</h1>
      <h2>
        <Link href='/add/spot' className='link'>
          Add a Spot
        </Link>
      </h2>
      <h2>
        <Link href='/add/park' className='link'>
          Add a Park
        </Link>
      </h2>
    </>
  );
}
