'use client'

import React, { useEffect } from 'react'
import { useAppContext } from '@/Context/Context';
import NavbarComponent from '../Components/NavbarComponent'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SportName from '../SportsSelectionPage/page'

const AllProgramsPage = () => {

  const { sportName } = useAppContext()
  
  return (
    <div className="bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100% h-screen card w-full">
      <NavbarComponent />
      <div className="flex flex-col items-center text-3xl font-titillium font-bold pt-14">
        <p>{sportName}</p>
        <p>All Programs</p>
      </div>
      <div className="grid grid-cols-1 mx-7">
          <hr className="h-px mt-2 bg-black border-0 dark:bg-gray-700" />

          <div className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
            <LocationOnOutlinedIcon/>
            <p>Billy Willy</p>
          </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default AllProgramsPage
