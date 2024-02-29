import AddParkForm from '@/components/forms/AddParkForm';

export default async function AddPark() {
  return (
    <>
      <h1 className='uppercase'>Add Park</h1>
      <div className='bg-gray-200 max-w-5xl mx-auto mb-24 p-6 rounded-md shadow-lg'>
        <AddParkForm />
      </div>
    </>
  );
}
