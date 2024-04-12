"use client";
import React from "react";
import NavbarComponent from "../Components/NavbarComponent";
import Image from "next/image";
import image1 from "../assets/images/image1.png";
import phUser from "../assets/images/Group13.png";
import dummyUsers from "@/utils/DummyUser.json";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

// For this page we will need to call users id, pfp, username, status

const programOwner = ["Roger Federer"];

const coaches = ["Kyle Yok Eyh Ma"];

const user = ["Billy Willy"];

const UserDirectoryPage = () => {

  const createAdmin = ()  => {
    let users = dummyUsers.filter(item => item.IsAdmin===true);

    return users.map((user, idx) => (
      <div
        key={idx}
        className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9"
      >
        <div className="grow-0">
          <Image src={phUser} alt={""} />
        </div>
        <div className="grow">
          <p>{user.RealName}</p>
        </div>
        <div className="grow-0">
          <MoreVertOutlinedIcon />
        </div>
      </div>
    ));
  }

  const createCoaches = () => {
    let users = dummyUsers.filter(item => item.IsCoach===true);
    users = users.filter(item => item.IsAdmin===false);

    return users.map((user, idx) => (
      <div
        key={idx}
        className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9"
      >
        <div className="grow-0">
          <Image src={phUser} alt={""} />
        </div>
        <div className="grow">
          <p>{user.RealName}</p>
        </div>
        <div className="grow-0">
          <MoreVertOutlinedIcon />
        </div>
      </div>
    ));
  }

  const createUser = () => {
    let users = dummyUsers.filter(item => item.IsAdmin===false);
    users = users.filter(item => item.IsCoach===false);
    
    return users.map((user, idx) => (
      <div
        key={idx}
        className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9"
      >
        <div className="grow-0">
          <Image src={phUser} alt={""} />
        </div>
        <div className="grow">
          <p>{user.RealName}</p>
        </div>
        <div className="grow-0">
          <MoreVertOutlinedIcon />
        </div>
      </div>
    ));
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
          <div className="flex flex-row mt-6 text-2xl font-titillium items-center gap-x-9">
            <div className="grow-0">
              <Image src={image1} alt={""} />
            </div>
            <div className="grow">
              <p>Roger Federer</p>
            </div>
            
            <div className="grow-0 ">
              <MoreVertOutlinedIcon />
            </div>
          </div>
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
