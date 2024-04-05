'use client'

import React from 'react'

const SportsPage = () => {
    const sports = [
        "Tennis",
        "American Football",
        "Basketball",
        "Soccer",
        "Baseball",
        "Softball",
        "Track and Field",
        "Volleyball",
        "Wrestling",
        "Cross Country",
        "Golf",
        "Swimming and Diving",
        "Lacrosse",
        "Cheerleading",
        "Field Hockey",
        "Ice Hockey",
        "Rugby",
        "Gymnastics",
        "Water Polo",
        "Ultimate Frisbee"
      ];
    
      const SportsList = ({ sports:[] }) => {
        return (
            sports.map((sport, index) => (
              <div key={index} className=" flex justify-center py-3">
                <button className=" bg-blue-300 h-36 w-[80%] rounded-lg text-5xl font-bold">{sport}</button>
              </div>
            ))
        );
      };
  return (
    <>
    
      <h1 className="text-center text-4xl font-bold py-4">Select a Sport</h1>
      <div className="border-2 border-red-600 mx-7">
        <div className="grid grid-cols-2">

          <SportsList sports={sports}/>

          </div>
      </div>
          </>
  )
}

export default SportsPage