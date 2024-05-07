'use client'

import React, { useState } from 'react'
import NavbarComponent from '../Components/NavbarComponent'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Button, Label, Modal, TextInput, Textarea } from 'flowbite-react';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';
import SportsTennisOutlinedIcon from '@mui/icons-material/SportsTennisOutlined';
import SportsFootballOutlinedIcon from '@mui/icons-material/SportsFootballOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined';
import SportsBaseballOutlinedIcon from '@mui/icons-material/SportsBaseballOutlined';
import SportsVolleyballOutlinedIcon from '@mui/icons-material/SportsVolleyballOutlined';
import SportsKabaddiOutlinedIcon from '@mui/icons-material/SportsKabaddiOutlined';
import GolfCourseOutlinedIcon from '@mui/icons-material/GolfCourseOutlined';
import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';
import SportsHockeyOutlinedIcon from '@mui/icons-material/SportsHockeyOutlined';
import SportsGymnasticsOutlinedIcon from '@mui/icons-material/SportsGymnasticsOutlined';
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';
import SportsVolleyballRoundedIcon from '@mui/icons-material/SportsVolleyballRounded';


const AllProgramsPage = () => {

const [openModal, setOpenModal] = useState(false);
const [openConfirmModal, setOpenConfirmModal] = useState(false);
const [openCancelModal, setOpenCancelModal] = useState(false);
const [newProgramTitle, setNewProgramTitle] = useState<string>("");
const [newProgramDescription, setNewProgramDescription] = useState<string>("");

// const [tempModal, setTempModal] = useState(false);

const router = useRouter();

const handleCloseModals = () => {
  setOpenModal(false);
  setOpenConfirmModal(false);
  setOpenCancelModal(false);
}
const handleNewProgram = () => {
  setOpenModal(false);
  setOpenConfirmModal(false);
  setOpenCancelModal(false);
}

  return (
    <div className="bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100% h-screen card w-full">
      <NavbarComponent />
      <div className="flex flex-row text-3xl font-titillium font-bold pt-14 justify-evenly items-end">
        <div className='flex flex-row items-center'>
          <SportsVolleyballRoundedIcon fontSize="small"/><PoolOutlinedIcon fontSize="large"/>
          <p className='pl-3'>Water Polo</p>
        </div>
        {/* <div className='flex flex-row items-center'>
          <SportsSoccerOutlinedIcon  fontSize="large"/>
          <p className='pl-3'>Soccer</p>
        </div> */}
        <p className=' items-center'>All Programs</p>
        <Button className='border-2 border-black  rounded-lg min-w-36 h-14 font-titillium bg-none w-14 text-lg' onClick={() => setOpenModal(true)}>Create new program</Button>
        <Modal size="xl" popup onClose={() => setOpenModal(false)} show={openModal}>
          <Modal.Header>
            <p className='text-gray-900 dark:text-white'>Create New Program</p>
          </Modal.Header>
          <Modal.Body>
                <div className="space-y-6">
                  <h1>
                    <p className=' text-sm leading-relaxed text-gray-900 dark:text-white py-4' >Create your own unique group now! Add users to your program and get started with organizing your calendar! <br /> Each program will automatically be assigned to the sport you are currently in. To filter programs by a different sport go to the <a className="text-blue-600 hover:text-blue-300" onClick={()=> router.push('/SportsSelectionPage')}>'Sport Selection'</a>  page and click on a new one.</p>
                  </h1>



                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="programName" value="Enter the name of your Program"/>
                    </div>
                    <TextInput onChange={(e) => setNewProgramTitle(e.target.value)} id="New Program" minLength={4} required maxLength={60}/>
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="programDescription" value="Enter a description" />
                    </div>
                    <Textarea onChange={(e) => setNewProgramDescription(e.target.value)} id="New Program" minLength={4} required />
                  </div>


                  <div className="w-full flex flex-row justify-between">
                    <Button onClick={() => setOpenCancelModal(true)} className="!bg-red-500">Cancel</Button>
                    <Modal show={openCancelModal} size="md" >

                      <Modal.Body>
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Are you sure you would like to discard these changes?
                          </h3>

                          <div className="w-full flex flex-row justify-between">
                            <Button className="!bg-red-500" onClick={() => setOpenCancelModal(false)}>Cancel</Button>
                            <Button className="!bg-green-500" onClick={() => handleCloseModals()}>Confirm</Button>
                          </div>

                        </div>
                      </Modal.Body>
                    </Modal>
                    <Button onClick={() => setOpenConfirmModal(true)} className="!bg-green-500">Create Program</Button>
                    <Modal show={openConfirmModal} size="md">
                      <Modal.Body>
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Are you sure you would like to save these changes?
                          </h3>

                          <div className="w-full flex flex-row justify-between">
                            <Button className="!bg-red-500" onClick={() => setOpenConfirmModal(false)}>Cancel</Button>
                            <Button className="!bg-green-500" onClick={() => handleNewProgram()} >Confirm</Button>
                            {/* <Modal popup onClose={() => setTempModal(false)} show={tempModal} size="md">
                              <Modal.Header/>
                              <Modal.Body>
                                <h3>This feature is in progres</h3>
                              </Modal.Body>
                            </Modal> */}
                          </div>

                        </div>
                      </Modal.Body>
                    </Modal>

                  </div>

                </div>
              </Modal.Body>
        </Modal>
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
