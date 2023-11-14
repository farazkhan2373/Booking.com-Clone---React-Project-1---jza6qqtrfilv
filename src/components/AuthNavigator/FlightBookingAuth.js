import React, { useContext } from 'react'
import { AuthContext } from '../App'
import { Navigate, useLocation } from 'react-router-dom'


export const FlightBookingAuth = ({children}) => {
    const {isLoggedIn} = useContext(AuthContext)
    
    const location = useLocation();
    const departure = location.state.departure;
  const arrival = location.state.arrival;
  const startDate = location.state.startDate;
  const daysOfWeek = location.state.daysOfWeek;
  const flightIdPathname = location.state.flightIdPathname;
  
  return isLoggedIn ? children : <Navigate to='/login' state={{prevPath: flightIdPathname, departure, arrival, startDate, daysOfWeek, }}/>
}
