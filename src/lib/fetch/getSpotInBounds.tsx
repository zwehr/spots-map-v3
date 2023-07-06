import clientPromise from '../mongodb/mongodb';

export default async function getSpotInBounds(
  northBoundary: number,
  southBoundary: number,
  eastBoundary: number,
  westBoundary: number
) {
  try {
    const client = await clientPromise;
    const db = client.db('geolocations');
    const spots = await db
      .collection('spots')
      .find<Spot>({
        lat: { $gt: southBoundary, $lt: northBoundary },
        lng: { $gt: westBoundary, $lt: eastBoundary },
      })
      .toArray();

    return spots;
  } catch (e) {
    console.error(e);
  }
}
