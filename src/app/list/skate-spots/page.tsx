import getAllSpots from '@/lib/fetch/getAllSpots';

export default async function SpotsList() {
  const spotsData: Promise<Spot[]> = getAllSpots();
  const spots = await spotsData;

  return (
    <>
      <h1>Spots List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Type</th>
            <th>Status</th>
            <th>Tags</th>
            <th>YouTube Links</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {spots.map((spot) => (
            <tr key={spot._id}>
              <td>{spot.name}</td>
              <td>{spot.description}</td>
              <td>{spot.lat.toFixed(3)}</td>
              <td>{spot.lng.toFixed(3)}</td>
              <td>{spot.type}</td>
              <td>{spot.status}</td>
              <td>{spot.tags}</td>
              <td>
                {spot.youtubeLinks.map((link, index) => (
                  <>
                    <a
                      href={link}
                      target='_blank'
                      className='underline text-sky-600 hover:text-sky-800'
                    >
                      {index + 1}
                    </a>{' '}
                  </>
                ))}
              </td>
              <td>{new Date(spot.createdAt).toLocaleDateString('en-US')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
