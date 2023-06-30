import clientPromise from '../mongodb/mongodb';

export default async function getAllSpots() {
  try {
    const client = await clientPromise;
    const db = client.db('geolocations');
    const spots = await db.collection('spots').find<Spot>({}).toArray();

    return spots;
  } catch (e) {
    console.error(e);
  }
}
