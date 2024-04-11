'use client'

import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'
import NavbarComponent from '../Components/NavbarComponent';


const HomePage = () => {
  


    const router = useRouter();
  return (
    <>
    <NavbarComponent/>



      <div className="grid grid-cols-5 mx-5 bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100%">
          <div className="col-span-2 bg-orange-300  w-full py-8">
            <p className="text-center inter">CALENDER WILL GO IN HERE</p>
            <div className="flex justify-center">
              <div className=" bg-lime-300 w-[90%] h-[45vh]"></div>
            </div>
            
          </div>
        

        <div className=" col-span-3 px-16">
          <div className="py-8">
            <h1 className="text-center text-3xl font-titillium font-bold">THIS IS TODAYS DATE</h1>
            <div className="">
              <ul style={{ listStyleType: 'square' }}>
                <li className="my-3 font-titillium">EVENT 1</li>
                <li className="my-3 font-titillium">EVENT 2</li>
                <li className="my-3 font-titillium">EVENT 3 </li>
              </ul>
            </div>


          </div>
        </div>

      </div>

      <h1 className="text-center text-3xl font-titillium font-bold py-4">UPCOMING EVENTS</h1>
      <div className="border-2 border-red-600 h-[40vh] mx-5"></div>
    </>
  )
}

export default HomePage