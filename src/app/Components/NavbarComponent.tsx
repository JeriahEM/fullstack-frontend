import React from 'react'
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useRouter } from 'next/navigation';
import profile from "../assets/images/profile.png";

const NavbarComponent = () => {
    const router = useRouter();
    return (
        <Navbar fluid rounded>
          <Navbar.Brand>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Court Monitor</span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={true}
              inline
              label={
                <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Billy Willy</span>
                <span className="block truncate text-sm font-medium">billywilly@madeup.org</span>
              </Dropdown.Header>
              <Dropdown.Item onClick={()=> router.push('/HomePage')} >Home</Dropdown.Item>
              <Dropdown.Item onClick={()=> router.push('/ProfilePage')}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={()=> router.push('/NotificationsPage')}>Notifications</Dropdown.Item>
              <Dropdown.Item onClick={()=> router.push('/SportsSelectionPage')}>Sports Selection</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Dropdown label="Manteca Future Stars" inline>
      <Dropdown.Item>Manteca Future Stars</Dropdown.Item>
      <Dropdown.Item>US Open</Dropdown.Item>
    </Dropdown>

        </Navbar>
      );
    }

export default NavbarComponent
