"use client";
import { useRouter } from "next/navigation";
import NavbarComponent from "../Components/NavbarComponent";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { formatDate, splitStringToArray, getUserByUsername, MoveUserToAnotherStatus, RemoveUserFromProgram } from "@/app/utils/Dataservices";
import { IAddUserToProgram, IRemoveUser, IUserdata } from "../Interfaces/Interfaces";

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import placehold from "../assets/images/Group13.png"
import Image from "next/image";
import { useAppContext } from "@/Context/context";

//testing to see if i can push


const GuestProfilepage = () => {
    const { currentProgramContext, setCurrentProgramContext, currentUserContext, setCurrentUserContext} = useAppContext()
    const router = useRouter();
    const defaultUserData: IUserdata = {
        userID: 0,
        username: '',
        birthday: '',
        image: '',
        programs: '',
        funFact: '',
        email: '',
        sports: '',
        realName: '',
        isAdmin: false,
        isCoach: false,
        isUser: false,
      };
    
    const [user, setUser] = useState<IUserdata>(defaultUserData)
    const [programs, setPrograms] = useState<string>("")

    useEffect(()=>{
        const getUser = async ()=>{
           const userData:IUserdata = await getUserByUsername(typeof window !== 'undefined' ?sessionStorage.getItem("viewing") : null)
           setUser(userData)
           setPrograms(userData.programs)
        }
        getUser()
    },[])


    const handleProgramClick = (program: string) => {

        setCurrentProgramContext(program)
        sessionStorage.setItem('lastProgram', program)
        router.push('/HomePage')
    }

    const handleAdmin = async () =>{
        const body:IAddUserToProgram = {
            programID: Number(sessionStorage.getItem('lastProgramID')) || 0,
            userId: user.userID,
            status: "admin"
        }
        await MoveUserToAnotherStatus(body)
    }

    const handleGeneral = async () =>{
        const body:IAddUserToProgram = {
            programID: Number(sessionStorage.getItem('lastProgramID')) || 0,
            userId: user.userID,
            status: "general"
        }
        await MoveUserToAnotherStatus(body)
    }
    const handleRemoveUser = async () =>{
        const ProgramName = sessionStorage.getItem('lastProgram') || '0';
        const UserId = user.userID;
        
        await RemoveUserFromProgram(ProgramName, UserId)
    }


    const makeDisplayPrograms = () => {
        const programArr = splitStringToArray(programs)
        if (programArr) {
            return programArr.map((program, index) => (
                <div key={index} className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
                    <div className="text-5xl">
                        <LocationOnOutlinedIcon fontSize="inherit" />
                    </div>
                    <button onClick={() => handleProgramClick(program)} className=" hover:cursor-pointer hover:font-bold hover:text-blue-600">
                        {program}
                    </button>

                </div>
            ))
        }

    }


    return (
        <>
            <NavbarComponent />
            <div className="bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100%">
                <div className="grid grid-cols-6 mx-7 py-8 ">
                    <div className=" col-span-6 md:col-span-3 lg:col-span-2  md:w-full w-48 ml-20 md:ml-0">
                        <div className="flex justify-center">
                            <div className="lg:my-4 " >
                                <Image className="w-[100%] h-40 md:h-[45vh] lg:border-2 border-black rounded-3xl" alt={user.image} src={user.image || placehold} width={270} height={270}/>
                            </div>
                        </div>
                    </div>

                    <div className=" col-span-6 md:col-span-3 lg:col-span-4 lg:px-16 flex flex-col justify-between">
                        <div className="">
                            <ul style={{ listStyleType: "none" }}>
                                <li className="my-3">
                                    <div className="flex flex-row text-2xl font-titillium">
                                        <p className="pe-3 font-bold">Name:</p>
                                        <p>{user.realName}</p>
                                    </div>
                                </li>
                                <li className="my-3">
                                    <div className="flex flex-row text-2xl font-titillium">
                                        <p className="pe-3 font-bold">Birthday:</p>
                                        <p>{formatDate(user?.birthday)}</p>
                                        {/* <p>{user.birthday}</p> */}
                                    </div>
                                </li>
                                <li className="my-3">
                                    <div className="flex flex-row text-2xl font-titillium">
                                        <p className="pe-3 font-bold">Status:</p>
                                        <p>{currentUserContext}</p>
                                    </div>
                                </li>
                                <li className="my-3">
                                    <div className="flex flex-row text-2xl font-titillium">
                                        <p className="pe-3 font-bold">Fun Fact:</p>
                                        <p>{user.funFact}</p>
                                    </div>
                                </li>
                                <li className="my-3">
                                    <div className="flex flex-row text-2xl font-titillium">
                                        <p className="pe-3 font-bold">User Name:</p>
                                        <p>{user.username}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {typeof window !== 'undefined' && sessionStorage.getItem('userStatus') == "admin"? 

                        <div className="mt-auto flex justify-center">
                            <Button onClick={handleAdmin} className="border-2 border-black  rounded-lg min-w-36 h-14 font-titillium bg-none"> Set to Admin </Button>
                            <Button onClick={handleGeneral} className="border-2 border-black  rounded-lg min-w-36 h-14 font-titillium bg-none"> Set to General </Button>
                            <Button onClick={handleRemoveUser} className="border-2 border-black  rounded-lg min-w-36 h-14 font-titillium bg-none"> Remove User </Button>
                        </div> 
                       :
                        <div>  </div> 
                        } 
                    </div>
                </div>

                <h1 className="text-center text-3xl font-bold py-4 font-titillium">Affiliated Programs</h1>
                <div className=" h-[40vh] mx-7 ">
                    {makeDisplayPrograms()}
                </div>
            </div>
        </>

    )
}

export default GuestProfilepage