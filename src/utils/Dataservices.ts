import { IToken, IUserInfo, IUserdata } from "@/app/Interfaces/Interfaces"


const url = "https://myblogapi.azurewebsites.net"

let userData: IUserdata

export const createAccount = async (createdUser: IUserInfo) => {
    const res = await fetch(url + '/User/AddUser',  {
        method: "POST",
        headers: {
            'Content-Type' : "application/json"
        },
        body:JSON.stringify(createdUser)
    })

    if(!res.ok){
        const message = "An errot has occured" + res.status;
        throw new Error(message);
    }

    const data = await res.json();
    console.log(data);
}

export const login = async (LoginUser: IUserInfo) => {
    const res = await fetch( url + "/User/Login", {
        method: "POST",
        headers: {
            'Content-Type' : "application/json"
        },
        body: JSON.stringify(LoginUser)
    });

    if(!res.ok){
        const message = "An Error has occured" + res.status;
        throw new Error(message);
    }

    const data: IToken = await res.json();
    return data;
}

export const getLoggedInUserData = async (username: string) => {
    const res = await fetch(url + '/User/GetUserByUsername/' + username);
    const data = await res.json();
    userData = data;
}

export const loggedinData = () => {
    return userData;
}

export const checkToken = () => {
    let result = false;

    let lsData = localStorage.getItem("Token");

    if(lsData !=null){
        result = true
    }
    return result
}