import React from 'react'
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useRouter } from 'next/navigation';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SportsBaseballOutlinedIcon from '@mui/icons-material/SportsBaseballOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';

const NavbarComponent = () => {
    const router = useRouter();
    return (
        <Navbar fluid rounded>
          <Navbar.Brand>
            <span className="self-center whitespace-nowrap text-xl font-bebas font-semibold dark:text-white">Court Monitor</span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <p className='pt-2 pr-2'>Billy Willy</p>
            <Dropdown
              arrowIcon={true}
              inline
              label={
                <Avatar className='pb-2' alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
              }
            >
              <Dropdown.Item onClick={()=> router.push('/HomePage')}>
                <div className='flex flex-row items-center'>
                    <HomeOutlinedIcon/>
                    <p className='pl-2'>Home</p>
                </div >
              </Dropdown.Item>
              <Dropdown.Item onClick={()=> router.push('/ProfilePage')}>
                <div className='flex flex-row items-center'>
                    <PersonOutlineOutlinedIcon/>
                    <p className='pl-2'>Profile</p>
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={()=> router.push('/NotificationsPage')}>
              <div className='flex flex-row items-center'>
                    <EmailOutlinedIcon/>
                    <p className='pl-2'>Notifications</p>
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={()=> router.push('/UserDirectoryPage')}>
              <div className='flex flex-row items-center'>
                    <PersonSearchOutlinedIcon/>
                    <p className='pl-2'>User Directory</p>
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={()=> router.push('/AllProgramsPage')}>
              <div className='flex flex-row items-center'>
                    <ListOutlinedIcon/>
                    <p className='pl-2 font-titillium'>All Programs</p>
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={()=> router.push('/SportsSelectionPage')}>
              <div className='flex flex-row items-center'>
                    <SportsBaseballOutlinedIcon/>
                    <p className='pl-2'>Sports Selection</p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={()=> router.push('/')}>
              <div className='flex flex-row items-center'>
                    <LogoutOutlinedIcon/>
                    <p className='pl-2'>Sign out</p>
                </div>
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Dropdown className='font-bebas' label="Manteca Future Stars" inline>
      <Dropdown.Item>Manteca Future Stars</Dropdown.Item>
      <Dropdown.Item>US Open</Dropdown.Item>
    </Dropdown>

        </Navbar>
      );
    }

export default NavbarComponent
