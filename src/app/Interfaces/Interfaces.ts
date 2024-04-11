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
    id: number
    username: string
}

export interface IUserProfile{
    UsertoUpdate:string,
    birthday:string,
    image:string,
    programs: string,
    funfact:string,
    email: string,
    sports: string,
    realName: string,
}