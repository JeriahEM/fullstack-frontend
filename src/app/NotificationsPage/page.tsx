"use client";
import React, { useEffect } from "react";
import NavbarComponent from "../Components/NavbarComponent";

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { checkForUserOnRefresh } from "@/utils/Dataservices";

const NotificationsPage = () => {
  useEffect(() =>{
    checkForUserOnRefresh()
 },[])


  const styles = {

    largeIcon: {
      width: 60,
      height: 60,
    },
  
  };
  
  return (
    <div className="  bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100%">
      <NavbarComponent />

      <div className="grid grid-cols-3">
        <div className=" border-r-2 border-black h-screen">
        <div className=" flex justify-center py-4">
            <button className={` bg-slate-200 h-28 w-[90%] lg:w-[80%] rounded-lg text-2xl lg:text-4xl font-bold flex justify-center items-center`}>
              <div className="px-4 hidden md:block">
                <MailOutlineIcon fontSize="large"/>
              </div>
              <div className="px-1 sm:hidden ">
                <MailOutlineIcon fontSize="small"/>
              </div>
              <p className="font-titillium">System</p>
            </button>
          </div>
        </div>

        <div className=" col-span-2">
          <ul style={{ listStyleType: "square" }}>
            {/* message element */}
            <div className="flex justify-center py-4">
              <li className="ml-8">
                <div className="border-2 border-black bg-slate-200 rounded-lg mx-2 md:mx-8 px-5 py-9">
                  <p className="text-lg md:text-2xl font-bold font-titillium">
                    Green Dot Practice: 6pm - 8pm on Monday, March 3/11 has been
                    removed.
                  </p>
                </div>
              </li>
            </div>
          </ul>
        </div>


      </div>
      
     </div> 
  );
};

export default NotificationsPage;
