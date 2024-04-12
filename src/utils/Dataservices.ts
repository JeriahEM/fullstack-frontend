import { INewUser, IToken, IUserInfo, IUserdata } from "@/app/Interfaces/Interfaces"


const url = "https://apicourtmonitor.azurewebsites.net"

let userData: IUserdata

export const createAccount = async (createdUser: INewUser) => {
    const res = await fetch(url + '/User/AddUser',  {
        method: "POST",
        headers: {
            'Content-Type' : "application/json"
        },
        body:JSON.stringify(createdUser)
    })

    if(!res.ok){
        const message = "An error has occured" + res.status;
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
    console.log(userData)
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

export const updateUserProfile = async (username:string, inputString:string) => {
    const res = await fetch(url + '/User/UpdateUser/' + username + "/birthday/image/programs/funfact/email/sports/realname" + inputString);
    const data = await res.json();
    console.log(data)
}


export const findDifferences = (obj1: IUserdata, obj2: IUserdata): Partial<IUserdata> => {
    const differences: Partial<IUserdata> = {};

    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (obj1[key as keyof IUserdata] !== obj2[key as keyof IUserdata]) {
                differences[key as keyof IUserdata] = {
                    oldValue: obj1[key as keyof IUserdata] ,
                    newValue: obj2[key as keyof IUserdata]
                } as any;
            }
        }
    }
    console.log(differences)
    return differences;
}
