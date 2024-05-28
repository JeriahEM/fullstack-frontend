'use client'

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkForUserOnRefresh, createAccount, getLoggedInUserData, isValidEmailFunction, login, resetPassword } from "@/app/utils/Dataservices";
import { IResetPassword, IToken } from "./Interfaces/Interfaces";
import { useAppContext } from "@/Context/context";



export default function Home() {
  const contextData = useAppContext()
  contextData.setCurrentProgramContext("")

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [rpModal, setRPModal] = useState<boolean>(false)

  const handleCloseModals = () => {
    setOpenModal(false);
    setRPModal(false);
  }

  useEffect(() => {
    checkForUserOnRefresh()


  }, [])

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("")
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false)
  const handleEmailChange = (event: any) => {
    const { value } = event.target;
    setEmail(value);
    setIsValidEmail(isValidEmailFunction(value)); // Update validity state on input change
  };

  const [switchBool, setSwitchBool] = useState<boolean>(false);
  const [newUserBool, setNewUserBool] = useState<boolean>(false);

  const router = useRouter();

  //
  const handleSwtich = () => {
    setSwitchBool(!switchBool);
  }

  const handleNewUserBool = () => {
    setNewUserBool(!newUserBool);

    const div2 = document.getElementById("div2")

    const div1 = document.getElementById("div1")
    if (newUserBool) {
      div1?.classList.remove("hidden")
      div2?.classList.add("hidden")
    }
    else {
      div2?.classList.remove("hidden")
      div1?.classList.add("hidden")
    }


  }

  const handleSubmit = async () => {
    //
    let userData = {
      username: username,
      password: password
    }

    if (switchBool) {
      handleNewUserBool();


    } else {
      //

      let token: IToken = await login(userData);

      console.log(token);

      if (token.token != null) {
        localStorage.setItem("Token", token.token)
        getLoggedInUserData(username);
        router.push('/HomePage');
      } else {
        alert("Login failed");
      }



    }

  }

  const handleKeyDown1 = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleKeyDown2 = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleNewUserSubmit();
    }
  }

  const handleNewUserSubmit = async () => {
    console.log(newUserBool)
    if (isValidEmail) {
      if (newUserBool) {
        let userData = {
          username: username,
          password: password,
          fullname: fullName,
          email: email
        }

        createAccount(userData);
        // getLoggedInUserData(username);

        // change this route to go back to the login screen
        setSwitchBool(false)
        setNewUserBool(false)
        handleNewUserBool();
      }
    }
    else {
      alert("Please enter a valid email !")
    }

  }

  const newPassword = async () => {
    setOpenModal(false)
    const newPassword:IResetPassword = {
      email: emailInput,
      newPassword: resetPasswordInput,
    }
    resetPassword(newPassword);
    alert(`Password for account with the email: ${emailInput} has been reset!`)


  }

  const [resetPasswordInput, setResetPasswordInput] = useState<string>("-")
  const [resetPasswordInputConfirm, setResetPasswordConfirm] = useState<string>("+")
  const [emailInput, setEmailInput] = useState<string>("")


  //   updateDummy()
  //   const newPasswordDummy: IResetPassword = {
  //     email: email,
  //     newPassword: password
  //   }
  //   newPassword(newPasswordDummy)
  //   setUser(dummy)
  //   const urlString = createString()
  //   updateUserProfile(trueusername, urlString)

  //   setOpenModal(false);
  //   setRPModal(false);

  // }


  return (
    <div className="min-h-screen w-full Tennis ">



      <div id="div2" className="CenterScreen hidden">

        <div className="text-center text-5xl text-white font-bebas tracking-[.15rem] pt-14 ">
          <p>Court Monitor</p>
        </div>
        <br />
        <div className="grid grid-flow-col justify-center">

          <div className="min-w-96 p-8  rounded-bl-lg rounded-tl-lg  bg-blend-darken Court hidden lg:block">
            <br /> <br />
            <h1 className="font-bebas text-4xl text-center text-white ">Welcome Back</h1>
            <br /> <br />
            <h3 className="text-center font-bebas text-2xl text-white  ">
              Please login using your personal <br /> information to stay connected <br /> with us here at <br /> court monitor
            </h3>
          </div>

          <div className="min-w-96 min-h-390 p-8 rounded-lg lg:rounded-r-lg lg:rounded-l-none  bg-white ">
            <div className="items-center pb-7">
              <h1 className="text-center text-4xl font-bebas text-black ">Fill out your information</h1>
            </div>
            <div onKeyDown={handleKeyDown2} className="flex max-w-md flex-col gap-4">
              <div className="flex flex-row gap-3">
                <div className="mb-2 block pt-2 text-3xl font-titillium text-black">
                  <p>Full Name:</p>
                </div>
                <input id="username" type="text" className="inputbg border-t-transparent border-l-transparent border-r-transparent !border-b-black ring-transparent mt-10 max-h-14 focus-within:border-r-0 focus-within:border-l-0 focus-within:border-t-0 focus-within:border-b-black w-45" minLength={2} maxLength={24} required onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="flex flex-row gap-3 ">
                <div className="mb-2 block">
                  <div className="mb-2 block pt-2 text-3xl font-titillium text-black">
                    <p>Email:</p>
                  </div>
                </div>
                <input id="email" type="text" className="inputbg border-t-transparent border-l-transparent border-r-transparent !border-b-black ring-transparent focus-within:border-r-0 focus-within:border-l-0 focus-within:border-t-0 focus-within:border-b-black w-45" required onChange={handleEmailChange} />
              </div>
              <br />
              <div className=" flex justify-between gap-3">
                <Button onClick={() => handleNewUserBool()} className=" bg-red-700 text-white font-titillium w-full">
                  <p className="text-3xl">Back</p>
                </Button>

                <Button onClick={handleNewUserSubmit} className="bg-lime-300 text-black font-titillium w-full">
                  <p className="text-3xl">Enter</p>
                </Button>


              </div>


              {/* <Button onClick={() => router.push('/HomePage')}>Submit</Button> */}
            </div>
            <br />
          </div>

        </div>


      </div>


      <div id="div1" className="CenterScreen ">

        <div className="text-center text-5xl text-white font-bebas tracking-[.15rem] pt-14 ">
          <p>Court Monitor</p>
        </div>
        <br />
        <div className="grid grid-flow-col justify-center">
          <div className="min-w-96 p-8  rounded-bl-lg rounded-tl-lg  bg-blend-darken Court hidden lg:block">
            <br /> <br />
            <h1 className="font-bebas text-4xl text-center text-white ">Welcome Back</h1>
            <br /> <br />
            <h3 className="text-center font-bebas text-2xl text-white  ">
              Please login using your personal <br /> information to stay connected <br /> with us here at <br /> court monitor
            </h3>
          </div>
          <div className="min-w-96 p-8 bg-white rounded-lg lg:rounded-r-lg lg:rounded-l-none ">
            <div className="items-center pb-8">
              <h1 className="text-center text-5xl font-bebas text-black ">{switchBool ? 'New User' : 'Login'}</h1>
            </div>
            <div onKeyDown={handleKeyDown1} className="flex max-w-md flex-col gap-4">
              <div className="flex flex-row gap-3">
                <div className="mb-2 block pt-2 text-3xl font-titillium text-black ">
                  <p>Username:</p>
                </div>
                <input id="username" type="text" className="inputbg border-t-transparent border-l-transparent border-r-transparent !border-b-black ring-transparent focus-within:border-r-0 focus-within:border-l-0 focus-within:border-t-0 focus-within:border-b-black w-44" minLength={2} maxLength={24} required onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="flex flex-row gap-3">
                <div className="mb-2 block">
                  <div className="mb-2 block pt-2 text-3xl font-titillium text-black">
                    <p>Password:</p>
                  </div>
                </div>
                <input id="password1" type="password" className="inputbg border-t-transparent border-l-transparent border-r-transparent !border-b-black ring-transparent focus-within:border-r-0 focus-within:border-l-0 focus-within:border-t-0 focus-within:border-b-black w-44" maxLength={24} required onChange={(e) => setPassword(e.target.value)} />
              </div>
              <p onClick={() => !switchBool ? setOpenModal(true) : (setOpenModal(false))} className={switchBool ? "text-md min-h-7" : " hover:text-blue-400 text-blue-600 text-md min-h-7 hover:cursor-pointer"}>{switchBool ? '' : 'Forgot password?'} </p>
              <Modal show={openModal} size="md">
                <Modal.Body className=" min-h-72">
                  <div className=" text-center min-h-11 my-3">
                    <p className="text-2xl">Forgot Password?</p>
                  </div>
                  <p className="text-sm pb-1 hidden md:block">Enter Email of the account you need the password for <br /> And enter the new password you would like to have</p>
                  <div className="min-h-11 my-3">
                    <div className=" block ">
                      <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput onChange={(e) => setEmailInput(e.target.value)} />
                  </div>
                  <div className=" min-h-11 my-3">
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="New Password" />
                    </div>
                    <TextInput type="password" onChange={(e) => setResetPasswordInput(e.target.value)} minLength={3} required maxLength={24} />
                  </div>
                  <div className=" min-h-11 my-3">
                    <div className="mb-2 block">
                      <Label htmlFor="cpassword" value="Confirm New Password" />
                    </div>

                    <TextInput type="password" onChange={(e) => setResetPasswordConfirm(e.target.value)} minLength={3} required maxLength={24} />
                    {resetPasswordInput !== resetPasswordInputConfirm ?
                      <p className="text-red-600">Passwords don't match ! </p>
                      :
                      <p></p>
                    }

                  </div>
                  <div className="w-full flex flex-row justify-between min-h-11 my-3">
                    <Button className="!bg-red-500 min-w-24 " onClick={() => setOpenModal(false)}>Cancel</Button>
                    {resetPasswordInput !== resetPasswordInputConfirm ?
                      <div></div> 
                      :
                      <Button className="!bg-green-500 min-w-24" onClick={() => newPassword()}>Confirm</Button>
                    }
                  </div>
                </Modal.Body>
              </Modal>
              <Button onClick={handleSubmit} className=" text-black font-titillium bg-lime-300">
                <p className="text-3xl">{switchBool ? 'Next' : 'Enter'}</p>
              </Button>

              <div className="flex items-center place-content-center gap-2">
                <button className="text-3xl font-titillium text-black" onClick={handleSwtich}>
                  <p className=" hover:text-blue-600 text-xl">{switchBool ? 'Already have an Account?' : 'Sign up'}</p>

                </button>
              </div>
              {/* <Button onClick={() => router.push('/HomePage')}>Submit</Button> */}
            </div>



          </div>

        </div>


      </div>





    </div>
  );
}
