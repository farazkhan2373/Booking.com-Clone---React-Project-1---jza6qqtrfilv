import React, { useRef, useState } from 'react'
import './FlightSearchBar.css'
import { faArrowRightArrowLeft, faCalendar, faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';

export const FlightSearchBar = () => {

    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [startDate, setStartDate] = useState(new Date());
   



    const navigateTo = useNavigate()

    function handleFlightSearch() {
        console.log(departure, arrival, startDate);
       navigateTo('/flights/flightslist', {state: {departure, arrival, startDate}})
    }

    


    return (
        <div className='flight-search-bar'>
            <div className='flight-searchBar-container'>
                <div className='flight-searchItem'>
                    <div className='flight-departure-input-div'>
                        <FontAwesomeIcon icon={faPlaneDeparture} />
                        <input type="text" placeholder='Where from?' className='flight-input-bar' value={departure}
                        onChange={(e) => setDeparture(e.target.value)} />
                    </div>
                </div>

                <div className='flight-searchItem'>
                    <div className='flight-exchange-div'>
                        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                    </div>
                </div>

                <div className='flight-searchItem'>
                    <div className='flight-landing-input-div'>
                        <FontAwesomeIcon icon={faPlaneArrival} />
                        <input type="text" placeholder='Where to?' className='flight-input-bar'
                        value={arrival}
                        onChange={(e)=>setArrival(e.target.value)} />
                    </div>
                </div>

                <div className='flight-searchItem' id='flight-date-div'>
                    <FontAwesomeIcon icon={faCalendar}/>
                    <DatePicker
                        selected={startDate}
                        value={format(startDate, "dd/MM/yyyy")}
                        onChange={(date) => setStartDate(date)}
                        className='flight-calender-date'
                    />
                </div>

                <button className='same-btn' onClick={handleFlightSearch}>Search</button>



            </div>
        </div>
    )
}
