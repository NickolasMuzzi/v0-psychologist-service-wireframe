"use client"
import { ReactNode, useState } from "react"
import { Sidebar } from "./sidebar"
type MainLayoutProps = {
    children: ReactNode

}
export const MainLayout = ({children}:MainLayoutProps) => {
      const [actualPage, setActualPage] = useState<string>('')

    return(
        <>
        <Sidebar actualPage={actualPage} setActualPage={setActualPage}/>
        {children}
        </>
    )
}
