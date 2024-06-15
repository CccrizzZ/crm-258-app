import React from 'react'
import { BeatLoader } from 'react-spinners'

type LoadingSpinerProp = {
  show: boolean
}

const LoadingSpiner: React.FC<LoadingSpinerProp> = ({ show }) => {
  if (show) {
    return (
      <div className='fixed flex h-screen w-full text-center select-none opacity-90 bg-neutral-800 justify-center items-center' style={{ zIndex: 1500 }} >
        <div className='rounded-3xl p-6 pt-10' style={{ backgroundColor: '#000' }}>
          <BeatLoader className='ml-auto mr-auto' color='#099268' speedMultiplier={1.5} />
          <h4 className='mt-5 text-white'>Loading...</h4>
        </div>
      </div>
    )
  }
}

export default LoadingSpiner
