import Link from 'next/link';

type MapListItemProps = {
  spot: Spot;
};

export default function MapListItem({ spot }: MapListItemProps) {
  return (
    <div className='bg-slate-100 m-3 p-3 rounded-md shadow-md' id={spot._id}>
      <h3 className='font-semibold'>{spot.name}</h3>
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
