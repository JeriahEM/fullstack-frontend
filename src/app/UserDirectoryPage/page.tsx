"use client";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../Components/NavbarComponent";
import Image from "next/image";
import phUser from "../assets/images/Group13.png";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { checkForUserOnRefresh, getUsersByProgramName } from "@/app/utils/Dataservices";
import { useRouter } from "next/navigation"
import { useAppContext } from "@/Context/context";

// For this page we will need to call users id, pfp, username, status

// const programOwner = ["Roger Federer"];

// const coaches = ["Kyle Yok Eyh Ma"];

// const user = ["Billy Willy"];

interface userReturn{
  status: string,
  userName: string,
  realName: string,
  image: any
}
interface userObject {
  [key: string]: userReturn[];
}
const UserDirectoryPage = () => {
  const router = useRouter();
  const { currentProgramContext, setCurrentProgramContext, currentUserContext, setCurrentUserContext} = useAppContext()
  useEffect(() =>{
    checkForUserOnRefresh()
    const program = sessionStorage.getItem('lastProgram')
    const getUsers = async ()=>{
      const userData:userObject = await getUsersByProgramName(program)
      console.log(userData)
      const item1: userReturn[] = userData["item1"];
      const item2: userReturn[] = userData["item2"];
      const item3: userReturn[] = userData["item3"];
      setAdmins(item1)
      setCoaches(item2)
      setGeneral(item3)
    }
    getUsers()

  },[])

const [admins, setAdmins] = useState<userReturn[]>([])
const [coaches, setCoaches] = useState<userReturn[]>([])
const [general, setGeneral] = useState<userReturn[]>([])

const handleProfileAdminChange = (user:string) =>{
  router.push(`/GuestProfilePage`)
  sessionStorage.setItem('viewing', user)
  setCurrentUserContext("Admin")
  console.log(currentProgramContext)
}
const handleProfileCoachChange = (user:string) =>{
  router.push(`/GuestProfilePage`)
  sessionStorage.setItem('viewing', user)
  setCurrentUserContext("Coach")
  console.log(currentProgramContext)
}
const handleProfileGeneralChange = (user:string) =>{
  router.push(`/GuestProfilePage`)
  sessionStorage.setItem('viewing', user)
  setCurrentUserContext("General")
  console.log(currentProgramContext)
}

  const createAdmin = ()  => {
    return admins.map((user, idx) => (
      <div
        key={idx}
        className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9"
      >
        <div className="grow-0 hover:cursor-pointer ">
          <Image className="rounded-lg" onClick={()=>handleProfileAdminChange(user.userName)} src={user.image||phUser} alt={""} width={120} height={120}/>
        </div>
        <div className="grow flex">
          
            <p>{user.realName} ({user.userName})</p>
          
        </div>
        <div className="grow-0">
       
        </div>
      </div>
    ));
  }

  const createCoaches = () => {

    if(coaches.length == 0){
      return (
        <div className="flex justify-center text-xl mt-6">
          <p>There are no Coaches assigned</p>
        </div>
      )
    } else{
      return coaches.map((user, idx) => (
      <div
        key={idx}
        className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9"
      >
        <div className="grow-0 hover:cursor-pointer">
          <Image className="rounded-lg" onClick={()=>handleProfileCoachChange(user.userName)}  src={user.image||phUser} alt={""} width={120} height={120}/>
        </div>
        <div className="grow">
          <p>{user.realName} ({user.userName})</p>
        </div>
        <div className="grow-0">
          
        </div>
      </div>
    ));
    }
    
  }

  const createUser = () => {
    if(general.length == 0){
      return (
        <div className="flex justify-center text-xl mt-6">
          <p>Find some new users!</p>
        </div>
      )
    } else{
    return general.map((user, idx) => (
      <div
        key={idx}
        className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9"
      >
        <div className="grow-0 hover:cursor-pointer">
          <Image className="rounded-lg" onClick={()=>handleProfileGeneralChange(user.userName)}  src={user.image||phUser } alt={""} width={120} height={120}/>
        </div>
        <div className="grow">
          <p>{user.realName} ({user.userName})</p>
        </div>
        <div className="grow-0">
          
        </div>
      </div>
    ));
  }
  };

  return (
    <div className="bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100% h-screen card w-full">
      <NavbarComponent />
      <div className="flex flex-col items-center text-3xl font-titillium font-bold pt-14">
        <p>User Directory</p>
      </div>
      <div className="grid grid-cols-1 mx-7">
        <div>
          <p className="mt-4 text-3xl font-titillium">Program Owner</p>
          <hr className="h-px mt-2 bg-black border-0 dark:bg-gray-700" />
          {/* <div className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
            <div className="grow-0">
              <Image src={image1} alt={""} />
            </div>
            <div className="grow">
              <p>Roger Federer</p>
            </div>
            
            <div className="grow-0 ">
              <MoreVertOutlinedIcon />
            </div>
          </div> */}
          {createAdmin()}
          <p className="mt-4 text-3xl font-titillium">Coaches</p>
          <hr className="h-px mt-2 bg-black border-0 dark:bg-gray-700" />
          {/* <div className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
            <Image src={phUser} alt={""} />
            <p>Kyle Yok Eyh Ma</p>
          </div>
          <div className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
            <Image src={phUser} alt={""} />
            <p>Nick Kyrgios</p>
          </div> */}
          {createCoaches()}
          <p className="mt-4 text-3xl font-titillium">Users</p>
          <hr className="h-px mt-2 bg-black border-0 dark:bg-gray-700" />
          {/* <div className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
            <Image src={phUser} alt={""} />
            <p>LeBron James</p>
          </div>
          <div className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
            <Image src={phUser} alt={""} />
            <p>Billy Willy</p>
          </div> */}
          {createUser()}
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default UserDirectoryPage;
