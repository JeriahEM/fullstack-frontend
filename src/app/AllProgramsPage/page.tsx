'use client'

import React, { useEffect, useState } from 'react'
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
import { checkForUserOnRefresh, countUsersInProgram, createProgram, splitStringToArray } from '@/app/utils/Dataservices';
import { ICreateProgram, IDisplayProgram } from '../Interfaces/Interfaces';
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Image from 'next/image';
import { getProgramBySport } from '../utils/Dataservices';
import { useAppContext } from '@/Context/context';


const AllProgramsPage = () => {
  const { currentProgramContext, setCurrentProgramContext } = useAppContext()

  const initialPrograms: IDisplayProgram[] = [];
  useEffect(() => {

    checkForUserOnRefresh()
    setUserID(sessionStorage.getItem("userID"))
    const tempArr = splitStringToArray(sessionStorage.getItem('programs'))
    if (tempArr) {
      setProgramArr(tempArr);
    }
    const grabPrograms = async () => {
      setDisplayPrograms(await getProgramBySport(sessionStorage.getItem("sport")))
    }
    grabPrograms();

  }, [])

  const [displayPrograms, setDisplayPrograms] = useState<IDisplayProgram[]>(initialPrograms)
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [newProgramTitle, setNewProgramTitle] = useState<string>("");
  const [newProgramDescription, setNewProgramDescription] = useState<string>("");

  const [userID, setUserID] = useState<string | null>("0")
  const [programArr, setProgramArr] = useState<string[]>([])

  // const [tempModal, setTempModal] = useState(false);

  const router = useRouter();

  const handleCloseModals = () => {
    setOpenModal(false);
    setOpenConfirmModal(false);
    setOpenCancelModal(false);
    console.log("this is the user id" + userID)
  }

  const handleNewProgram = async () => {

    const newProgram: ICreateProgram = {
      id: 2,
      programName: newProgramTitle,
      programSport: sessionStorage.getItem('sport'),
      description: newProgramDescription,
      adminID: userID
    };

    // try {
    //   const createdProgram = await createProgram(newProgram);
    //   console.log(createdProgram);
    // } catch (error) {
    //   console.error(error);
    // }
    const addProgram = async () => {
      await createProgram(newProgram);
    }
    addProgram();
    console.log(newProgram)
    setOpenModal(false);
    setOpenConfirmModal(false);
    setOpenCancelModal(false);
  };


  const handleSport = (sport: string | null) => {

    switch (sport) {
      case "Tennis":
        return (<div className='flex flex-row items-center'>
          <SportsTennisOutlinedIcon fontSize="large" />
          <p className='pl-3 hidden md:block'>Tennis</p>
        </div>)
      case "Football":
        return (<div className='flex flex-row items-center'>
          <SportsFootballOutlinedIcon fontSize="large" />
          <p className='pl-3'>Football</p>
        </div>)
      case "Basketball":
        return (<div className='flex flex-row items-center'>
          <SportsBasketballOutlinedIcon fontSize="large" />
          <p className='pl-3'>Basketball</p>
        </div>)
      case "Soccer":
        return (<div className='flex flex-row items-center'>
          <SportsSoccerOutlinedIcon fontSize="large" />
          <p className='pl-3'>Soccer</p>
        </div>)
      case "Baseball":
        return (<div className='flex flex-row items-center'>
          <SportsBaseballOutlinedIcon fontSize="large" />
          <p className='pl-3'>Baseball</p>
        </div>)
      case "Volleyball":
        return (<div className='flex flex-row items-center'>
          <SportsVolleyballOutlinedIcon fontSize="large" />
          <p className='pl-3'>Volleyball</p>
        </div>)
      case "Wrestling":
        return (<div className='flex flex-row items-center'>
          <SportsKabaddiOutlinedIcon fontSize="large" />
          <p className='pl-3'>Wrestling</p>
        </div>)
      case "Golf":
        return (<div className='flex flex-row items-center'>
          <GolfCourseOutlinedIcon fontSize="large" />
          <p className='pl-3'>Golf</p>
        </div>)
      case "Swimming":
        return (<div className='flex flex-row items-center'>
          <PoolOutlinedIcon fontSize="large" />
          <p className='pl-3'>Swimming</p>
        </div>)
      case "Hockey":
        return (<div className='flex flex-row items-center'>
          <SportsHockeyOutlinedIcon fontSize="large" />
          <p className='pl-3'>Hockey</p>
        </div>)
      case "Gymnastics":
        return (<div className='flex flex-row items-center'>
          <SportsGymnasticsOutlinedIcon fontSize="large" />
          <p className='pl-3'>Gymnastics</p>
        </div>)
      case "Track-and-Field":
        return (<div className='flex flex-row items-center'>
          <DirectionsRunOutlinedIcon fontSize="large" />
          <p className='pl-3'>Track and Field</p>
        </div>)
      case "Water-Polo":
        return (
          <div className='flex flex-row items-center'>
            <SportsVolleyballRoundedIcon fontSize="small" /><PoolOutlinedIcon fontSize="large" />
            <p className='pl-3'>Water Polo</p>
          </div>
        )

      default:
        break;
    }

  }

  const handleViewBtn = (program: string) => {
    setCurrentProgramContext(program)
    sessionStorage.setItem('lastProgram', program)
    router.push("/HomePage")
  }
  const handleLeaveBtn = (programID: number, userID: string | null) => {
    // console.log("program number is: " + programID)
    // console.log("userId is : " + userID)
    console.log(programArr)
    alert("systems for leaving and deleting a program are being worked on, Sorry!")
  }
  const makeDisplayPrograms = () => {
    return displayPrograms.map((program: IDisplayProgram, index) => (
      <div key={index} className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
        <div className="grow-0">
          <LocationOnOutlinedIcon />
        </div>
        <div className="grow">{program.programName}</div>

        <div className="grow-0 grid grid-cols-2 font-titillium">
          <p># {countUsersInProgram(program)}</p>
          {programArr.includes(program.programName) ?
            <Button onClick={() => handleLeaveBtn(program.programID, sessionStorage.getItem('userID'))} className='border-2 border-black bg-red-500  rounded-lg min-w-36 h-14 font-titillium bg-none w-14 text-lg hover:text-white'>Leave Program</Button>
            :
            <Button onClick={() => handleViewBtn(program.programName)} className='border-2 border-black bg-green-500  rounded-lg min-w-36 h-14 font-titillium bg-none w-14 text-lg hover:text-white'>View</Button>
          }

        </div>
      </div>


    ))
  }
  return (
    <div className="bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100% h-screen card w-full">
      <NavbarComponent />

      <div className="flex flex-row text-3xl font-titillium font-bold pt-14 justify-center  items-end">
        {handleSport(sessionStorage.getItem('sport'))}
        {/* <div className='flex flex-row items-center'>
          <SportsVolleyballRoundedIcon fontSize="small"/><PoolOutlinedIcon fontSize="large"/>
          <p className='pl-3'>Water Polo</p>
        </div> */}
        {/* <div className='flex flex-row items-center'>
          <SportsSoccerOutlinedIcon  fontSize="large"/>
          <p className='pl-3'>Soccer</p>
        </div> */}

      </div>
      <div className="grid grid-cols-1 mx-7">
        <hr className="h-px mt-2 bg-black border-0 dark:bg-gray-700" />
        <div className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
          <div className="grow-0">
            <LocationOnOutlinedIcon className='invisible' />
          </div>
          <div className="grow">
            <p className=' cursor-pointer lg:pl-16 font-bold' onClick={() => setOpenModal(true)}>Add Program</p>
          </div>

          <div className="grow-0 grid grid-cols-2 font-titillium ">
            <p className=' md:pt-3 lg:pt-2 font-bold'>Members</p>
            <Button className='border-2 border-black bg-neutral-100 rounded-lg font-titillium bg-none w-[4rem] text-black hover:text-white min-w-36 h-14' onClick={() => setOpenModal(true)}>Create Program</Button>
            <Modal size="xl" popup onClose={() => setOpenModal(false)} show={openModal}>
              <Modal.Header>
                <p className='text-gray-900 dark:text-white font-titillium'>Create New Program</p>
              </Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <h1>
                    <p className=' text-sm leading-relaxed text-gray-900 dark:text-white py-4 font-titillium' >Create your own unique group now! Add users to your program and get started with organizing your calendar! <br /> Each program will automatically be assigned to the sport you are currently in. To filter programs by a different sport go to the <a className="text-blue-600 hover:text-blue-300 font-titillium" onClick={() => router.push('/SportsSelectionPage')}>Sport Selection</a>  page and click on a new one. <p className='text-xs text-gray-500'>(include location please)</p></p>
                  </h1>



                  <div>
                    <div className="mb-2 block font-titillium">
                      <Label htmlFor="programName" value="Enter the name of your Program" />
                    </div>
                    <TextInput onChange={(e) => setNewProgramTitle(e.target.value)} id="New Program" minLength={4} required maxLength={60} />
                  </div>
                  <div>
                    <div className="mb-2 block font-titillium">
                      <Label htmlFor="programDescription" value="Enter a description" />
                    </div>
                    <Textarea onChange={(e) => setNewProgramDescription(e.target.value)} id="New Program" minLength={4} required />
                  </div>


                  <div className="w-full flex flex-row justify-between">
                    <Button onClick={() => setOpenCancelModal(true)} className="!bg-red-500 font-titillium">Cancel</Button>
                    <Modal show={openCancelModal} size="md" >

                      <Modal.Body>
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white font-titillium">
                            Are you sure you would like to discard these changes?
                          </h3>

                          <div className="w-full flex flex-row justify-between">
                            <Button className="!bg-red-500 font-titillium" onClick={() => setOpenCancelModal(false)}>Cancel</Button>
                            <Button className="!bg-green-500 font-titillium" onClick={() => handleCloseModals()}>Confirm</Button>
                          </div>

                        </div>
                      </Modal.Body>
                    </Modal>
                    <Button onClick={() => setOpenConfirmModal(true)} className="!bg-green-500 font-titillium">Create Program</Button>
                    <Modal show={openConfirmModal} size="md">
                      <Modal.Body>
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white font-titillium">
                            Are you sure you would like to save these changes?
                          </h3>

                          <div className="w-full flex flex-row justify-between font-titillium">
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
        </div>


        <div className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
          <div className="grow-0">
            <LocationOnOutlinedIcon />
          </div>
          <div className="grow">
            <p>Billy Willy's Swimmy Win Team</p>
          </div>

          <div className="grow-0 grid grid-cols-2 font-titillium">
            <p>#{ }</p>
            <Button className='border-2 border-black bg-green-500  rounded-lg min-w-36 h-14 font-titillium bg-none w-14 text-lg hover:text-white'>Join</Button>

          </div>
        </div>

        <div className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
          <div className="grow-0">
            <LocationOnOutlinedIcon />
          </div>
          <div className="grow">
            <p>Roger Federer Tennis Group</p>
          </div>

          <div className="grow-0 grid grid-cols-2 font-titillium">
            <p>#{ }</p>
            <Button className='border-2 border-black bg-green-500  rounded-lg min-w-36 h-14 font-titillium bg-none w-14 text-lg hover:text-white'>Join</Button>

          </div>
        </div>
        {makeDisplayPrograms()}
        <br />
        <br />
      </div>
    </div>
  );
};

export default AllProgramsPage
