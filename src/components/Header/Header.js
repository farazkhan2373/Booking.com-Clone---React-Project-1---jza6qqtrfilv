import React, { useEffect, useRef, useState } from 'react'
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faCalendarDays, faPerson, faX, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";
import { Personmodal } from './PersonModal/Personmodal';
import { useNavigate } from 'react-router-dom';



export const Header = () => {

    const [showCross, setShowCross] = useState(false);

    const [destination, setDestination] = useState('');

    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const destinationRef = useRef();

    const [personCountInfo, setPersonCountInfo] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })

    const [showCalender, setShowCalender] = useState(false);
    const [showPersonModal, setPersonModal] = useState(false);

    const navigateTo = useNavigate();

    function handleHotelSearch(){
        if(destination === ''){
            destinationRef.current.focus();
            return;
        }

       navigateTo('/hotelslist', {state: {destination, date, personCountInfo}})
    }

    useEffect(()=>{
       if(destination === ''){
        setShowCross(false);
       }
        else{
            setShowCross(true);
        }
       

    },[destination])

    return (
        <header className='header-container parent-container'>
            <div className='header-content child-container'>

                <div>
                    <h1>Find your next stay</h1>
                    <p>Search low prices on hotels, homes and much more...</p>
                </div>

                {/* SEARCH BOX CONTAINER */}
                <div id='header-SearchContainer'>

                    {/* INPUT DIV */}
                    <div className='headerSearchItem'>
                        <div id='inputtext-div'>
                            <FontAwesomeIcon icon={faHotel} className='header-icon' />
                            <input
                                type="text"
                                placeholder='Where are you going?'
                                id='input-text-bar'
                                value={destination}
                                onChange={(e)=>{
                                    setDestination(e.target.value)
                                    
                                }}
                                ref={destinationRef}
                            />
                           {showCross && <FontAwesomeIcon icon={faX} className='header-icon' id='crossX-icon' onClick={()=> setDestination('')} />}
                        </div>
                    </div>

                    {/* DATE DIV */}
                    <div className='headerSearchItem'>
                        <FontAwesomeIcon icon={faCalendarDays} className='header-icon' />
                        <span id='search-date'
                            onClick={() => setShowCalender((oldstate) => !oldstate)}>
                            {format(date[0].startDate, "MM/dd/yyyy") + " to " + format(date[0].endDate, "MM/dd/yyyy")}</span>
                        {showCalender && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className='date'
                        />}
                    </div>

                    {/* PERSON DIV */}
                    <div className='headerSearchItem' >

                        <FontAwesomeIcon icon={faPerson} className='header-icon' />

                        <span id='person-count' onClick={()=> setPersonModal((oldstate)=> !oldstate)}>
                            {`${personCountInfo.adult} Adult ${personCountInfo.children} Children ${personCountInfo.room} Room`}
                        </span>

                        {/* PERSON INFO MODAL */}
                        {showPersonModal && <Personmodal personCountInfo={personCountInfo} setPersonCountInfo={setPersonCountInfo} setPersonModal={setPersonModal}/>}
                        

                        <FontAwesomeIcon icon={faAngleDown} className='header-icon' />

                    </div>

                    {/* SEARCH BUTTON */}
                 
                        <button id='search-button' className='same-btn' onClick={handleHotelSearch} >Search</button>
                 

                </div>

            </div>

        </header>
    )
}
