import React from 'react'
import PrimaryBtn from '../components/buttons/PrimaryBtn'

const Home = () => {
  return (
    <div className='w-full hero'>
      <div className='w-10/12 mx-auto text-white'>
        <div className='w-2/4 flex flex-col gap-4 items-start'>
          <h2 className='text-6xl font-bold'>Smart Control.</h2>
          <h3 className='text-4xl font-bold'>Smart Life.</h3>
          <p className='font-semibold'>Control LED and/or I/O control units on several
            different levels, from chains, areas, postal codes, down to objects, departments, rooms and unit
            level.</p>
          <PrimaryBtn />
        </div>
      </div>
    </div>
  )
}

export default Home