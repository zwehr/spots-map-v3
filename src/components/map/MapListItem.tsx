import youtubeToTimestamp from '@/lib/misc-helper/youtubeToTimestamp';
import Link from 'next/link';
import { FiCornerRightDown } from 'react-icons/fi';

type MapListItemProps = {
  spot: Spot;
  selectedSpot: string;
};

export default function MapListItem({ spot, selectedSpot }: MapListItemProps) {
  return (
    <div
      className={`m-3 p-3 rounded-md shadow-md ${
        selectedSpot === spot._id ? 'bg-amber-300' : 'bg-slate-100'
      }`}
      id={spot._id}
    >
      <h3 className='font-semibold text-lg'>{spot.name}</h3>
      <p>
        {youtubeToTimestamp(spot.youtubeLinks[0])} timestamp{' '}
        <FiCornerRightDown className='inline align-bottom' />
      </p>
      <div className='iframe-container'>
        <iframe
          /* Default width and height are 560 and 315 respectively. */
          width='550'
          height='315'
          src={spot.youtubeLinks[0]}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      </div>
      <p>{spot.description}</p>
      <Link href={`/spot/${spot._id}`} className='link'>
        View more information
      </Link>
    </div>
  );
}
