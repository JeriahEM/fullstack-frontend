'use client'

import React from 'react'
import NavbarComponent from '../Components/NavbarComponent';

const SportsSelectionPage = () => {
    const sports = [
        "Tennis",
        "American Football",
        "Basketball",
        "Soccer",
        "Baseball",
        "Volleyball",
        "Wrestling",
        "Golf",
        "Swimming",
        "Lacrosse",
        "Hockey",
        "Gymnastics",
        "Track and Field",
        "Water Polo",
      ];
    
      const SportsList = ({ sports:[] }) => {
        return (
            sports.map((sport, index) => (
              <div key={index} className=" flex justify-center py-3">
                <button className=" bg-blue-300 h-36 w-[90%] rounded-lg text-5xl font-bold">{sport}</button>
              </div>
            ))
        );
      };
  return (
    <>
    <NavbarComponent/>
      <h1 className="text-center text-4xl font-bold py-4">Select a Sport</h1>
      <div className="border-2 border-red-600 mx-7">
        <div className="grid grid-cols-2">

          <SportsList sports={sports}/>

          </div>
      </div>
          </>
  )
}

export default SportsSelectionPage