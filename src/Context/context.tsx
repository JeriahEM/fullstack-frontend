'use client'

import { createContext, useContext, useState } from "react"

//creating Context
// Wrapping our app
// export out custom hook

//first lets define our context

interface IContextValue  {
    currentProgramContext: string,
    setCurrentProgramContext: (currentProgramContext:string) => void
}

export const Context = createContext<IContextValue>({} as IContextValue);

export const AppWrapper = ({children,}: Readonly<{ children: React.ReactNode;}>) => {
    const [currentProgramContext, setCurrentProgramContext] = useState<string>("")

    return(
        <Context.Provider value={{currentProgramContext, setCurrentProgramContext}}>
    
            {children}
        </Context.Provider>
    )
}

export const useAppContext = () => {
    return useContext(Context)
}
