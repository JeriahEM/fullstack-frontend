"use client";

import React from "react";
import NavbarComponent from "../Components/NavbarComponent";
import golf from "../assets/images/golf.jpg";
import { useRouter } from "next/navigation";
// import basketball from "../assets/images/basketball.jpg";
// import football from "../assets/images/football.jpg";
// import baseball from "../assets/images/baseball.jpg";
// import gymnastics from "../assets/images/gymnastics.jpg";
// import hockey from "../assets/images/hockey.jpg";
// import soccer from "../assets/images/soccer.jpg";
// import swimming from "../assets/images/swimming.jpg";
// import track from "../assets/images/trackandfield.jpg";
// import volleyball from "../assets/images/volleyball.jpg";
// import waterpolo from "../assets/images/waterpolo.jpg";
// import wrestling from "../assets/images/wrestling.jpg";
// import tennis from "../assets/images/marianna-smiley-Y4YeUSYLFsw-unsplash 1.png";

const SportsSelectionPage = () => {
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
    <div className=" font-titillium bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100%">
      <NavbarComponent />
      <h1 className="text-center text-6xl font-bold py-4">Select a Sport</h1>
      <div className="mx-7">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <SportsList sports={sports} />
        </div>
      </div>
    </div>
  );
};

export default SportsSelectionPage;
