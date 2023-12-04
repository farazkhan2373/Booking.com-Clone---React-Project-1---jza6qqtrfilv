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
  const departureCity = location.state.departureCity;
  const arrivalCity = location.state.arrivalCity;
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const day = daysOfWeek[startDate.getDay()];

  const [flights, setFlights] = useState(null);

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

    setFlights(null);
    setTimeout(()=>{
     getFlightsList();
    }, 2000)
   
    
    setBestClicked(true);
    setCheapestClicked(false);
    setFastestClicked(false);
  }

  function handleCheapest() {
    const price = flights.map((flight) => {
      return flight.ticketPrice;
    })
    const sortedPrice = price.sort();
    const cheapestFlight = []
    for (let amount of sortedPrice) {
      for (let data of flights) {
        if (data.ticketPrice === amount) {
          // check for similar data if same id is matched than don't push and move ahead
          if (cheapestFlight.length > 0) {
            let sameData = false;
            for(let newFlight of cheapestFlight){
              if(newFlight._id === data._id){
                sameData = true;
                break;
              }
            }
            if(sameData){
              continue;
            }
          }
          cheapestFlight.push(data);
          break;
        }
      }
    }
    
    setFlights(null);
    console.log("cheapestflight", cheapestFlight);
    setTimeout(()=>{
      setFlights(cheapestFlight);
    }, 2000)
    setCheapestClicked(true);
    setBestClicked(false)
    setFastestClicked(false);
  }

  function handleFastest() {
    const allFlightDuration = flights.map((flight) => {
      return flight.duration;
    })
    const sortedDuration = allFlightDuration.sort();
    const fastestFlight = [];
    for (let duration of sortedDuration) {
      for (let data of flights) {
        if (data.duration === duration) {
          // below check is for similar data
          if (fastestFlight.length > 0) {
             let sameData = false;
            for(let newFlight of fastestFlight){
              if(newFlight._id === data._id){
                sameData = true;
                break;
              }
            }
            if(sameData){
              continue;
            }
          }
          fastestFlight.push(data);
          break;
        }
      }
    }
    setFlights(null);
    console.log("fastest flight", fastestFlight);
    setTimeout(()=>{
     setFlights(fastestFlight);
    }, 2000)
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
            {flights ? flights.length > 0 ? flights.map((flight, index) => (

              <article className='flight-cards' key={index}>

                <div className='flight-timing-div'>

                  <div className='left-div'>
                    <div><FontAwesomeIcon icon={faPlaneDeparture} /></div>
                    <div>
                      <p><b>{flight.departureTime} </b></p>
                      <span>{flight.source} {startDate.getDate()} {startDate.toLocaleString('default', { month: 'short' })}</span>
                    </div>
                  </div>

                  <div className='center-div'>
                    <p>{flight.duration}h</p>
                    <span>---------</span>
                    <p>{flight.stops === 0 ? 'Direct' : flight.stops + ' stop'}</p>
                  </div>

                  <div className='right-div'>
                    <div><FontAwesomeIcon icon={faPlaneArrival} /></div>
                    <div>
                      <p><b>{flight.arrivalTime}</b></p>
                      <span>{flight.destination} {startDate.getDate()} {startDate.toLocaleString('default', { month: 'short' })}</span>
                    </div>
                  </div>
                </div>

                <div className='flight-price-div'>
                  <div className='cabin-bag-div'>
                    <FontAwesomeIcon icon={faSuitcaseRolling} className='bag-icon' />
                    <FontAwesomeIcon icon={faPersonWalkingLuggage} className='bag-icon' />
                    <p>Included cabin bag, checked bag</p>
                  </div>
                  <div className='flight-price-content'>
                    <h2>INR {flight.ticketPrice.toLocaleString('en-IN')}</h2>
                    <p>Total price for all travellers</p>
                  </div>

                  <button className='white-btn' onClick={() => navigateTo(`/flights/${flight._id}`, { state: { departure: flight.source, arrival: flight.destination, startDate, departureCity, arrivalCity, day } })}>See flight</button>
                </div>

              </article>)) : <p className='flight-not-found'>We don't have any flights matching your search on our site. Try changing some details.</p> 
              :
              <div className='loading-modal'>
               <img src="https://assets-v2.lottiefiles.com/a/ac5056c0-116d-11ee-827b-cb344459ad99/D7zi0V8We2.gif" alt="loading" className='loading-gif' />
               </div>
            }
          </div>

        </div>
      </div>


    </section>
  )
}
