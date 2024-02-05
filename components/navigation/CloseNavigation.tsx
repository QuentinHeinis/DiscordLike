'use client'
import { useStore } from '@/store/zustand'

const CloseNavigation = () => {
  const {menuOpen, setMenuOpen} = useStore()
  return (
    <>
        {menuOpen && <div onClick={()=>setMenuOpen(false)} className="w-full h-full bg-gray-900 bg-opacity-30 cursor-pointer md:hidden"></div>}
    </>
  )
}

export default CloseNavigation