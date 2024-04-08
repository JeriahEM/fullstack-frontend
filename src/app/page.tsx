'use client'

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAccount, getLoggedInUserData, login } from "@/utils/Dataservices";
import { IToken } from "./Interfaces/Interfaces";

//
//

//

//


export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [switchBool, setSwitchBool] = useState<boolean>(true);

  const router = useRouter();

  //
  const handleSwtich = () => {
    setSwitchBool(!switchBool);
  }

  const handleSubmit = async () => {
    //
    let userData =  {
      username: username,
      password: password
    }

    if(switchBool) {
      //
      createAccount(userData);
    }else{
      //

      let token: IToken = await login(userData);

      console.log(token);

      if(token.token != null){
        localStorage.setItem("Token", token.token)
        getLoggedInUserData(username);
        router.push('/HomePage');
      }else{
        alert("Login failed");
      }

      

    }

  }
  
  
  return (
    <div className="min-h-screen w-full Tennis">
      <div className="flex flex-col items-center text-5xl text-white font-bebas header pt-14 ">
        <p>Court Monitor</p>
      </div>
      <div className="grid grid-flow-row justify-center">
        <div className="bg  min-w-96 p-8 rounded-lg">
          <div className="items-center pb-8 pl-24 ml-6">
          <h1 className="text-3xl font-titillium text-white">{switchBool ? 'New User' : 'Login'}</h1>
          </div>
        <form className="flex max-w-md flex-col gap-4">
      <div className="flex flex-row gap-3">
        <div className="mb-2 block pt-2 text-3xl font-titillium text-white">
          <p>UserName:</p>
        </div>
        <input id="username" type="text" className="inputbg border-transparent" required onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="flex flex-row gap-3">
        <div className="mb-2 block">
        <div className="mb-2 block pt-2 text-3xl font-titillium text-white pl-2">
          <p>Password:</p>
        </div>
        </div>
        <input id="password1" type="password" className="inputbg border-transparent" required onChange={(e) => setPassword(e.target.value)} />
      </div>

      <Button onClick={handleSubmit} className="bg-white text-black font-titillium">{switchBool ? 'Next' : 'Enter'}</Button>
      <div className="flex items-center place-content-center gap-2">
      <button className="text-3xl font-titillium text-white" onClick={handleSwtich}>{switchBool ? 'Already have an Account?' : 'Sign up'}</button>
      </div>
      {/* <Button onClick={()=> router.push('/HomePage')}>Submit</Button> */}
    </form>
        </div>

      </div>
      </div>
  );
}
