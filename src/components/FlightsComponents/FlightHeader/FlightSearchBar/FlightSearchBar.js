import React, { useRef, useState } from 'react'
import './FlightSearchBar.css'
import { faArrowDown, faArrowDownLong, faArrowRightArrowLeft, faArrowUp, faArrowUpLong, faArrowsUpDown, faCalendar, faPlaneArrival, faPlaneDeparture, faUpDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';

export const FlightSearchBar = () => {

    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const whereFromRef = useRef();
    const whereToRef = useRef();
   



    const navigateTo = useNavigate()

    function handleFlightSearch() {
        if(departure === ''){
             whereFromRef.current.focus();
             return;
        }else if(arrival === ''){
            whereToRef.current.focus();
            return;
        }
        console.log(departure, arrival, startDate);
       navigateTo('/flights/flightslist', {state: {departure, arrival, startDate}})
    }

    function swapFlightSearch(){
        // IF BOTH ARE EMPTY THEN DON'T SWAP
        if(departure === '' && arrival === ''){
            return;
        }
        //  OTHER WISE SWAP
        let temp = departure;
        setDeparture(arrival);
        setArrival(temp);

        
    }

    


    return (
        <div className='flight-search-bar'>
            <div className='flight-searchBar-container'>
                <div className='flight-searchItem'>
                    <div className='flight-departure-input-div'>
                        <FontAwesomeIcon icon={faPlaneDeparture} />
                        <input type="text" placeholder='Where from?'
                        className='flight-input-bar' value={departure}
                        onChange={(e) => setDeparture(e.target.value)} 
                        ref={whereFromRef}/>
                    </div>
                </div>

                <div className='flight-searchItem swap-flight-box' onClick={swapFlightSearch}>
                    <div className='flight-exchange-div'>
                        <FontAwesomeIcon icon={faArrowRightArrowLeft} className='right-left-arrow'/>
                        <FontAwesomeIcon icon={faArrowUpLong} className='up-down-arrow'/>
                        <FontAwesomeIcon icon={faArrowDownLong} className='up-down-arrow'/>
                    </div>
                </div>

                <div className='flight-searchItem'>
                    <div className='flight-landing-input-div'>
                        <FontAwesomeIcon icon={faPlaneArrival} />
                        <input type="text" placeholder='Where to?' className='flight-input-bar'
                        value={arrival}
                        onChange={(e)=>setArrival(e.target.value)} 
                        ref={whereToRef}/>
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

                <button className='same-btn flight-search-btn' onClick={handleFlightSearch}>Search</button>



            </div>
        </div>
    )
}
