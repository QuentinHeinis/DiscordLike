'use client'
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useStore } from "@/store/zustand"
import CreateServerForm from "../form/modalForm/CreateServerForm"
import CreateChannel from "../form/modalForm/CreateChannelForm"
import { useEffect, useState } from "react"
import UpdateChannel from "../form/modalForm/UpdateChannelForm"

const Modal = () => {
  const {modalOpen, setModalOpen} = useStore()
  type nameType = 'Create a server' | 'Search for a server' | 'Create a channel' | 'Update a channel'
  const [name, setName] = useState<nameType>('Create a server')

  useEffect(() => {
    switch (modalOpen) {
      case 'none':
        return 
      case 'addServer':
        setName('Create a server')
        break
      case 'addChannel':
        setName('Create a channel')
        break
      case 'searchServer':
        setName('Search for a server')
        break
      case 'updateChannel':
        setName('Update a channel')
        break
      default:
        return
    }
  }, [modalOpen])


  const RenderModal = () => {
    switch (modalOpen) {
      case 'none':
        return 
      case 'addServer':
        return <CreateServerForm/>
      case 'searchServer':
        return <CreateServerForm/>
      case 'addChannel':
        return <CreateChannel/>
      case 'updateChannel':
        return <UpdateChannel/>
      default:
        return
    }
  }

  return (
    <>
    {
      modalOpen !== 'none' &&
      <div className="fixed top-0 left-0 w-full h-full bg-slate-800 bg-opacity-50 z-50 flex items-center justify-center">
        
        <div className="bg-slate-700 p-4 rounded-lg w-96">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{name}</h3>
            <button onClick={()=>setModalOpen('none')}><XMarkIcon className="h-6 w-6 text-white"/></button>
          </div>
          <RenderModal/>
        </div>
        <span onClick={()=>setModalOpen('none')} className="absolute -z-10 top-0 right-0 bottom-0 left-0"></span>
      </div>
    }
    </>
  )
}

export default Modal