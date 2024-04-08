"use client";
import React from "react";
import NavbarComponent from "../Components/NavbarComponent";
import Image from "next/image";
import image1 from "../assets/images/image1.png";
import phUser from "../assets/images/Group13.png";

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap')
</style>
// For this page we will need to call users id, pfp, username, status

const programOwner = ["Roger Ffederer"];

const coaches = ["Kyle Yok Eyh Ma"];

const user = ["Billy Willy"];

const UserDirectoryPage = () => {
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
          <div className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
            <Image src={image1} alt={""} />
            <p>Roger Federer</p>
          </div>
          <p className="mt-4 text-3xl font-titillium">Coaches</p>
          <hr className="h-px mt-2 bg-black border-0 dark:bg-gray-700" />
          <div className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
            <Image src={phUser} alt={""} />
            <p>Kyle Yok Eyh Ma</p>
          </div>
          <div className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
            <Image src={phUser} alt={""} />
            <p>Nick Kyrgios</p>
          </div>
          <p className="mt-4 text-3xl font-titillium">Users</p>
          <hr className="h-px mt-2 bg-black border-0 dark:bg-gray-700" />
          <div className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
            <Image src={phUser} alt={""} />
            <p>LeBron James</p>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default UserDirectoryPage;
