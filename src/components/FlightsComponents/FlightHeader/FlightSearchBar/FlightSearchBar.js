import React, { useRef, useState } from 'react'
import './FlightSearchBar.css'
import { faArrowDownLong, faArrowRightArrowLeft, faArrowUpLong, faCalendar, faPlaneArrival, faPlaneDeparture, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { AirportDetails } from '../../../AirportDetails/AirportDetails';

export const FlightSearchBar = () => {

    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const [showSuggestionModal, setShowSuggestionModal] = useState(false);
    const [suggestionData, setSuggestionData] = useState(null)

    const [showArrivalSuggestionModal, setArrivalSuggestionModal] = useState(false);
    const [arrivalSuggestionData, setArrivalSuggestionData] = useState(null);

    const [showDepartureX, setShowDepartureX] = useState(false);
    const [showArrivalX, setShowArrivalX] = useState(false);

    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');

    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');


    const whereFromRef = useRef();
    const whereToRef = useRef();

    const airportDetails = AirportDetails();
    // console.log(airportDetails);



    const navigateTo = useNavigate()

    function handleFlightSearch() {
        if (departure === '') {
            whereFromRef.current.focus();
            return;
        } else if (arrival === '') {
            whereToRef.current.focus();
            return;
        }

        if(departure === arrival){
            alert("Source and destination can't be same");
            return;
        }

        if(source === '' || destination === ''){
            alert("Select source or destination from suggestion list");
            return;
        }

        // console.log("source", source)
        // console.log("destination", destination)

        console.log("departure city", departureCity);
        console.log("arrival city", arrivalCity);


        console.log(departure, arrival, startDate);
        navigateTo('/flights/flightslist', { state: { departure: source, arrival: destination, startDate, arrivalCity, departureCity } })

        
    }

    function swapFlightSearch(e) {
        // IF BOTH ARE EMPTY THEN DON'T SWAP
        if (departure === '' && arrival === '') {
            return;
        }
      
        

        //  SWAP INPUT FIELD
        if(arrival !== ''){
            setShowDepartureX(true);
        }else{
            setShowDepartureX(false);
        }

        if(departure !== ''){
           setShowArrivalX(true);
        }
        else{
            setShowArrivalX(false);
        }
        let temp = departure;
        setDeparture(arrival);
        setArrival(temp);
       

        // SWAP SOURCE AND DESTINATION
        let temp2 = source;
        setSource(destination);
        setDestination(temp2);

        // SWAP CITIES
        let tempCity = departureCity;
        setDepartureCity(arrivalCity);
        setArrivalCity(tempCity);

        // CLOSE SUGGESTION MODAL OF DEPARTURE AND ARRIVAL
        setArrivalSuggestionModal(false);
        setShowSuggestionModal(false);


    }

    function getSuggestionList(keyword){
        let filterSearch = airportDetails.filter((data) => {
            let code = data.IATA_code.toLowerCase();
            let airportName = data.airport_name.toLowerCase();
            let cityName = data.city_name.toLowerCase();
            let value =  keyword.toLowerCase();
            if (code.includes(value) || airportName.includes(value) || cityName.includes(value)) {
                return data
            }
        })

        return filterSearch;
    }

    function handleDepartureInput(e) {

        const suggestionList = getSuggestionList(e.target.value);

        console.log("departure suggestion list", suggestionList)
        setSuggestionData(suggestionList);

        if (e.target.value === '') {
            setShowSuggestionModal(false);
            setShowDepartureX(false);
        } else {
            setShowSuggestionModal(true);
            setShowDepartureX(true);
        }

        setDeparture(e.target.value);

    }

    function handleArrivalInput(e){

        const suggestionList = getSuggestionList(e.target.value);

        console.log("arrival suggestion list", suggestionList);
        setArrivalSuggestionData(suggestionList);

        if(e.target.value === ''){
           setArrivalSuggestionModal(false);
            setShowArrivalX(false)

        }else{
            setArrivalSuggestionModal(true);
            setShowArrivalX(true);
        }

      setArrival(e.target.value);
      
    }

    function suggestionClicked(e) {
        const selectedAirport = e.target.innerText;
        let airportCode = ''
        for (let i = 0; i < selectedAirport.length; i++) {
            let ch = selectedAirport.charAt(i);
            if (ch === ' ') {
                break;
            } else {
                airportCode = airportCode + ch;
            }
        }

        let cityName = '';

        for (let i = selectedAirport.length - 1; i >= 0; i--) {
            let ch = selectedAirport.charAt(i);
            if (ch === ",") {
                break;
            } else {
                cityName = ch + cityName;
            }
        }  

        console.log("airport code", airportCode);
        console.log("city name", cityName);

        if(e.target.className === "arrival-suggestion-para"){
            setDestination(airportCode);
            setArrivalCity(cityName);
        }else{
            setSource(airportCode);
            setDepartureCity(cityName);
        }

    }

    function handleDepartureXMark() {
        setDeparture('');
        setShowDepartureX(false);
        setShowSuggestionModal(false);
        setSource('');
        setDepartureCity('');
        whereFromRef.current.focus();

    }

    function handleArrivalXMark() {
        setArrival('');
        setShowArrivalX(false);
        setArrivalSuggestionModal(false);
        setDestination('');
        setArrivalCity('');
        whereToRef.current.focus();
    }

    return (
        <div className='flight-search-bar'>
            <div className='flight-searchBar-container'>
                <div className='flight-searchItem'>

                    <div className='flight-departure-input-div'>
                        <FontAwesomeIcon icon={faPlaneDeparture} />

                        <input type="text" placeholder='Where from?'
                            className='flight-input-bar' value={departure}
                            onChange={handleDepartureInput}
                            ref={whereFromRef} />

                        {showDepartureX && <FontAwesomeIcon icon={faXmark} className='flight-xmark'
                            onClick={handleDepartureXMark} />}

                        {showSuggestionModal && <div className='suggestion-modal box-shadow' >
                            {suggestionData.length > 0 && suggestionData.map((data, index) => (
                                <p key={index} className='suggestion-para'
                                 onClick={(e)=>{
                                    suggestionClicked(e);
                                    setDeparture(e.target.innerText);
                                    setShowSuggestionModal(false);
                                 }} >
                                    {data.IATA_code} {data.airport_name}, {data.city_name}
                                </p>
                            ))}

                        </div>}
                    </div>


                </div>

                <div className='flight-searchItem swap-flight-box' onClick={swapFlightSearch}>
                    <div className='flight-exchange-div'>
                        <FontAwesomeIcon icon={faArrowRightArrowLeft} className='right-left-arrow' />
                        <FontAwesomeIcon icon={faArrowUpLong} className='up-down-arrow' />
                        <FontAwesomeIcon icon={faArrowDownLong} className='up-down-arrow' />
                    </div>
                </div>

                <div className='flight-searchItem'>
                    <div className='flight-landing-input-div'>
                        <FontAwesomeIcon icon={faPlaneArrival} />
                        <input type="text" placeholder='Where to?' className='flight-input-bar'
                            value={arrival}
                            onChange={handleArrivalInput}
                            ref={whereToRef} />

                        {showArrivalX && <FontAwesomeIcon icon={faXmark} className='flight-xmark'
                            onClick={handleArrivalXMark} />}

                           {showArrivalSuggestionModal && <div className='arrival-suggestion-modal box-shadow'>
                                {arrivalSuggestionData.length > 0 && arrivalSuggestionData.map((data, index)=>(
                                 <p key={index} className='arrival-suggestion-para'
                                 onClick={(e)=>{
                                 suggestionClicked(e);
                                 setArrival(e.target.innerText);
                                 setArrivalSuggestionModal(false);
                                 }}>
                                 {data.IATA_code} {data.airport_name}, {data.city_name}
                                 </p>
                                )) }
                            </div>}
                    </div>
                </div>

                <div className='flight-searchItem' id='flight-date-div'>
                    <FontAwesomeIcon icon={faCalendar} />
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
