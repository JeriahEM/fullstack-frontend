export interface IToken {
    token: string
}

export interface IUserInfo {
    username: string,
    password: string,

}

export interface INewUser {
    username: string,
    password: string,
    fullname: string,
    email: string
}

export interface IUserdata {
    userID: number,
    username: string,
    birthday: string,
    image: string,
    programs: string,
    funFact: string,
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
    id: number,
    programName: string,
    programSport: string | null,
    description: string,
    adminID: string | null
}

export interface IDisplayProgram {
    adminID: string
    coachID: string | null
    discription: string
    genUserID: string | null
    programName: string
    programSport: string
    programID: number
}

export interface IUpdateUser {
    userName: string,
    realName: string,
    image: string,
    birthday: string,
    funFact: string,
    email: string
}