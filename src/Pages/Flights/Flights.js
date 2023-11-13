import React from 'react'
import { FlightHeader } from '../../components/FlightsComponents/FlightHeader/FlightHeader'
import { FlightMain } from '../../components/FlightsComponents/FlightMain/FlightMain'
import { Information } from '../../components/FlightsComponents/Information/Information'
import { Route, Routes } from 'react-router-dom'
import { FlightsList } from '../FlightsList/FlightsList'
import { SelectedFlight } from '../SelectedFlight/SelectedFlight'

export const Flights = () => {
  return (
    <section className='flight-section'>
      <FlightHeader />

      <Routes>

        <Route path='/' exact element={<>
          <FlightMain />
          <Information />
          <div className='parent-container'>
            <p className='child-container' id='note' style={{ color: '#474747', fontSize: '14px', margin: "20px 0px" }}>*Flexible plane tickets are available for an additional cost on selected airfares</p>
          </div>
          </>} />

          <Route path='flightslist' element={<FlightsList/>}/>
          <Route path=':flightId' element={<SelectedFlight/>}/>
          


      </Routes>
    </section>
  )
}
