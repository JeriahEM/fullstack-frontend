'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import NavbarComponent from '../Components/NavbarComponent';


import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, {  } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

import { EventSourceInput } from '@fullcalendar/core/index.js'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddEventModal from '../Components/AddEventModal';
import DeleteEventModal from '../Components/DeleteEventModal';
import { AddUserToProgram, DeleteEventByID, checkForUserOnRefresh, createEvent, formatDate, formatTime, getEventsByProgramName, getProgramByName, loggedinData, splitStringToArray } from '@/app/utils/Dataservices';

import { IAddUserToProgram, IDisplayProgram, IEvent, IUserdata } from '../Interfaces/Interfaces';
import { Button, Modal } from 'flowbite-react';
import { useAppContext } from '@/Context/context';



const HomePage = () => {
  const router = useRouter();
  const { currentProgramContext, setCurrentProgramContext } = useAppContext()

  const [loggedUser, setLoggedUser] = useState<IUserdata>()



  useEffect(() => {
    console.log("this is a new program")
    const currentDate = new Date();
    const options: any = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDateString = currentDate.toLocaleDateString('en-US', options);

    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setClickedDate(formattedDateString);

    const getEvents = async () => {
      const currentProg: IDisplayProgram = await getProgramByName(currentProgramContext);
      checkForAdmin(currentProg);
      setProgramID(currentProg.programID);
      sessionStorage.setItem('lastProgramID', currentProg.programID.toString())
      // setNewEvent({ ...newEvent, programID: currentProg.programID.toString() });
      setProgramDes(currentProg.description);
      const fetchedEvents = await getEventsByProgramName(currentProgramContext)
      console.log(fetchedEvents)
      setIdCounter(fetchedEvents.length);
      setAllEvents(fetchedEvents)

      const today = new Date();
      const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      setNewEvent({ ...newEvent, start: dateStr, allDay: true, id: 0, programID: programID.toString() })

      setStartTime(dateStr + " ")
      setEndTime(dateStr + " ")

      //setting display events on load
      const currentEvents = fetchedEvents.filter((obj: { start: string | string[]; }) => obj.start.includes(dateStr))
      setDisplayEvents(currentEvents)

      
    }
    const programArrTemp = splitStringToArray(sessionStorage.getItem('programs'))
    if(programArrTemp){
      setProgramArr(programArrTemp)
    }
    getEvents()


  }, [currentProgramContext])

  useEffect(() => {
    const currentDate = new Date();
    const options: any = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDateString = currentDate.toLocaleDateString('en-US', options);
    setClickedDate(formattedDateString);

    const getLoggedinData = async () => {
      await checkForUserOnRefresh()
      const loggedIn = await loggedinData();
      await setLoggedUser(loggedIn)
      if (loggedIn.programs) {

        getEvents()
      
      }
    }
    // setAllEvents(DummyEvents)
    const getEvents = async () => {
      if (sessionStorage.getItem('firstLoad') === "true") {
        const programArrTemp = splitStringToArray(sessionStorage.getItem('programs'))
        

        if (programArrTemp) {
          setProgramArr(programArrTemp);
      
          setCurrentProgramContext(programArrTemp[0])
          sessionStorage.setItem('lastProgram', programArrTemp[0])
        
        if (programArrTemp && (sessionStorage.getItem('firstLoad') === "true")) {
         
          const currentProg: IDisplayProgram = await getProgramByName(programArrTemp[0])
          checkForAdmin(currentProg);
          console.log(currentProg.programID)
          setProgramID(currentProg.programID)
          sessionStorage.setItem('lastProgramID', currentProg.programID.toString())
          setNewEvent({ ...newEvent, programID: currentProg.programID.toString() })
          setProgramDes(currentProg.description)
          //set the program id and the description and fetch events 

          const fetchedEvents = await getEventsByProgramName(programArrTemp[0])
          console.log(fetchedEvents.length)
          setIdCounter(fetchedEvents.length);
          console.log("this is idCounter " + idCounter)
          console.log("you have this many events : " + idCounter)
          setAllEvents(fetchedEvents)

          const today = new Date();
          console.log("this is program id" + programID)
          const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
          setNewEvent({ ...newEvent, start: dateStr, allDay: true, id: 0, programID: programID.toString() })

          setStartTime(dateStr + " ")
          setEndTime(dateStr + " ")

          //setting display events on load
          const currentEvents = fetchedEvents.filter((obj: { start: string | string[]; }) => obj.start.includes(dateStr))
          setDisplayEvents(currentEvents)

          sessionStorage.setItem('firstLoad', "false")
        }
      }

      }
      else if (sessionStorage.getItem('firstLoad') === "false") {

        const programArrTemp = sessionStorage.getItem('lastProgram')
        const checkForPrograms = splitStringToArray(sessionStorage.getItem('programs'))
        if(programArrTemp){
          setCurrentProgramContext(programArrTemp)
          if(checkForPrograms){
           setProgramArr(checkForPrograms) 
          }
          
          
        }
      

      }

    }
    getLoggedinData()



  }, []);

  const checkForAdmin = (check: IDisplayProgram) => {
    const adminArr = splitStringToArray(sessionStorage.getItem('userID'))
    console.log(adminArr)
    
    const checkArr = splitStringToArray(check.adminID)
    console.log(checkArr)

    const isSimilar = adminArr?.some(e => checkArr?.includes(e))
    if (isSimilar) {
      setIsAdmin(true)
      sessionStorage.setItem("userStatus", "admin")
      console.log('you ARE THE ADMIN')
    }
    else {
      setIsAdmin(false)
      sessionStorage.setItem("userStatus", "general")
      console.log("no admins")
    }
  }

  const [programDesc, setProgramDes] = useState<string>('')
  const [idCounter, setIdCounter] = useState(0);
  const [isAdmin, setIsAdmin] = useState<Boolean>(false)
  const [programID, setProgramID] = useState<number>(0);
  const [allEvents, setAllEvents] = useState<IEvent[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number>(999999999)
  const [newEvent, setNewEvent] = useState<IEvent>({
    title: '',
    start: '',
    end: '',
    allDay: false,
    id: idCounter,
    color: '',
    programID: programID.toString()
  })

  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("")

  const [clickedDate, setClickedDate] = useState<string>(new Date().toISOString())
  const [displayEvents, setDisplayEvents] = useState<IEvent[]>([])

  const [programArr, setProgramArr] = useState<string[]>([])

  function handleDateClick(arg: { dateStr: any, allDay: boolean }) {
    //setting up useState for the modal
    // setNewEvent({ ...newEvent, start: arg.dateStr, allDay: arg.allDay, id: new Date().getTime() })
  
    setNewEvent({ ...newEvent, start: arg.dateStr, allDay: arg.allDay, id: 0, programID: programID.toString() })
    // setShowModal(true)
    
    setStartTime(arg.dateStr + " ")
    setEndTime(arg.dateStr + " ")
    

    //showing the events on the other div
    setClickedDate(arg.dateStr)
    const currentEvents = allEvents.filter(obj => obj.start.includes(arg.dateStr))
 
    setDisplayEvents(currentEvents)

  }


  function handleDeleteModal(data: { event: { id: string } }) {
    console.log(data.event.id)
    setShowDeleteModal(true)
    setIdToDelete(Number(data.event.id))
  }

  async function handleDelete() {
    setAllEvents(allEvents.filter(event => Number(event.id) !== Number(idToDelete)))
    await DeleteEventByID(idToDelete)
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
      id: idCounter,
      color: '',
      programID: programID.toString(),
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
  const handleEndTimeChange = (time: string): void => {
    setNewEvent({
      ...newEvent,
      end: (endTime + time),
      allDay: false,
    })
  }
  const handleStartTimeChange = (time: string): void => {
    setNewEvent({
      ...newEvent,
      start: (startTime + time),
      allDay: false,
    })
  }
  const handleColorChange = (color: string): void => {
    setNewEvent({
      ...newEvent,
      color: color
    })
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(newEvent)
    newEvent.id = 0
    await createEvent(newEvent);
    newEvent.id = idCounter;
    setIdCounter(idCounter + 1);
    const newEvents = await getEventsByProgramName(currentProgramContext)
    setAllEvents(newEvents)

    setDisplayEvents([...displayEvents, newEvent])

    setShowModal(false)
    console.log(newEvent)

    setNewEvent({
      title: '',
      start: '',
      end: '',
      allDay: true,
      id: idCounter,
      color: '',
      programID: programID.toString(),
    })
  }


  const handleCreate = () => {
    setNewEvent({ ...newEvent, programID: programID.toString() })
    console.log(newEvent)
    console.log(displayEvents)
    console.log(isAdmin)
    setShowModal(true)
  }

  const handleJoinBtn = () => {
    console.log("program number is: " + programID)
    console.log("userId is : " + sessionStorage.getItem('userID'))
    const addInfo: IAddUserToProgram = {
      programID: programID,
      userId: Number(sessionStorage.getItem('userID')),
      status: "general"
    }
    AddUserToProgram(addInfo)
    const addElement = (newElement: string) => {
      setProgramArr(prevArray => [...prevArray, newElement]);
      sessionStorage.setItem('programs', programArr.join(","))
    };
    addElement(currentProgramContext)
  }

  const [descriptionModal, setDescriptionModal] = useState(false)

  const tempFunction = ()=>{
    setDescriptionModal(true)
    console.log(programArr)  
  }

  return (
    <div className='bg-gradient-to-b from-lime-200 from-10% via-lime-100 via-70% to-white to-100%'>
      <NavbarComponent />

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
              isAdmin = {isAdmin}
            />




          </main>

        </div>


        <div className=" col-span-7 lg:col-span-4 lg:px-10">
          <div className="py-3 lg:py-8">
            <div className='flex justify-center'>
              <h1 className="text-center text-3xl font-titillium font-bold">{formatDate(clickedDate)}</h1>
              <div className='flex  items-center ps-2 hover:cursor-pointer'>
                <InfoOutlinedIcon onClick={() => tempFunction()} />

              </div>

            </div>
            <div className='hover:text-slate-600 hover:cursor-pointer row-span-1 justify-center pl-3 mt-1'>
              <Modal popup onClose={() => setDescriptionModal(false)} show={descriptionModal} size="md">
                <Modal.Header />
                <Modal.Body>
                  <div className=' font-titillium text-xl'>
                    <p >
                      Program Description:
                    </p>
                    <p>{programDesc}</p>
                  </div>

                  <br />
                  <div className='flex justify-center'>
                    {programArr.includes(currentProgramContext) ?
                      <Button className=' border-2 border-black bg-red-500  rounded-lg min-w-36 h-10 font-titillium bg-none w-14 text-lg hover:text-white'>Leave?</Button>
                      :
                      <Button onClick={() => handleJoinBtn()} className=' border-2 border-black bg-green-500  rounded-lg min-w-36 h-10 font-titillium bg-none w-14 text-lg hover:text-white'>Join Program</Button>
                    }
                  </div>

                </Modal.Body>
              </Modal>
            </div>

            <div className=" text-xl p-5 ">
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

            {isAdmin ? 
            <div className="relative h-[90px] flex justify-center items-end">
              <button onClick={() => handleCreate()} className='absolute text-white py-2 px-4 rounded bg-violet-500 hover:bg-violet-800'> Create New Event</button>
            </div>
            :
            <div>
              
            </div>
            }
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