'use client'

import { useRouter } from 'next/navigation';
import React, {Fragment, useEffect, useState } from 'react'
import NavbarComponent from '../Components/NavbarComponent';


import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { EventSourceInput } from '@fullcalendar/core/index.js'

import AddEventModal from '../Components/AddEventModal';
import DeleteEventModal from '../Components/DeleteEventModal';
import { formatDate, formatTime } from '@/utils/Dataservices';

import DummyEvents from '@/utils/DummyEvent.json'

const HomePage = () => {
  interface Event {
    title: string;
    start: string;
    end:string;
    allDay: boolean;
    id: number;
    color: string
    //program
    //
  }

  useEffect(() => {
    const currentDate = new Date();
    const options:any = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDateString = currentDate.toLocaleDateString('en-US', options);
    setClickedDate(formattedDateString);
    setAllEvents(DummyEvents)
}, []);

  const [events, setEvents] = useState([
    { title: 'event 1', id: '1' },
    { title: 'event 2', id: '2' },
    { title: 'event 3', id: '3' },
    { title: 'event 4', id: '4' },
    { title: 'event 5', id: '5' },
  ])

  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number>(999999999)
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    start: '',
    end: '',
    allDay: false,
    id: 0,
    color: ''
  })

  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("")

  const [clickedDate, setClickedDate] = useState<string>(new Date().toISOString())
  const [displayEvents, setDisplayEvents] = useState<Event[]>([])

  function handleDateClick(arg: { dateStr: any, allDay: boolean }) {
    setNewEvent({ ...newEvent, start: arg.dateStr, allDay: arg.allDay, id: new Date().getTime() })
    setShowModal(true)
    console.log(arg.dateStr)
    setStartTime(arg.dateStr + " ")
    setEndTime(arg.dateStr + " ")

    setClickedDate(arg.dateStr)
    const currentEvents = allEvents.filter(obj => obj.start.includes(arg.dateStr))
    console.log(currentEvents)
    setDisplayEvents(currentEvents)
    
  }
  // function addEvent(data: DropArg) {
  //   const event = { ...newEvent, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay, id: new Date().getTime() }
  //   setAllEvents([...allEvents, event])
  // }

  function handleDeleteModal(data: { event: { id: string } }) {
    setShowDeleteModal(true)
    setIdToDelete(Number(data.event.id))
  }

  function handleDelete() {
    setAllEvents(allEvents.filter(event => Number(event.id) !== Number(idToDelete)))
    setShowDeleteModal(false)
    setIdToDelete(999999)
  }

  function handleCloseModal() {
    setShowModal(false)
    setNewEvent({
      title: '',
      start: '',
      end: '',
      allDay: false,
      id: 0,
      color: ''
    })
    setStartTime("")
    setEndTime("")
    setShowDeleteModal(false)
    setIdToDelete(9999999)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewEvent({
      ...newEvent,
      title: e.target.value
    })
  }
  const handleEndTimeChange = (time:string): void => {
    setNewEvent({
      ...newEvent,
      end: (endTime + time ),
      allDay: false,
    })
  }
  const handleStartTimeChange = (time:string): void => {
    setNewEvent({
      ...newEvent,
      start: (startTime + time),
      allDay: false,
    })
  }
  const handleColorChange = (color:string): void => {
    setNewEvent({
      ...newEvent,
      color: color
    })
  }


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setAllEvents([...allEvents, newEvent])
    setDisplayEvents([...displayEvents, newEvent])
    setShowModal(false)
    console.log(newEvent)
    setNewEvent({
      title: '',
      start: '',
      end: '',
      allDay: false,
      id: 0,
      color: ''
    })
  }

  

    const router = useRouter();
  return (
    <div className='bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100%'>
    <NavbarComponent/>

      <div className=" grid grid-cols-7 mx-7">
          <div className="col-span-3 w-full py-8 ">
            
          <main className="p-3 h-full">
        
            <FullCalendar
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin
              ]}
              headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'today'
              }}
              events={allEvents as EventSourceInput}
              nowIndicator={true}
              // editable={true}
              // // droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              // // drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
              dayMaxEvents={2}
              viewClassNames={"bg-white"}
              dayHeaderClassNames={"bg-white"}
              aspectRatio={1.6}
              
              
              
            />
          

          <AddEventModal 
          showModal={showModal}
          setShowModal={setShowModal}
          handleSubmit={handleSubmit}
          handleTitleChange={handleTitleChange}
          handleEndTimeChange={handleEndTimeChange}
          handleStartTimeChange={handleStartTimeChange}
          newEvent={newEvent}
          handleCloseModal={handleCloseModal}
          handleColorChange={handleColorChange}
        />
        <DeleteEventModal
         showDeleteModal={showDeleteModal}
         setShowDeleteModal={setShowDeleteModal}
         handleDelete={handleDelete}
         handleCloseModal={handleCloseModal}
         eventData={allEvents.filter(obj => obj.id === idToDelete)[0]}
        />


        
        
      </main>
            
          </div>
        

        <div className=" col-span-4 px-10">
          <div className="py-8">
            <h1 className="text-center text-3xl font-titillium font-bold">{formatDate(clickedDate)}</h1>
            <div className=" text-xl p-5">
              <ul style={{ listStyleType: 'square' }}>
                {/* <li className="my-3 font-titillium">EVENT 1</li>
                <li className="my-3 font-titillium">EVENT 2</li>
                <li className="my-3 font-titillium">EVENT 3 </li> */}
                {displayEvents.map((event, index) => (
                    <li className='font-titillium py-3' key={index}>
                        <strong>{event.title}</strong> - {formatDate(event.start)} | 
                        {event.allDay ? " All Day" : ` Start Time: ${formatTime(event.start)}`}
                        {event.allDay ? "" : `, End Time: ${formatTime(event.end)}`}
                    </li>
                ))}
              </ul>
            </div>


          </div>
        </div>

      </div>

      <h1 className="text-center text-3xl font-titillium font-bold py-4">UPCOMING EVENTS</h1>
      <div className="border-4 border-black mx-7 max-h-[70vh] overflow-scroll rounded-lg">


      <main className="p-3 h-full">
        
        <FullCalendar
          plugins={[
            interactionPlugin,
            timeGridPlugin
          ]}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'today'
          }}
          events={allEvents as EventSourceInput}
          nowIndicator={true}
          
          // editable={true}
          // droppable={true}
          // selectable={true}
          // selectMirror={true}
          // dateClick={handleDateClick}
          
          // eventClick={(data) => handleDeleteModal(data)}
        />
      

    
    
  </main>


      </div>
    </div>
  )
}

export default HomePage