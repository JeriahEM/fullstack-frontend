"use client"
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'


import TimeSelector from './TimeSelector'
import ColorSelector from './ColorSelector'

interface Event {
  title: string;
  start: Date | string;
  end: Date | string;
  allDay: boolean;
  id: number;
  color: string;
}
interface AddEventModalProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEndTimeChange: (time: string) => void
  handleStartTimeChange: (time: string) => void
  newEvent: Event
  handleCloseModal: () => void
  handleColorChange: (color:string) => void
}
const AddEventModal = (props: AddEventModalProps) => {



  const handleEndTimeChange = (time: string) => {
    console.log(`Selected time: ${time}`);
    props.handleEndTimeChange(time)

    // You can use this time value for your event planning logic
  };
  const handleStartTimeChange = (time: string) => {
    console.log(`Selected time: ${time}`);
    props.handleStartTimeChange(time)

    // You can use this time value for your event planning logic
  };

  const [color, setColor] = useState<string>("");
  const colors = ["Red", "Blue", "Purple", "Green", "Yellow"]

  const handleColorChange = (color:string) => {
    props.handleColorChange(color)
  };
  
  

  return (
    <>
      <Transition.Root show={props.showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.setShowModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>

                    <div className="mt-1 text-center sm:mt-1">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Add Event
                      </Dialog.Title>

                      <form action="submit" onSubmit={props.handleSubmit}>
                        <div className="mt-2">
                          <input type="text" name="title" className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 
                            focus:ring-inset focus:ring-violet-600 
                            sm:text-sm sm:leading-6"
                            value={props.newEvent.title} onChange={(e) => props.handleTitleChange(e)} placeholder="Title" />
                        </div>

                        <div className='mt-2 grid grid-cols-3 items-center '>
                          <p className=' text-end p-3'>Start Time:</p>
                          <TimeSelector onChange={handleStartTimeChange} />
                        </div>
                        <div className='mt-2 grid grid-cols-3 items-center'>
                          <p className=' text-end p-3'>End Time:</p>
                          <TimeSelector onChange={handleEndTimeChange} />
                        </div>

                        <div className='mt-2 grid grid-cols-3 items-center'>
                          <p className=' text-end p-3'>Select a color:</p>
                          <ColorSelector onChange={handleColorChange} />
                        </div>

                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                            disabled={props.newEvent.title === ''}
                          >
                            Create
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            onClick={props.handleCloseModal}

                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default AddEventModal