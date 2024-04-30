'use client'

import React, { useState } from 'react'
import NavbarComponent from '../Components/NavbarComponent'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Button } from 'flowbite-react';

// const [openModal, setOpenModal] = useState(false);
// const [openConfirmModal, setOpenConfirmModal] = useState(false);
// const [openCancelModal, setOpenCancelModal] = useState(false);

// // const handleCloseModals = () => {
// //   setOpenModal(false);
// //   setOpenConfirmModal(false);
// //   setOpenCancelModal(false);
// // }
// // const handleNewProgram = () => {
// //   setOpenModal(false);
// //   setOpenConfirmModal(false);
// //   setOpenCancelModal(false);
// // }


const AllProgramsPage = () => {
  return (
    <div className="bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100% h-screen card w-full">
      <NavbarComponent />
      <div className="flex flex-col  text-3xl font-titillium font-bold pt-14">
        <p>All Programs</p>
        <Button className=''>Create new program</Button>
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
