import { useAppContext } from "@/Context/context";
import { IAddUserToProgram, ICreateProgram, IDisplayProgram, IEvent, INewUser, IResetPassword, IToken, IUpdateUser, IUserInfo, IUserdata } from "@/app/Interfaces/Interfaces"
import { unescape } from "querystring";
import { createContext } from "react";
import validator from 'validator';


//Connecting Backend / Fetches
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
    if(!data){
        alert("username or email taken")
    }else{
        alert("Account created")
    }
    console.log(res.ok)
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
        alert("Username and Password combination not found. Try again")
        const message = "An Error has occured" + res.status;
        throw new Error(message);
    }

    const data: IToken = await res.json();
    await sessionStorage.setItem("user", LoginUser.username)
    await sessionStorage.setItem("sport", "Tennis")
    await sessionStorage.setItem('firstLoad', "true")
    await getLoggedInUserData(LoginUser.username)
    
    
    // const UserContext = createContext("tennis");

    return data;
}

export const checkForUserOnRefresh = async () =>{
    const item = sessionStorage.getItem("user");
   
    if(item){
        console.log("user detected")
        await getLoggedInUserData(item)
    }
    else{
        console.log("no user")
    }
}

export const getLoggedInUserData = async (username: string) => {
    const res = await fetch(url + '/User/GetUserByUsername/' + username);
    const data = await res.json();
    userData = data;
    sessionStorage.setItem("userID", userData.userID.toString())
    if(userData.programs){
        sessionStorage.setItem('programs', userData.programs)
    }
    else{
        sessionStorage.setItem('programs', "")
    }
    
    
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

export const updateUserProfile = async (user:IUpdateUser) => {
    const res = await fetch(url + '/User/UpdateUser/',  {
        method: "PUT",
        headers: {
            'Content-Type' : "application/json"
        },
        body:JSON.stringify(user)
    })

    if(!res.ok){
        const message = "An error has occured" + res.status;
        throw new Error(message);
    }
    else{
        
    }
    const data = await res.json();
    console.log(data)
    return data
}

export const createEvent = async (event: IEvent) => {
    const res = await fetch(url + '/Event/CreateEvent',  {
        method: "POST",
        headers: {
            'Content-Type' : "application/json"
        },
        body:JSON.stringify(event)
    })

    if(!res.ok){
        const message = "An error has occured" + res.status;
        throw new Error(message);
    }
    else{
        
    }

    const data = await res.json();
    console.log(data);
}

export const getAllEvents = async () => {
    const res = await fetch(url + '/Event/GetAllEvents');
    const data = await res.json();
    
    console.log(data)
    return  data
}

export const resetPassword = async (newPassword: IResetPassword) => {
    const res = await fetch( url + "/User/ResetPassword", {
        method: "POST",
        headers: {
            'Content-Type' : "application/json"
        },
        body: JSON.stringify(newPassword)
    });

    if(!res.ok){
        const message = "An Error has occured" + res.status;
        throw new Error(message);
    }

    const data: IToken = await res.json();
    return data;
}

export const createProgram = async (newProgram: ICreateProgram) => {
    const res = await fetch( url + "/Program/CreateProgram", {
        method: "POST",
        headers: {
            'Content-Type' : "application/json"
        },
        body: JSON.stringify(newProgram)
    });

    if(!res.ok){
        const message = "An Error has occured" + res.status;
        throw new Error(message);
    }else{
        alert("Program Created!")
    }

    const data = await res.json();
    return data;
}

export const getProgramBySport = async (sport:string | null) => {
    const res = await fetch(url + '/Program/GetProgramsBySport/' + sport);
    const data = await res.json();
    
    console.log(data)
    return data
}

export const getProgramByID = async (id:number) => {
    const res = await fetch(url + '/Program/GetProgramById/' + id);
    const data = await res.json();
    
    console.log(data)
    return  data
}

export const getAllPrograms = async () => {
    const res = await fetch(url + '/Program/GetAllPrograms');
    const data = await res.json();
    
    console.log(data)
    return data
}
export const getEventsByProgramId = async (id:number) => {
    const res = await fetch(url + '/Event/GetEventsByProgramID/' + id);
    const data = await res.json();
    
    console.log(data)
    return  data
}
export const getEventsByProgramName = async (name:string) => {
    const res = await fetch(url + '/Event/GetEventsByProgramName/' + name);
    const data = await res.json();
    
    console.log(data)
    return  data
}
export const getProgramByName = async (name:string) => {
    const res = await fetch(url + '/Program/GetProgramByName/' + name);
    const data = await res.json();
    
    console.log(data)
    return data
}

export const AddUserToProgram = async (addInfo: IAddUserToProgram) => {
    const res = await fetch( url + "/Program/AddUserToProgram", {
        method: "POST",
        headers: {
            'Content-Type' : "application/json"
        },
        body: JSON.stringify(addInfo)
    });

    if(!res.ok){
        const message = "An Error has occured" + res.status;
        throw new Error(message);
    }else{
        alert("You have been added")
    }

    const data = await res.json();
    return data;
}

export const getUsersByProgramName = async (name:string | null) => {
    const res = await fetch(url + '/Program/GetUsersByProgramName/' + name);
    const data = await res.json();
    
    console.log(data)
    return data
}

export const getUserByUsername = async (name:string | null) => {
    const res = await fetch(url + '/User/GetUserByUsername/' + name);
    const data = await res.json();
    
    console.log(data)
    return data
}

//Helper Functions
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
//Takes date in "2024-04-24" and returns "April 24, 2024"
export const formatDate = (dateString:string) => {
if(dateString){
    if(dateString.includes("-")){
        // Parse the date string to get year, month, and day
    const [year, month, day] = dateString.split('-');
    
    // Convert month number to month name
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[parseInt(month, 10) - 1];
    
    // Create the formatted date string
    const formattedDate = `${monthName} ${parseInt(day, 10)}, ${year}`;
    
    return formattedDate;
    }
    else{
        return dateString
    }
}
    
    
}
//formats date in this format "2024-00-00 11:11"
export const formatTime = (timeString:string) => {

    if(timeString.includes(" ")){
        const [datePart, timePart] = timeString.split(' ')
    // Parse the time string to get hours and minutes
    const [hours, minutes] = timePart.split(':').map(num => parseInt(num, 10));

    // Determine whether it's AM or PM
    const meridiem = hours >= 12 ? 'pm' : 'am';

    // Convert 24-hour format to 12-hour format
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    // Format the time
    const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')}${meridiem}`;

    return formattedTime;
    }
    else{
        return ""
    }
    
    
}
export const isValidEmailFunction = (email:string) => {
        return validator.isEmail(email);
      };


export const splitStringToArray = (inputString: string | null) => {
    // Split the string by comma and remove any leading/trailing whitespace
    if(inputString && inputString.includes(',')){
        return inputString
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '');

    }
    else if(inputString) {
        return [inputString]
    }
    
  };

export const countUsersInProgram = (program:IDisplayProgram) =>{
    const add1 = splitStringToArray(program.adminID)?.length ?? 0
    const add2 = splitStringToArray(program.coachID)?.length ?? 0
    const add3 = splitStringToArray(program.genUserID)?.length ?? 0

    return (add1+add2+add3)
}
  
      
