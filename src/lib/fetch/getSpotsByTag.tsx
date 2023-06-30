import clientPromise from '../mongodb/mongodb';

export default async function getSpotsByTag(tag: string) {
  try {
    const client = await clientPromise;
    const db = client.db('geolocations');
    const spots = await db
      .collection('spots')
      .find<Spot>({ tags: tag })
      .toArray();

    return spots;
  } catch (e) {
    console.error(e);
  }
}
