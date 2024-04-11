"use client";
import { useRouter } from "next/navigation";
import NavbarComponent from "../Components/NavbarComponent";
import { Button, Checkbox, Datepicker, Label, Modal, TextInput } from "flowbite-react";
import React, { useRef, useState } from "react";
import { updateUserProfile } from "@/utils/Dataservices";


const ProfilePage = () => {
interface Iuserprofile{
  Name: string,
  Birthday: string,
  FunFact: string,
  UserName: string,
  Password: string,
}
 const [user, setUser] = useState<Iuserprofile>({} as Iuserprofile)

   const [openModal, setOpenModal] = useState(false);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

    const [programs, setPrograms] = useState<string>("")
    const [birthday, setBirthday] = useState<string>("3/15/20")
    const [image, setImage] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [sports, setSports] = useState<string>("")
    const [funFact, setFunFact] = useState<string>("I am in fact locked in")
    const [username, setUsername] = useState<string>("MrRager")
    const [name, setName] = useState<string>("Kyle")
    const [password, setPassword] = useState<string>("Andre3K")

    const handleCloseModals = () => {
      setOpenModal(false);
      setOpenSaveModal(false);
      setOpenCancelModal(false);
    }

    const handleEditChange = ()=> {
      const dummy:Iuserprofile = {
        Name : name,
        Birthday : birthday,     
        FunFact : funFact,     
        UserName : username,     
        Password : password,     
      }
      // alert('Works');
      setUser(dummy)
      setOpenModal(false);
      setOpenSaveModal(false);
      setOpenCancelModal(false);
    }

  const router = useRouter();


  // updateUserProfile(username, "string goes here")


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
                  <p>{user.Name}</p>
                </div>
              </li>
              <li className="my-3">
                <div className="flex flex-row text-2xl font-titillium">
                  <p className="pe-3 font-bold">Birthday:</p>
                  <p>{user.Birthday}</p>
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
                  <p>{user.FunFact}</p>
                </div>
              </li>
              <li className="my-3">
                <div className="flex flex-row text-2xl font-titillium">
                  <p className="pe-3 font-bold">User Name:</p>
                  <p>{user.UserName}</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-auto flex justify-center">
            <button onClick={() => setOpenModal(true)} className="border-2 border-black  rounded-lg min-w-36 h-14 font-titillium bg-none"> EDIT </button>
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={emailInputRef} >
              <Modal.Header />
              <Modal.Body>
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Edit your account
                  </h3>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="name4" value="Edit Name" />
                    </div>
                    <TextInput onChange={(e)=> setName(e.target.value)} id="name4"/>
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="birthday" value="Edit Birthday" />
                    </div>
                    <Datepicker onChange={(e)=> setBirthday(e.target.value)} id="birthday"/>
                    {/* <TextInput onChange={(e)=> setBirthday(e.target.value)} id="birthday"/> */}
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="funFact" value="Edit Fun Fact" />
                    </div>
                    <TextInput onChange={(e)=> setFunFact(e.target.value)} id="funFact"/>
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="username" value="Edit Username" />
                    </div>
                    <TextInput onChange={(e)=> setUsername(e.target.value)} id="username"/>
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="Edit Password" />
                    </div>
                    <TextInput onChange={(e)=> setPassword(e.target.value)} id="password" type="password" />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="Edit Email" />
                    </div>
                    <TextInput onChange={(e)=> setEmail(e.target.value)} id="password" type="password" />
                  </div>
                 
                  <div className="w-full flex flex-row justify-between">
                  <Button onClick={() => setOpenCancelModal(true)} className="!bg-red-500">Cancel</Button>
                    <Modal show={openCancelModal}size="md" >
                    
              <Modal.Body>
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Are you sure you would like to discard these changes?
                  </h3>
                 
                  <div className="w-full flex flex-row justify-between">
                    <Button  className="!bg-red-500" onClick={() => setOpenCancelModal(false)}>Cancel</Button>
                    <Button className="!bg-green-500" onClick={handleCloseModals}>Confirm</Button>
                  </div>
                  
                </div>
              </Modal.Body>
                    </Modal>
                    <Button onClick={() => setOpenSaveModal(true)} className="!bg-green-500">Save Changes</Button>
                    <Modal show={openSaveModal} size="md" popup onClose={() => setOpenSaveModal(false)}>
                    <Modal.Header />
              <Modal.Body>
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Are you sure you would like to save these changes?
                  </h3>
                 
                  <div className="w-full flex flex-row justify-between">
                    <Button  className="!bg-red-500" onClick={() => setOpenSaveModal(false)}>Cancel</Button>
                    <Button className="!bg-green-500" onClick={()=>handleEditChange()}>Confirm</Button>

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
      </div>

    <h1 className="text-center text-3xl font-bold py-4 font-titillium">My Programs</h1>
<div className="border-2 border-red-600 h-[40vh] mx-7"></div>
</>
  )
}

export default ProfilePage;
