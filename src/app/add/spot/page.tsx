import AddSpotForm from '@/components/forms/AddSpotForm';
import insertGeolocation from '@/lib/fetch/insertGeolocation';
import { InsertOneResult } from 'mongodb';

export default function AddSpot() {
  async function addNewSpot(newSpot: NewSpot) {
    'use server';
    try {
      const newSpotData: Promise<InsertOneResult<Document> | undefined> =
        insertGeolocation('spots', newSpot);
      const newSpotDoc = await newSpotData;
      const newSpotId = newSpotDoc?.insertedId.toString();
      return newSpotId;
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <h1>Add Spot</h1>
      <div className='bg-slate-100 max-w-xl mx-auto mb-24 p-6 rounded-md shadow-lg'>
        <AddSpotForm addNewSpot={addNewSpot} />
      </div>
    </>
  );
}
