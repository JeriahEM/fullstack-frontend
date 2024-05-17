import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SportsBaseballOutlinedIcon from '@mui/icons-material/SportsBaseballOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';



import { checkForUserOnRefresh, checkToken, loggedinData, splitStringToArray } from '@/app/utils/Dataservices';
import { useAppContext } from "@/Context/context";
const NavbarComponent = () => {

  const {currentProgramContext, setCurrentProgramContext} = useAppContext()

  const [username, setUsername] = useState<string>("")
  const [programArr, setProgramArr] = useState<string[]>()
  

  const handleProgramClick = (program:string) =>{
    setCurrentProgramContext(program)
    sessionStorage.setItem('lastProgram', program)
    router.push('/HomePage')
  }
  const createDropDown = () =>{
    return programArr?.map((program)=>(
      <Dropdown.Item onClick={()=>handleProgramClick(program)}>{program}</Dropdown.Item>
    ))
  }    



  useEffect(() => {

    const getLoggedinData = async () => {
      await checkForUserOnRefresh()
      const loggedIn = await loggedinData();
      setProgramArr(splitStringToArray(sessionStorage.getItem('programs')));
      if(programArr){
        setCurrentProgramContext(programArr[0])
        sessionStorage.setItem('lastProgram', programArr[0]) 
      }
      
      setUsername(loggedIn.username)
      // let userBlogItems: IBlogItems[] = await getBlogItemsByUserId(loggedIn.userId)

      // let filiteredBlogItems = userBlogItems.filter(item => item.isDeleted === false);
      // setBlogUserId(loggedIn.userId)
      // setPublisherName(loggedIn.publisherName)
      // setBlogItems(filiteredBlogItems)
    }


    if (checkToken()) {
      getLoggedinData()
    }
    else {
      router.push('/')
      alert("error has occuereed")
    }
  }, [])


  const logout = () => {
    router.push('/');
    sessionStorage.clear();
  }


  const router = useRouter();
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <div className="sm:hidden">
          <span className="self-center whitespace-nowrap text-2xl font-bebas font-semibold dark:text-white tracking-[0.5rem]" onClick={() => router.push('/HomePage')}>CM</span>
        </div>
        <div className="hidden md:block">
          <span className="self-center whitespace-nowrap text-2xl font-bebas font-semibold dark:text-white tracking-[0.5rem]" onClick={() => router.push('/HomePage')}>Court Monitor</span>
        </div>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <p className='pt-2 pr-2'>{username}</p>
        <Dropdown
          arrowIcon={true}
          inline
          label={
            <Avatar className='pb-2' alt="User settings" img="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" rounded />
          }
        >
          <Dropdown.Item onClick={() => router.push('/HomePage')}>
            <div className='flex flex-row items-center'>
              <HomeOutlinedIcon />
              <p className='pl-2'>Home</p>
            </div >
          </Dropdown.Item>
          <Dropdown.Item onClick={() => router.push('/ProfilePage')}>
            <div className='flex flex-row items-center'>
              <PersonOutlineOutlinedIcon />
              <p className='pl-2'>Profile</p>
            </div>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => router.push('/NotificationsPage')}>
            <div className='flex flex-row items-center'>
              <EmailOutlinedIcon />
              <p className='pl-2'>Notifications</p>
            </div>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => router.push('/UserDirectoryPage')}>
            <div className='flex flex-row items-center'>
              <PersonSearchOutlinedIcon />
              <p className='pl-2'>User Directory</p>
            </div>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => router.push('/AllProgramsPage')}>
            <div className='flex flex-row items-center'>
              <ListOutlinedIcon />
              <p className='pl-2 font-titillium'>All Programs</p>
            </div>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => router.push('/SportsSelectionPage')}>
            <div className='flex flex-row items-center'>
              <SportsBaseballOutlinedIcon />
              <p className='pl-2'>Sports Selection</p>
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => logout()}>
            <div className='flex flex-row items-center'>
              <LogoutOutlinedIcon />
              <p className='pl-2'>Sign out</p>
            </div>
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Dropdown className='font-bebas text-6xl' label={currentProgramContext} inline>
        {/* <Dropdown.Item>Manteca Future Stars</Dropdown.Item>
        <Dropdown.Item>US Open</Dropdown.Item> */}
        {createDropDown()}
      </Dropdown>

    </Navbar>
  );
}

export default NavbarComponent
