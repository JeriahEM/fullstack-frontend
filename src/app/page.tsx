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
        router.push('/Dashboard');
      }else{
        alert("Login failed");
      }

      

    }

  }
  
  return (
    <div className="min-h-screen w-full Bg">
      <div className="grid grid-flow-row justify-center">
        <div className="bg bg-slate-400 min-w-96 p-8 rounded-lg">
          <h1 className="text-3xl">{switchBool ? 'Create Account' : 'Login'}</h1>
        <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="username" />
        </div>
        <TextInput id="username" type="text" placeholder="Enter username" required onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
      <Button className="light" onClick={handleSwtich}>{switchBool ? 'Already have an Account?' : 'Sign up'}</Button>
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
        </div>

      </div>
      </div>
  );
}
