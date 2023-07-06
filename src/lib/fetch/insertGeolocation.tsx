import clientPromise from '../mongodb/mongodb';

export default async function insertGeolocation(
  collection: string,
  spot: NewSpot
) {
  try {
    const client = await clientPromise;
    const db = client.db('geolocations');
    const insertResultDoc = await db.collection(collection).insertOne(spot);
    return insertResultDoc;
  } catch (e) {
    console.error(e);
  }
}
