"use client";

import React, { useEffect, useState } from "react";
import NavbarComponent from "../Components/NavbarComponent";
import golf from "../assets/images/golf.jpg";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/Context/Context";
// import basketball from "../assets/images/basketball.jpg";
// import football from "../assets/images/football.jpg";
// import baseball from "../assets/images/baseball.jpg";
// import gymnastics from "../assets/images/gymnastics.jpg";
// import hockconst [sport, setSport] = useState<string>("")ey from "../assets/images/hockey.jpg";
// import soccer from "../assets/images/soccer.jpg";
// import swimming from "../assets/images/swimming.jpg";
// import track from "../assets/images/trackandfield.jpg";
// import volleyball from "../assets/images/volleyball.jpg";
// import waterpolo from "../assets/images/waterpolo.jpg";
// import wrestling from "../assets/images/wrestling.jpg";
// import tennis from "../assets/images/marianna-smiley-Y4YeUSYLFsw-unsplash 1.png";

const SportsSelectionPage = () => {
  //const [sportName, setSportName] = useState<string>('')
  const router = useRouter();

  const data = useAppContext();

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
const [test, setTest] = useState('')
  const handleClick = (sport: any) => {
    console.log(data.sportName, sport)

    data.setSportName(test);
    router.push("../AllProgramsPage");
  };

  const SportsList = ({ sports: [] }) => {
    return sports.map((sport, index) => (
      <div key={index} className=" flex justify-center py-4">
<<<<<<< HEAD
        <button
          className={`${sport} h-44 w-[90%] rounded-lg text-7xl font-bold`}
          onClick={() => handleClick(sport)}>
=======
        <button className={`${sport} h-44 w-[90%] rounded-lg text-6xl font-bold `} 
        onClick={()=> router.push('/AllProgramsPage')}>
>>>>>>> 437c6edcd20b521848f01ee3095aa996fcbca9cd
          <p className="textShadow">{sport}</p>
        </button>
      </div>
    ));
  };

  return (
<<<<<<< HEAD
    <div className="font-titillium">
=======
    <div className=" font-titillium bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100%">
>>>>>>> 437c6edcd20b521848f01ee3095aa996fcbca9cd
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
