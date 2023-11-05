import React from 'react'
import { FlightHeader } from '../../components/FlightsComponents/FlightHeader/FlightHeader'
import { FlightMain } from '../../components/FlightsComponents/FlightMain/FlightMain'
import { Information } from '../../components/FlightsComponents/Information/Information'

export const Flights = () => {
  return (
    <section className='flight-section'>
      <FlightHeader/>
      <FlightMain/>
      <Information/>
      <div className='parent-container'>
      <p className='child-container' id='note' style={{color: '#474747', fontSize: '14px', margin: "20px 0px"}}>*Flexible plane tickets are available for an additional cost on selected airfares</p>
      </div>
    </section>
  )
}
