import clientPromise from '@/lib/mongodb';
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
