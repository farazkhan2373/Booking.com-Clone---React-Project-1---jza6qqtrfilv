import React, { useEffect, useState } from 'react'
import './selectedflight.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircle } from '@fortawesome/free-solid-svg-icons';

export const SelectedFlight = () => {
  const location = useLocation();
  const departure = location.state.departure;
  const arrival = location.state.arrival;
  const startDate = location.state.startDate;
  const daysOfWeek = location.state.daysOfWeek;
  console.log(departure, arrival, startDate);

 const navigateTo = useNavigate();

  const { flightId } = useParams();

  const [selectedFlight, setSelectedFlight] = useState(null);

  const getSelectedFlightData = async () => {

    const config = {
      headers: {
        projectID: "jza6qqtrfilv"
      }
    }
    try {
      const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightId}`, config)
      console.log(response.data.data);
      setSelectedFlight(response.data.data);
    }
    catch (error) {
      console.log("selected flight api error", error)
    }
  }

  useEffect(() => {
    getSelectedFlightData();
  }, [])

  function calculateTax(number) {
    return ((5 / 100) * number).toFixed(2);

  }

  function handleFlightBookBtn(){
      navigateTo('/flights/flightbooking');
  }

  return (
    <section className='selected-flight-page parent-container'>
      <div className='child-container'>

        {selectedFlight ? <div className='selected-flight-content'>

          <div className='summary-header-div'>
            <div className='traveller-count'>
              <FontAwesomeIcon icon={faCircle} className='circle-icon' />
              <li>1 traveller</li>
              <FontAwesomeIcon icon={faCircle} className='circle-icon' />
              <li>{daysOfWeek[startDate.getDay()]} {startDate.getDate()} {startDate.toLocaleString('default', {month: 'short'})}</li>
            </div>
            <div className='summary-heading'>
              <h1>{departure} to {arrival}</h1>
              <button className='same-btn' onClick={handleFlightBookBtn}>Book Ticket</button>
            </div>
          </div>

          <div className='summary-main'>
            <h4>Ticket Summary</h4>

            <section className='ticket-summary-box'>
              <h5>{departure} - {arrival}</h5>
              <p>Flight Departure Time: <b>{selectedFlight.departureTime}</b> from {departure}</p>
              <p>Flight Arrival Time: <b>{selectedFlight.arrivalTime}</b> at {arrival}</p>
              <p>Duration: {selectedFlight.duration} hour</p>
              <p>Available Seats: {selectedFlight.availableSeats}</p>
              <p>Amenities: {selectedFlight.amenities.map((facility, index)=>(
                <span key={index}>{facility} </span>
              ))}</p>
              <p>Flight-ID: {selectedFlight.flightID}</p>
            </section>

            <h4>Fare Summary</h4>
            <section className='fare-summary-box'>

              <div>
                <h5>Ticket(1 traveller)</h5>
                <p>Flight Fare: INR {selectedFlight.ticketPrice - calculateTax(selectedFlight.ticketPrice)}</p>
                <p>Taxes and Charges: INR {calculateTax(selectedFlight.ticketPrice)}</p>
              </div>

              <div>
                <h1>Total: INR {selectedFlight.ticketPrice}</h1>
                <p>Includes taxes and charges</p>
              </div>

              <div>
                <span className='green-para'><FontAwesomeIcon icon={faCheck} className='check-icon' /> No Hidden Fees</span>
              </div>

              <div>
                <button className='same-btn' onClick={handleFlightBookBtn}>Book Ticket</button>
              </div>

            </section>

          </div>

        </div>: <h2>Loading...</h2>
        }


      </div>
    </section>
  )
}
