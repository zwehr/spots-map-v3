import AddSpotForm from '@/components/spot/AddSpotForm';
import insertSpot from '@/lib/fetch/insertSpot';
import { InsertOneResult, ObjectId } from 'mongodb';

export default function AddSpot() {
  // experimental server action so this function can be sent to client component (AddSpotForm) as props
  async function addSpot(spot: NewSpot) {
    'use server';
    const newSpotData: Promise<string | undefined> = insertSpot('spots', spot);
    const newSpotId = await newSpotData;
    return newSpotId;
  }
  return (
    <>
      <h1>Add Spot</h1>
      <div className='bg-slate-100 max-w-xl mx-auto mb-24 p-6 rounded-md shadow-lg'>
        <AddSpotForm addSpot={addSpot} />
      </div>
    </>
  );
}
