'use client'

import React from 'react'

const HomePage = () => {
  return (
    <>
      <div className=" text-center h-10 w-full bg-slate-500 items-center">
        <h1>TEMP NAVBAR</h1>
      </div>


      <div className="grid grid-cols-5 mx-5">
          <div className="col-span-2 bg-orange-300  w-full py-8">
            <p className="text-center">CALENDER WILL GO IN HERE</p>
            <div className="flex justify-center">
              <div className=" bg-lime-300 w-[90%] h-[45vh]"></div>
            </div>
            
          </div>
        

        <div className=" col-span-3 px-16">
          <div className="py-8">
            <h1 className="text-center text-3xl font-bold">THIS IS TODAY'S DATE</h1>
            <div className="">
              <ul style={{ listStyleType: 'square' }}>
                <li className="my-3">EVENT 1</li>
                <li className="my-3">EVENT 2</li>
                <li className="my-3">EVENT 3 </li>
              </ul>
            </div>


          </div>
        </div>

      </div>

      <h1 className="text-center text-3xl font-bold py-4">UPCOMING EVENTS</h1>
      <div className="border-2 border-red-600 h-[40vh] mx-5"></div>
    </>
  )
}

export default HomePage