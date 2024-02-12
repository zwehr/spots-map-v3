export default async function Video({ params }: { params: { id: number } }) {
  return (
    <div className='max-w-4xl mx-auto text-left'>
      <h1>Video ID {params.id} (will fetch title later)</h1>
      <h2 className='text-left'>Spots in this video:</h2>
      <p className='pl-4'>[will fetch later]</p>
      <h2 className='text-left'>Parks in this video:</h2>
      <p className='pl-4'>[will fetch later]</p>
      <h2 className='text-left mt-24'>
        [Map showing only spots from video could be cool]
      </h2>
    </div>
  );
}
