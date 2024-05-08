"use client";

import React, { createContext, useContext, useEffect } from "react";
import NavbarComponent from "../Components/NavbarComponent";
import golf from "../assets/images/golf.jpg";
import { useRouter } from "next/navigation";
import { checkForUserOnRefresh } from "@/utils/Dataservices";


const SportsSelectionPage = () => {
  

  useEffect(() =>{
    checkForUserOnRefresh()
  },[])
  const router = useRouter();
  const sports = [
    "Tennis",
    "Football",
    "Basketball",
    "Soccer",
    "Baseball",
    "Volleyball",
    "Wrestling",
    "Golf",
    "Swimming",
    "Hockey",
    "Gymnastics",
    "Track-and-Field",
    "Water-Polo",
  ];

  const SportsList = ({ sports: [] }) => {
    
    return sports.map((sport, index) => (
      <div key={index} className=" flex justify-center py-4">
        <button className={`${sport} h-32 lg:h-44 w-[90%] rounded-lg text-6xl font-bold `} 
        onClick={()=> router.push('/AllProgramsPage')}>
          <p className="textShadow">{sport}</p>
        </button>
      </div>
    ));
  };
  return (
    <div className=" bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100%">
      <NavbarComponent />
      <h1 className="text-center text-6xl font-bold py-4 font-titillium">Select a Sport</h1>
      <div className="mx-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 font-titillium">
          <SportsList sports={sports} />
        </div>
      </div>
    </div>
  );
};

export default SportsSelectionPage;
