import React, { useState } from 'react'
import './flightslist.css'
import { useLocation } from 'react-router-dom'
import { faPersonWalkingLuggage, faPlane, faPlaneArrival, faPlaneDeparture, faSuitcaseRolling, fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const FlightsList = () => {

  const location = useLocation();
  console.log(location);

  const departure = location.state.departure;
  const arrival = location.state.arrival;
  const startDate = location.state.startDate;

  const [bestClicked, setBestClicked] = useState(true);
  const [cheapestClicked, setCheapestClicked] = useState(false);
  const [fastestClicked, setFastestClicked] = useState(false);


  function handleBest() {
    setBestClicked(true);
    setCheapestClicked(false);
    setFastestClicked(false);
  }

  function handleCheapest() {
    setCheapestClicked(true);
    setBestClicked(false)
    setFastestClicked(false);
  }

  function handleFastest() {
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

            <article className='flight-cards'>

              <div className='flight-timing-div'>

                <div className='left-div'>
                  <div><FontAwesomeIcon icon={faPlaneDeparture} /></div>
                  <div>
                    <p>18:35</p>
                    <span>BOM. 12 Nov</span>
                  </div>
                </div>

                <div className='center-div'>
                  <p>1h 25m</p>
                  <span>-------------------------</span>
                  <p>Direct</p>
                </div>

                <div className='right-div'>
                <div><FontAwesomeIcon icon={faPlaneArrival} /></div>
                <div>
                  <p>20:00</p>
                  <span>HYD. 12 Nov</span>
                </div>
                </div>
              </div>

              <div className='flight-price-div'>
                <div>
              <FontAwesomeIcon icon={faSuitcaseRolling} className='bag-icon'/>
              <FontAwesomeIcon icon={faPersonWalkingLuggage} className='bag-icon' />
                <p>Included cabin bag, checked bag</p>
              </div>
              <div>
                <h2>INR 4,880.38</h2>
                <p>Total price for all travellers</p>
                </div>

                <button className='white-btn'>See flight</button>
              </div>

            </article>
          </div>

        </div>
      </div>
    </section>
  )
}
