import clientPromise from '@/lib/mongodb/mongodb';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      northBoundary: number;
      southBoundary: number;
      eastBoundary: number;
      westBoundary: number;
    };
  }
) {
  try {
    const client = await clientPromise;
    const db = client.db('geolocations');
    const spots = await db
      .collection('spots')
      .find<Spot>({
        lat: {
          $gt: Number(params.southBoundary),
          $lt: Number(params.northBoundary),
        },
        lng: {
          $gt: Number(params.westBoundary),
          $lt: Number(params.eastBoundary),
        },
      })
      .toArray();
    return NextResponse.json(spots);
  } catch (e) {
    console.log(e);
  }
}
