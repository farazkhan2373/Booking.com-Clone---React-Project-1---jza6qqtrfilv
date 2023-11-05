import React, { useState } from 'react'
import './FlightSearchBar.css'
import { faArrowRightArrowLeft, faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const FlightSearchBar = () => {


    return (
        <div className='flight-search-bar'>
               <div className='flight-searchBar-container'>
            <div className='flight-searchItem'>
                <div className='flight-departure-input-div'>
                <FontAwesomeIcon icon={faPlaneDeparture} />
                   <input type="text" placeholder='Where from?' className='flight-input-bar'/>
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
                   <input type="text" placeholder='Where to?' className='flight-input-bar'/>
                </div>
            </div>

            <div className='flight-searchItem' id='flight-date-div'>
                <span >date to date</span>
            </div>

            <button className='same-btn'>Search</button>



            </div>
        </div>
    )
}
