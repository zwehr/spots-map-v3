import LinkTags from '../tags/LinkTags';

type SpotDetails = {
  spot: Spot;
};

export default function SpotDetails({ spot }: SpotDetails) {
  return (
    <>
      <p className='mb-4'>
        <span className='font-bold'>Name:</span> {spot.name}
      </p>
      <p className='mb-4'>
        <span className='font-bold'>Description:</span> {spot.description}
      </p>
      <p className='mb-4'>
        <span className='font-bold'>Coordinates:</span> {spot.lat}, {spot.lng}
      </p>
      <p>
        <span className='font-bold'>Tags: </span>
      </p>
      <LinkTags tags={spot.tags} />
      <p className='mb-4 mt-4'>
        <span className='font-bold'>Type:</span>{' '}
        {spot.type[0].toUpperCase() + spot.type.slice(1)}
      </p>
      <p className='mb-4'>
        <span className='font-bold'>Status:</span>{' '}
        {spot.status[0].toUpperCase() + spot.status.slice(1)}
      </p>
      <p className='mb-4'>
        <span className='font-bold'>Premium:</span>{' '}
        {spot.isPremium.toString()[0].toUpperCase() +
          spot.isPremium.toString().slice(1)}
      </p>
      <p className='mb-4'>
        <span className='font-bold'>Date Added:</span>{' '}
        {new Date(spot.createdAt).toLocaleDateString('en-US')}
      </p>
    </>
  );
}
