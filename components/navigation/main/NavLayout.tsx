'use client'

import { useStore } from "@/store/zustand"



const NavLayout = ({children} : {children: React.ReactNode}) => {
  const {menuOpen} = useStore()

  return (
    <nav className={`flex w-full h-full absolute z-20 max-h-dvh transition-all duration-500 ${menuOpen ? '-translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:w-fit md:h-auto`}>
      {children}
    </nav>
  )
}

export default NavLayout