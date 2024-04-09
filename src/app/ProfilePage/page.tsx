"use client";
import { useRouter } from "next/navigation";
import NavbarComponent from "../Components/NavbarComponent";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import React, { useRef, useState } from "react";



const ProfilePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

    const [programs, setPrograms] = useState<string>("")
    const [birthday, setBirthday] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [sports, setSports] = useState<string>("")
    const [funFact, setFunFact] = useState<string>("")

  const router = useRouter();
  return (
    <>
      <NavbarComponent />

      <div className="grid grid-cols-6 mx-7 py-8 bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100%">
        <div className="col-span-2 bg-orange-100 w-full">
          <div className="flex justify-center">
            <div className="my-4 border-2 border-black bg-lime-300 w-[80%] h-[45vh]"></div>
          </div>
        </div>

        <div className=" col-span-4 px-16 flex flex-col justify-between">
          <div className="">
            <ul style={{ listStyleType: "none" }}>
              <li className="my-3">
                <div className="flex flex-row text-2xl font-titillium">
                  <p className="pe-3 font-bold">Name:</p>
                  <p>Kyle Yok Eyh Ma</p>
                </div>
              </li>
              <li className="my-3">
                <div className="flex flex-row text-2xl font-titillium">
                  <p className="pe-3 font-bold">Birthday:</p>
                  <p>03/39</p>
                </div>
              </li>
              <li className="my-3">
                <div className="flex flex-row text-2xl font-titillium">
                  <p className="pe-3 font-bold">Status:</p>
                  <p>Coach, Admin</p>
                </div>
              </li>
              <li className="my-3">
                <div className="flex flex-row text-2xl font-titillium">
                  <p className="pe-3 font-bold">Fun Fact:</p>
                  <p>Born to nap forced to code</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-auto flex justify-center">
            <button onClick={() => setOpenModal(true)} className="border-2 border-black rounded-lg min-w-36 h-14 font-titillium bg-none"> EDIT </button>
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={emailInputRef} >
              <Modal.Header />
              <Modal.Body>
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Edit your account
                  </h3>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="Programs" value="Change Your Programs" />
                    </div>
                    <TextInput id="Programs" ref={emailInputRef} />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="Change Your" />
                    </div>
                    <TextInput id="password" type="password" />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Change Your" />
                    </div>
                    <TextInput id="email" ref={emailInputRef} />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Change Your" />
                    </div>
                    <TextInput id="email" ref={emailInputRef} />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Change Your" />
                    </div>
                    <TextInput id="email" ref={emailInputRef} />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Change Your" />
                    </div>
                    <TextInput id="email" ref={emailInputRef} />
                  </div>
                 
                  <div className="w-full">
                    <Button>Save Changes</Button>
                  </div>
                  
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>

    <h1 className="text-center text-3xl font-bold py-4 font-titillium">My Programs</h1>
<div className="border-2 border-red-600 h-[40vh] mx-7"></div>
</>
  )
}

export default ProfilePage;
