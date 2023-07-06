import clientPromise from '@/lib/mongodb/mongodb';
import { InsertOneResult } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('geolocations');
    const spots = await db.collection('spots').find({}).toArray();
    return NextResponse.json(spots);
  } catch (e) {
    console.log(e);
  }
}

export async function POST(request: Request) {
  const spot: NewSpot = await request.json();

  if (!spot)
    return NextResponse.json({
      message: 'Missing required data spot: NewSpot',
    });

  const client = await clientPromise;
  const db = client.db('geolocations');

  const newSpotData: Promise<InsertOneResult<Document>> = db
    .collection('spots')
    .insertOne(spot);
  const newSpotDoc = await newSpotData;

  return NextResponse.json({ newSpotDoc }, { status: 200 });
}
