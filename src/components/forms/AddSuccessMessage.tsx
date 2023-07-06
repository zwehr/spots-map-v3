import Link from 'next/link';
import { RiCloseCircleFill } from 'react-icons/ri';

type AddSuccessMessageProps = {
  id: string;
  handleCloseClick: () => void;
};

export default function SubmittedMessage({
  id,
  handleCloseClick,
}: AddSuccessMessageProps) {
  return (
    <div className='flex justify-center w-96 mx-auto p-1 bg-slate-300 text-green-900 border-2 border-green-500'>
      <div className=''>
        Spot added successfully.{' '}
        <Link className='link' href={`/spot/${id}`} target='_blank'>
          View new spot.
        </Link>
      </div>
      <div className='ml-2'>
        <button
          className='align-middle text-2xl'
          title='Clear message'
          onClick={handleCloseClick}
        >
          <RiCloseCircleFill className='text-red-500 hover:text-red-600' />
        </button>
      </div>
    </div>
  );
}
