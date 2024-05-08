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
import { checkForUserOnRefresh, createEvent, formatDate, formatTime, getAllEvents, getEventsByProgramId, getProgramByID } from '@/utils/Dataservices';

import DummyEvents from '@/utils/DummyEvent.json'
import { IEvent } from '../Interfaces/Interfaces';

const HomePage = () => {
  const router = useRouter();
  useEffect(() =>{
    checkForUserOnRefresh()
  },[])

  useEffect(() => {
    const currentDate = new Date();
    const options:any = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDateString = currentDate.toLocaleDateString('en-US', options);
    setClickedDate(formattedDateString);
    // setAllEvents(DummyEvents)
    const getEvents = async () => {
      const fetchedProgram = await getProgramByID(1);
      console.log(fetchedProgram)
      const fetchedEvents = await getAllEvents()
      idCounter = fetchedEvents.length;
      console.log("you have this many events : " + idCounter)
      setAllEvents(fetchedEvents)
    }
    getEvents()
    console.log(allEvents)

}, []);

  var idCounter = 0;
  const [isAdmin, setIsAdmin] = useState<Boolean>(true)
  const [programID, setProgramID] = useState<string>("0");
  const [allEvents, setAllEvents] = useState<IEvent[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number>(999999999)
  const [newEvent, setNewEvent] = useState<IEvent>({
    title: '',
    start: '',
    end: '',
    allDay: false,
    id: 0,
    color: '',
    programID: programID
  })

  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("")

  const [clickedDate, setClickedDate] = useState<string>(new Date().toISOString())
  const [displayEvents, setDisplayEvents] = useState<IEvent[]>([])

  function handleDateClick(arg: { dateStr: any, allDay: boolean }) {
    //setting up useState for the modal
    // setNewEvent({ ...newEvent, start: arg.dateStr, allDay: arg.allDay, id: new Date().getTime() })
    setNewEvent({ ...newEvent, start: arg.dateStr, allDay: arg.allDay, id: 0 })
    setShowModal(true)
    console.log(arg.dateStr)
    setStartTime(arg.dateStr + " ")
    setEndTime(arg.dateStr + " ")

    //showing the events on the other div
    setClickedDate(arg.dateStr)
    const currentEvents = allEvents.filter(obj => obj.start.includes(arg.dateStr))
    console.log(currentEvents)
    setDisplayEvents(currentEvents)
    
  }
 

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
      color: '',
      programID: programID,
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


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(newEvent)
    await createEvent(newEvent);
    newEvent.id = idCounter;
    idCounter++;
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
      color: '',
      programID: programID,
    })
  }

  

    
  return (
    <div className='bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100%'>
    <NavbarComponent/>

      <div className=" grid grid-cols-7 lg:mx-7">
          <div className=" col-span-7 lg:col-span-3 w-full py-3 lg:py-8 ">
            
          <main className="lg:p-3 h-full">
        
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
              height={600}
              
              
              
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
        

        <div className=" col-span-7 lg:col-span-4 lg:px-10">
          <div className="py-3 lg:py-8">
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
      <div className="border-4 border-black lg:mx-7 rounded-lg">


      <main className="lg:p-3 h-full">
        
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
          height={600}
          expandRows={true}
          
          
          // editable={true}
          // droppable={true}
          // selectable={true}
          // selectMirror={true}
          // dateClick={handleDateClick}
          
          // eventClick={(data) => handleDeleteModal(data)}
        />
      

    
    
  </main>


      </div>
      <br /><br />
    </div>

  )
}

export default HomePage