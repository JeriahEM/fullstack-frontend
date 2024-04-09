"use client";
import React from "react";
import NavbarComponent from "../Components/NavbarComponent";

import MailOutlineIcon from '@mui/icons-material/MailOutline';

const NotificationsPage = () => {


  const styles = {

    largeIcon: {
      width: 60,
      height: 60,
    },
  
  };
  
  return (
    <div className=" font-titillium">
      <NavbarComponent />

      <div className="grid grid-cols-3">
        <div className=" border-r-2 border-red-600 h-full">
          <div className=" flex justify-center py-4">
            <button className={` bg-slate-200 h-32 w-[90%] rounded-lg text-4xl font-bold flex justify-center items-center`}>
              <div className="px-4">
                <MailOutlineIcon style={styles.largeIcon}/>
              </div>
              
              <p className="">System</p>
            </button>
          </div>
        </div>

        <div className=" col-span-2">
          <ul style={{ listStyleType: "square" }}>
            {/* message element */}
            <div className="flex justify-center py-4">
              <li>
                <div className="border-2 border-black bg-slate-200 rounded-lg mx-8 px-5 py-9">
                  <p className="text-2xl font-bold">
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
