'use client';

import { MouseEventHandler } from 'react';

type FindSpotsButtonProps = {
  handleFindNewSpots: (
    northBoundary: number,
    southBoundary: number,
    eastBoundary: number,
    westBoundary: number
  ) => void;
  toggleMapMoved: () => void;
  currentBounds: { north: number; south: number; east: number; west: number };
};

export default function FindSpotsButton({
  handleFindNewSpots,
  toggleMapMoved,
  currentBounds,
}: FindSpotsButtonProps) {
  const handleButtonClick = () => {
    handleFindNewSpots(
      currentBounds.north,
      currentBounds.south,
      currentBounds.east,
      currentBounds.west
    );
  };

  return (
    <button
      className='absolute left-0 right-0 mx-auto top-6 w-48 h-10 rounded-lg bg-slate-100 shadow-xl hover:bg-slate-50'
      onClick={() => {
        handleButtonClick();
        toggleMapMoved();
      }}
    >
      Find spots in this area.
    </button>
  );
}
