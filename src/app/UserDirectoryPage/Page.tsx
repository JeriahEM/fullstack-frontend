'use client'
import React from 'react'
import NavbarComponent from '../Components/NavbarComponent'
import Image from 'next/image'
import image1 from '../assets/images/image1.png'
import phUser from '../assets/images/Group13.png'

// For this page we will need to call users id, pfp, username, status


const UserDirectoryPage = () => {
  return (
    
    <div className='bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100% h-screen card w-full'>
        <NavbarComponent/>
        <div className='grid grid-cols-1'>
          <div>
            <p>Program Owner</p>
            <hr />
            <div className='flex flex-row'>
              <Image src={image1} alt={""} />
              <p>Roger Federer</p>
            </div>
            <p>Coaches</p>
            <hr />

            <div className='flex flex-row'>
              <Image src={phUser} alt={""}/>
              <p>Kyle Yok Eyh Ma</p>
            </div>
            <p>Users</p>
            <hr />
            <div className='flex flex-row'>
              <Image src={phUser} alt={""}/>
              <p>Billy Willy</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default UserDirectoryPage
