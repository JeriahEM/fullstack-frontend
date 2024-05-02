"use client";
import { useRouter } from "next/navigation";
import NavbarComponent from "../Components/NavbarComponent";
import { Button, Checkbox, Datepicker, Label, Modal, ModalBody, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { findDifferences, formatDate, loggedinData, resetPassword, updateUserProfile } from "@/utils/Dataservices";
import { IResetPassword, IUserdata } from "../Interfaces/Interfaces";
import { encode } from "punycode";
import { ClassNames } from "@emotion/react";


const ProfilePage = () => {
  // interface Iuserprofile {
  //   Name: string,
  //   Birthday: string,
  //   FunFact: string,
  //   UserName: string,
  //   Password: string,
  // }
  const [user, setUser] = useState<IUserdata>({} as IUserdata)

  const [openModal, setOpenModal] = useState(false);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);




  const [programs, setPrograms] = useState<string>(" ")
  const [birthday, setBirthday] = useState<string>(" ")
  const [image, setImage] = useState<string>(" ")
  const [email, setEmail] = useState<string>(" ")
  const [sports, setSports] = useState<string>("")
  const [funFact, setFunFact] = useState<string>(" ")
  const [username, setUsername] = useState<string>(" ")
  const [trueusername, setTrueUsername] = useState<string>(" ")
  const [name, setName] = useState<string>(" ")
  const [password, setPassword] = useState<string>(" ")
  const [userID, setUserID] = useState<number>(0)
  const isAdmin = false
  const isCoach = false
  const isUser = true


  const handleCloseModals = () => {
    setOpenModal(false);
    setOpenSaveModal(false);
    setOpenCancelModal(false);
  }
  let dummy: IUserdata = {
    userID: userID,
    username: username,
    birthday: birthday,
    image: image,
    programs: programs,
    funFact: funFact,
    email: email,
    sports: sports,
    realName: name,
    isAdmin: isAdmin,
    isCoach: isCoach,
    isUser: isUser,
  }
  

  const updateDummy = () => {
    dummy.username = username;
    dummy.image = image;
    dummy.birthday = (birthday);
    dummy.programs = programs;
    dummy.funFact = funFact;
    dummy.email = email;
    dummy.sports = sports;
    dummy.realName = name;
  }

  const handleEditChange = () => {
    const createString = () => {

      interface StringObject {
        [key: string]: string;
      }

      let stringObj: StringObject = {
        birthdayString: "",
        funFactString: "",
        realNameString: "",
        imageString: "",
      }


      const diffs = findDifferences(user, dummy)
      for (const key in diffs) {
        switch (key) {
          case "funFact":
            console.log("fun fact hanged")
            stringObj.funFactString = ("funfact=" + encodeURIComponent(dummy.funFact))
            break;
          case "realName":
            console.log("real name changed")
            stringObj.realNameString = ("realName=" + encodeURIComponent(dummy.realName))
            break;
          case "image":
            console.log("image changed")
            break;
          case "birthday":
            console.log("birthday changed")
            stringObj.birthdayString = ("birthday=" + encodeURIComponent(dummy.birthday))
            break;
          default:
          // code block
        }
      }
      //birthday funfact realname
      const changedStrings = Object.entries(stringObj).map(([key, value]) => {
        if (value !== "") {
          console.log(stringObj[key])
          return `${stringObj[key]}`;
        }
      }).filter(Boolean).join('&');

      console.log(changedStrings)
      return(changedStrings)
    }

    const newPassword = async (newPassword: IResetPassword) => {
      const fetchData = resetPassword(newPassword);

    }

    updateDummy()
    const newPasswordDummy: IResetPassword = {
      email: email,
      newPassword: password
    }
    newPassword(newPasswordDummy)
    setUser(dummy)
    const urlString = createString()
    updateUserProfile(trueusername, urlString)

    setOpenModal(false);
    setOpenSaveModal(false);
    setOpenCancelModal(false);
  }

  const router = useRouter();


  // updateUserProfile(username, "string goes here")
  useEffect(() => {
    const getLoggedinData = async () => {
      const loggedIn = await loggedinData();
      setUsername(loggedIn.username);
      setTrueUsername(loggedIn.username)
      setBirthday(loggedIn.birthday);
      setImage(loggedIn.image);
      setPrograms(loggedIn.programs);
      setFunFact(loggedIn.funFact);
      setEmail(loggedIn.email);
      setSports(loggedIn.sports);
      setName(loggedIn.realName);
      setUserID(loggedIn.userID);
      setFunFact(loggedIn.funFact)
      console.log(loggedIn)

      dummy = loggedIn;
      setUser(dummy)
      findDifferences(user, dummy)

    }
    getLoggedinData()

  }, [])

  const getDate = (e: any) => {
    console.log('test')
    console.log(e.target.value)
    setBirthday(e)
  }
  
//   const [openPfpModal, setOpenPfpModal] = useState(false);
// const [openConfirmPfpModal, setOpenConfirmPfpModal] = useState(false);
// const [openCancelPfpModal, setOpenCancelPfpModal] = useState(false);
// const [newPfp, setNewPfp] =useState<string>("");
//   const [tempModal, setTempModal] = useState(false);

// const handleClosePfpModals = () => {
//   setOpenPfpModal(false);
//   setOpenConfirmPfpModal(false);
//   setOpenCancelPfpModal(false);
// }
// const handleNewProgram = () => {
//   setOpenPfpModal(false);
//   setOpenConfirmPfpModal(false);
//   setOpenCancelPfpModal(false);
// }

  return (
    <>
      <NavbarComponent />
      <div className="bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100%">
      <div className="grid grid-cols-6 mx-7 py-8 ">
        <div className=" col-span-6 md:col-span-3 lg:col-span-2  md:w-full w-48 ml-20 md:ml-0">
          <div className="flex justify-center">
            <div className="lg:my-4 lg:border-2 border-black placeholder w-[80%] h-40 md:h-[45vh] rounded-3xl" >
              
            {/* <Modal size="xl" show={openPfpModal} popup onClose={() => setOpenPfpModal(false)}>
          <Modal.Header>
            <p className='text-gray-900 dark:text-white'>Create New Program</p>
          </Modal.Header>
          <Modal.Body>
                <div className="space-y-6">
                  <h1>
                    <p className=' text-sm leading-relaxed text-gray-900 dark:text-white py-4' >Create your own unique group now! Add users to your program and get started with organizing your calendar! <br /> Each program will automatically be assigned to the sport you are currently in. To filter programs by a different sport go to the <a className="text-blue-600 hover:text-blue-300" onClick={()=> router.push('/SportsSelectionPage')}>'Sport Selection'</a>  page and click on a new one.</p>
                  </h1>



                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="programName" value="Enter the name of your Program"/>
                    </div>
                    {/* <TextInput onChange={(e) => setNewProgram(e.target.value)} id="New Program" minLength={4} required maxLength={60}/>
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="programDescription" value="Enter a description" />
                    </div>
                    <Textarea onChange={(e) => setNewProgram(e.target.value)} id="New Program" minLength={4} required /> 
                  </div>


                  <div className="w-full flex flex-row justify-between">
                    <Button onClick={() => setOpenCancelPfpModal(true)} className="!bg-red-500">Cancel</Button>
                    <Modal show={openCancelPfpModal} size="md" >

                      <Modal.Body>
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Are you sure you would like to discard these changes?
                          </h3>

                          <div className="w-full flex flex-row justify-between">
                            <Button className="!bg-red-500" onClick={() => setOpenCancelPfpModal(false)}>Cancel</Button>
                            <Button className="!bg-green-500" onClick={handleClosePfpModals}>Confirm</Button>
                          </div>

                        </div>
                      </Modal.Body>
                    </Modal>
                    <Button onClick={() => setOpenConfirmPfpModal(true)} className="!bg-green-500">Create Program</Button>
                    <Modal show={openConfirmPfpModal} size="md">
                      <Modal.Body>
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Are you sure you would like to save these changes?
                          </h3>

                          <div className="w-full flex flex-row justify-between">
                            <Button className="!bg-red-500" onClick={() => setOpenConfirmPfpModal(false)}>Cancel</Button>
                            <Button className="!bg-green-500" onClick={() => setTempModal(true)} >Confirm</Button>
                            <Modal popup onClose={() => setTempModal(false)} show={tempModal} size="md">
                              <Modal.Header/>
                              <Modal.Body>
                                <h3>This feature is in progres</h3>
                              </Modal.Body>
                            </Modal>
                          </div>

                        </div>
                      </Modal.Body>
                    </Modal>

                  </div>

                </div>
              </Modal.Body>
        </Modal> 
*/}
              {/* where image goes */}
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
                  <p>{formatDate(user.birthday)}</p>
                  {/* <p>{user.birthday}</p> */}
                </div>
              </li>
              <li className="my-3">
                <div className="flex flex-row text-2xl font-titillium">
                  <p className="pe-3 font-bold">Status:</p>
                  <p>User</p>
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
                    <TextInput onChange={(e) => setName(e.target.value)} id="name4" maxLength={24}/>
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="birthday" value="Edit Birthday" />
                    </div>
                    {/* <Datepicker onChange={(e) => setBirthday(e.target.value)} id="birthday" /> */}
                    {/* <Datepicker onClick={(e: any) => {
                      console.log(e.target.value)
                      // getDate(e)
                    }} id="birthday"  /> */}
                    <TextInput onChange={(e)=> setBirthday(e.target.value)} id="birthday" type="date"/>
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="funFact" value="Edit Fun Fact" />
                    </div>
                    <TextInput onChange={(e) => setFunFact(e.target.value)} id="funFact" minLength={4} required maxLength={24}/>
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="username" value="Edit Username" />
                    </div>
                    <TextInput onChange={(e) => setUsername(e.target.value)} id="username" maxLength={24}/>
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="Edit Password" />
                    </div>
                    <TextInput onChange={(e) => setPassword(e.target.value)} id="password" type="password" maxLength={24} />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="Edit Email" />
                    </div>
                    <TextInput onChange={(e) => setEmail(e.target.value)} id="password" type="password" maxLength={24}/>
                  </div>

                  <div className="w-full flex flex-row justify-between">
                    <Button onClick={() => setOpenCancelModal(true)} className="!bg-red-500">Cancel</Button>
                    <Modal show={openCancelModal} size="md" >

                      <Modal.Body>
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Are you sure you would like to discard these changes?
                          </h3>

                          <div className="w-full flex flex-row justify-between">
                            <Button className="!bg-red-500" onClick={() => setOpenCancelModal(false)}>Cancel</Button>
                            <Button className="!bg-green-500" onClick={() => handleCloseModals()}>Confirm</Button>
                          </div>

                        </div>
                      </Modal.Body>
                    </Modal>
                    <Button onClick={() => setOpenSaveModal(true)} className="!bg-green-500">Save Changes</Button>
                    <Modal show={openSaveModal} size="md">
                      <Modal.Body>
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Are you sure you would like to save these changes?
                          </h3>

                          <div className="w-full flex flex-row justify-between">
                            <Button className="!bg-red-500" onClick={() => setOpenSaveModal(false)}>Cancel</Button>
                            <Button className="!bg-green-500" onClick={() => handleEditChange()}>Confirm</Button>

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
      </div>
    </>
  )
}

export default ProfilePage;
