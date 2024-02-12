import AddVideoForm from '@/components/forms/AddVideoForm';

export default function AddVideo() {
  return (
    <>
      <h1 className='uppercase'>Add Video</h1>
      <div className='max-w-4xl mx-auto bg-slate-200 mb-24 p-6 rounded-md shadow-lg'>
        <AddVideoForm />
      </div>
    </>
  );
}
