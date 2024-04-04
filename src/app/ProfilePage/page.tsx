'use client'

import { useRouter } from 'next/navigation';

import React from 'react'

const page = () => {

    const router = useRouter();
  return (
    <>
    <div className="flex flex-row text-center h-10 w-full bg-slate-500 items-center">
        <h1 className="px-4">TEMP NAVBAR</h1>
        <button onClick={() => router.push('/HomePage')}>HOME</button>
    </div>


    <div className="grid grid-cols-6 mx-7 py-8">
        <div className="col-span-2 bg-orange-100 w-full">

            <div className="flex justify-center">
                <div className="my-4 border-2 border-black bg-lime-300 w-[80%] h-[45vh]"></div>
            </div>

        </div>

        <div className=" col-span-4 px-16 flex flex-col justify-between">
           
                <div className="">
                    <ul style={{ listStyleType: "none" }}>
                        <li className="my-3">
                            <div className='flex flex-row text-2xl'>
                                <p className='pe-3 font-bold'>Name:</p>
                                <p>Kyle Yok Eyh Ma</p>
                            </div>
                        </li>
                        <li className="my-3">
                            <div className='flex flex-row text-2xl'>
                                <p className='pe-3 font-bold'>Birthday:</p>
                                <p>03/39</p>
                            </div>
                        </li>
                        <li className="my-3">
                            <div className='flex flex-row text-2xl'>
                                <p className='pe-3 font-bold'>Status:</p>
                                <p>Coach, Admin</p>
                            </div>
                        </li>
                        <li className="my-3">
                            <div className='flex flex-row text-2xl'>
                                <p className='pe-3 font-bold'>Fun Fact:</p>
                                <p>Born to nap forced to code</p>
                            </div>
                        </li>
                        
                    </ul>
                </div>
                <div className='mt-auto flex justify-center'>
                    <button className='border-2 border-black rounded-lg min-w-36 h-14'> EDIT </button>
                </div>
        </div>

    </div>

    <h1 className="text-center text-3xl font-bold py-4">Affiliated Programs</h1>
<div className="border-2 border-red-600 h-[40vh] mx-7"></div>
</>
  )
}

export default page