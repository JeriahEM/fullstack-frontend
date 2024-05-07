export interface IToken {
    token: string
}

export interface IUserInfo {
    username: string,
    password: string,
 
}

export interface INewUser{
    username: string,
    password: string,
    fullname: string,
    email: string
}

export interface IUserdata {
    userID: number,
    username: string,
    birthday:string,
    image:string,
    programs: string,
    funFact:string,
    email: string,
    sports: string,
    realName: string,
    isAdmin: boolean,
    isCoach: boolean,
    isUser: boolean,
}

export interface IEvent { 
    id: number,
    title: string, 
    start: string, 
    end: string,
    color: string,
    allDay: boolean,
    programID: string, 
}

export interface IResetPassword {
    email: string,
    newPassword: string,
}

export interface ICreateProgram {
    title: string,
    description: string,
}