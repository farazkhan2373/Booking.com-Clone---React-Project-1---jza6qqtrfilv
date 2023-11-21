import React, { useEffect, useState } from 'react'
import './flightslist.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { faPersonWalkingLuggage, faPlane, faPlaneArrival, faPlaneDeparture, faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

export const FlightsList = () => {

  const location = useLocation();
  const navigateTo = useNavigate();


  const departure = location.state.departure;
  const arrival = location.state.arrival;
  const startDate = location.state.startDate;
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const day = daysOfWeek[startDate.getDay()];

  const [flights, setFlights] = useState([]);

  const getFlightsList = async () => {
    const config = {
      headers: {
        projectID: "jza6qqtrfilv"
      }
    }

    try {

      const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/flight?day=${day}&search={"source":"${departure}","destination":"${arrival}"}`, config)
      console.log("best flight", response.data.data.flights);
      setFlights(response.data.data.flights);

    }
    catch (error) {

      console.log(error)
    }

  }

  useEffect(() => {
    getFlightsList();
    setBestClicked(true);
    setFastestClicked(false);
    setCheapestClicked(false);

  }, [departure, arrival, startDate])

  const [bestClicked, setBestClicked] = useState(true);
  const [cheapestClicked, setCheapestClicked] = useState(false);
  const [fastestClicked, setFastestClicked] = useState(false);


  function handleBest() {
    getFlightsList();
    setBestClicked(true);
    setCheapestClicked(false);
    setFastestClicked(false);
  }

  function handleCheapest() {
    const price = flights.map((flight)=>{
      return flight.ticketPrice;
    })
    const sortedPrice = price.sort();
    const cheapestFlight = []
    for(let amount of sortedPrice){
      for(let data of flights){
        if(data.ticketPrice === amount){
          // check for similar data
          if(cheapestFlight.length > 0){
            if(cheapestFlight[cheapestFlight.length-1]._id === data._id){
              continue;
            }
          }
             cheapestFlight.push(data);
             break;
        }
      }
    }

    console.log("cheapestflight", cheapestFlight);
    setFlights(cheapestFlight);
    setCheapestClicked(true);
    setBestClicked(false)
    setFastestClicked(false);
  }

  function handleFastest() {
    const allFlightDuration = flights.map((flight)=>{
      return flight.duration;
    })
    const sortedDuration = allFlightDuration.sort();
    const fastestFlight = [];
    for(let duration of sortedDuration){
      for(let data of flights){
          if(data.duration === duration){
            // below check is for similar data
          if(fastestFlight.length > 0){
            if(fastestFlight[fastestFlight.length-1]._id === data._id){
              continue;
            }
          }
            fastestFlight.push(data);
            break;
          }
      }
    }
    console.log( "fastest flight",fastestFlight);
    setFlights(fastestFlight);
    setFastestClicked(true);
    setBestClicked(false);
    setCheapestClicked(false)
  }


  return (
    <section className='flights-list-page parent-container'>
      <div className='flights-list-container child-container'>

        <div className='flights-list-content'>

          <div className='flight-sorting-btn-container'>
            <button className={`flight-sorting-btn ${bestClicked ? 'add-bottom-border' : ''}`} onClick={handleBest}>Best</button>
            <button className={`flight-sorting-btn ${cheapestClicked ? 'add-bottom-border' : ''}`} onClick={handleCheapest}>Cheapest</button>
            <button className={`flight-sorting-btn ${fastestClicked ? 'add-bottom-border' : ''}`} onClick={handleFastest}>Fastest</button>
          </div>


          <div className='flight-results-div'>
            {/* DYNAMIC FLIGHTS DATA */}
            {flights.length > 0 ?  flights.map((flight, index)=>(

             <article className='flight-cards' key={index}>

              <div className='flight-timing-div'>

                <div className='left-div'>
                  <div><FontAwesomeIcon icon={faPlaneDeparture} /></div>
                  <div>
                    <p>{flight.departureTime}</p>
                    <span>{flight.source}. {startDate.getDate()} {startDate.toLocaleString('default', {month: 'short'})}</span>
                  </div>
                </div>

                <div className='center-div'>
                  <p>{flight.duration}h</p>
                  <span>-------------------------</span>
                  <p>{flight.stops === 0 ? 'Direct' : flight.stops+' stop'}</p>
                </div>

                <div className='right-div'>
                  <div><FontAwesomeIcon icon={faPlaneArrival} /></div>
                  <div>
                    <p>{flight.arrivalTime}</p>
                    <span>{flight.destination} {startDate.getDate()} {startDate.toLocaleString('default', {month: 'short'})}</span>
                  </div>
                </div>
              </div>

              <div className='flight-price-div'>
                <div>
                  <FontAwesomeIcon icon={faSuitcaseRolling} className='bag-icon' />
                  <FontAwesomeIcon icon={faPersonWalkingLuggage} className='bag-icon' />
                  <p>Included cabin bag, checked bag</p>
                </div>
                <div>
                  <h2>INR {flight.ticketPrice}</h2>
                  <p>Total price for all travellers</p>
                </div>

                <button className='white-btn' onClick={()=> navigateTo(`/flights/${flight._id}`, {state: {departure, arrival, startDate, daysOfWeek}}) }>See flight</button>
              </div>

            </article> )): <h2>Loading...</h2> 
            }
          </div>

        </div>
      </div>

     
    </section>
  )
}
