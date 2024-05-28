"use client"
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { formatTime } from '@/app/utils/Dataservices';
import { IEvent } from '../Interfaces/Interfaces';

interface DeleteEventModalProps {
  showDeleteModal: boolean
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
  handleDelete: () => void
  handleCloseModal: () => void
  eventData: IEvent
  isAdmin: Boolean
}

const DeleteEventModal = (props: DeleteEventModalProps) => {
  return (
    <>
      <Transition.Root show={props.showDeleteModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.setShowDeleteModal}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg
                   bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center 
                      justify-center rounded-full  sm:mx-0 sm:h-10 sm:w-10">
                        {props.isAdmin ?
                          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                          :
                          <div></div>}
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      {props.isAdmin ? 
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Delete Event
                        </Dialog.Title>
                        :
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Event Details
                      </Dialog.Title>}

                        <div className='text-2xl'>
                          <p>Title: {props.eventData?.title}</p>
                          <p>Start Time: {props.eventData?.start ? `${formatTime(props.eventData?.start)}` : "-"}</p>
                          <p> {props.eventData?.end ? `End Time:${formatTime(props.eventData?.end)}` : "All Day Event"}</p>

                        </div>

                        <div className="mt-2">
                          {props.isAdmin ?
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete this event?
                            </p>
                            :
                            <p>You have be a Coach or Admin to delete events</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {props.isAdmin ?
                      <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                      font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={props.handleDelete}>
                        Delete
                      </button> :
                      <div></div>}
                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                      shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={props.handleCloseModal}
                    >
                      Cancel
                    </button>
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

export default DeleteEventModal