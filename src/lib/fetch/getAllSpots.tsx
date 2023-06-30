import clientPromise from '../mongodb/mongodb';

export default async function getAllSpots() {
  const client = await clientPromise;
  const db = client.db('geolocations');
  const spots = await db.collection('spots').find<Spot>({}).toArray();

  return spots;
}
