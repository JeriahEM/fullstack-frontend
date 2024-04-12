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
