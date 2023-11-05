import React from 'react'
import './FlightHeader.css'
import { FlightSearchBar } from './FlightSearchBar/FlightSearchBar'

export const FlightHeader = () => {

    
    return (
        <header className='flight-header parent-container'>
            <div className='flight-header-content child-container'>
                <h1>Compare and book flights with ease</h1>
                <p>Discover your next dream destination</p>

                <div className='user-input-div'>
                    <input type="radio" name="trip" id="" /> <span>Round trip</span>
                    <input type="radio" name="trip" id="" /> <span>One way</span>
                    <input type="radio" name="trip" id="" /> <span>Multi-city</span>
                    <select name="" id="">
                        <option value="Economy">Economy</option>
                        <option value="Premium economy">Premium economy</option>
                        <option value="Business">Business</option>
                        <option value="First Class">First Class</option>
                    </select>

                    <input type="checkbox" name="" id="" />Directs Flights only
                </div>

                <FlightSearchBar/>
            </div>
        </header>
    )
}
