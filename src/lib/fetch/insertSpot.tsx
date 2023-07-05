import clientPromise from '../mongodb/mongodb';

export default async function insertSpot(collection: string, spot: NewSpot) {
  try {
    const client = await clientPromise;
    const db = client.db('geolocations');
    const insertResultDoc = await db.collection(collection).insertOne(spot);
    const newSpotId = insertResultDoc.insertedId.toString();
    return newSpotId;
  } catch (e) {
    console.error(e);
  }
}
