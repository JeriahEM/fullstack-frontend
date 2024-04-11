'use client'

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAccount, getLoggedInUserData, login } from "@/utils/Dataservices";
import { IToken } from "./Interfaces/Interfaces";



export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("")

  const [switchBool, setSwitchBool] = useState<boolean>(true);
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

  const handleNewUserSubmit = async () => {
    console.log(newUserBool)
    if (newUserBool) {
      let userData = {
        username: username,
        password: password,
        fullname: fullName,
        email: email
      }
      console.log(userData)
      console.log(fullName + email)
      createAccount(userData);
      router.push('/HomePage');

    }
  }


  return (
    <div className="min-h-screen w-full Tennis ">



      <div id="div2" className="CenterScreen hidden">

        <div className="text-center text-5xl text-white font-bebas tracking-[.15rem] pt-14 ">
          <p>Court Monitor</p>
        </div>
        <div className="grid grid-flow-row justify-center">
          <div className="min-w-96 p-8 rounded-lg">
            <div className="items-center pb-8">
              <h1 className="text-center text-4xl font-titillium text-white textShadow">Fill out your information</h1>
            </div>
            <form className="flex max-w-md flex-col gap-4">
              <div className="flex flex-row gap-3">
                <div className="mb-2 block pt-2 text-3xl font-titillium text-white textShadow">
                  <p>Full Name:</p>
                </div>
                <input id="username" type="text" className="inputbg border-transparent" required onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="flex flex-row gap-3">
                <div className="mb-2 block">
                  <div className="mb-2 block pt-2 text-3xl font-titillium text-white textShadow">
                    <p>E-Mail:</p>
                  </div>
                </div>
                <input id="email" type="text" className="inputbg border-transparent" required onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className=" flex justify-between gap-3">
                <Button onClick={() => handleNewUserBool()} className=" bg-red-700 text-white font-titillium w-full">
                  <p className="text-3xl">Back</p>
                </Button>
                <Button onClick={handleNewUserSubmit} className="bg-white text-black font-titillium w-full">
                  <p className="text-3xl">Enter</p>
                </Button>
              </div>


              <Button onClick={() => router.push('/HomePage')}>Submit</Button>
            </form>
          </div>

        </div>


      </div>


      <div id="div1" className="CenterScreen">

        <div className="text-center text-5xl text-white font-bebas tracking-[.15rem] pt-14 ">
          <p>Court Monitor</p>
        </div>
        <div className="grid grid-flow-row justify-center">
          <div className="min-w-96 p-8 rounded-lg">
            <div className="items-center pb-8">
              <h1 className="text-center text-4xl font-titillium text-white textShadow">{switchBool ? 'New User' : 'Login'}</h1>
            </div>
            <form className="flex max-w-md flex-col gap-4">
              <div className="flex flex-row gap-3">
                <div className="mb-2 block pt-2 text-3xl font-titillium text-white textShadow">
                  <p>UserName:</p>
                </div>
                <input id="username" type="text" className="inputbg border-transparent" required onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="flex flex-row gap-3">
                <div className="mb-2 block">
                  <div className="mb-2 block pt-2 text-3xl font-titillium text-white textShadow">
                    <p>Password:</p>
                  </div>
                </div>
                <input id="password1" type="password" className="inputbg border-transparent" required onChange={(e) => setPassword(e.target.value)} />
              </div>

              <Button onClick={handleSubmit} className="bg-white text-black font-titillium">
                <p className="text-3xl">{switchBool ? 'Next' : 'Enter'}</p>
              </Button>

              <div className="flex items-center place-content-center gap-2">
                <button className="text-3xl font-titillium text-white" onClick={handleSwtich}>
                  <p className="textShadow">{switchBool ? 'Already have an Account?' : 'Sign up'}</p>

                </button>
              </div>
              <Button onClick={() => router.push('/HomePage')}>Submit</Button>
            </form>
          </div>

        </div>


      </div>





    </div>
  );
}
