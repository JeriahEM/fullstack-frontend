'use client'

import { createContext, useContext, useState } from "react"

interface IContextvalue {
    sportName : string
    setSportName: (sportName: string) => void
}

export const Context = createContext<IContextvalue>({} as IContextvalue)

export const AppWrapper = ({children}: Readonly<{children: React.ReactNode;}>) => {
    
    const [sportName, setSportName] = useState<string>('')

    return(
        <Context.Provider value={{sportName, setSportName}}>
            {children}
        </Context.Provider>
    )
}


export const useAppContext = () =>{
    return useContext(Context)
}