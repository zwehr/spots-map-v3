import { ObjectId } from 'mongodb';
import clientPromise from '../mongodb/mongodb';

export default async function getSpotById(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db('geolocations');
    const spot = await db
      .collection('spots')
      .findOne<Spot>({ _id: new ObjectId(id) });
    return spot;
  } catch (e) {
    console.error(e);
  }
}
