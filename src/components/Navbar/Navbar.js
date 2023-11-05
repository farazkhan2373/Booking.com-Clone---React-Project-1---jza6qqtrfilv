import React from 'react'
import './navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faPlane, faCar, faTaxi, faGlobe, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { Header } from '../Header/Header';


export const Navbar = () => {

  const navigate = useNavigate();
  return (
    <nav id='navbar' className='parent-container'>

      <div className='child-container nav-container'>

        <div id='reg-div'>

          <span id='booking-logo'>
            <NavLink to="/"><h2>Booking.com</h2></NavLink>
          </span>

          <div id='btn-container'>
            <button className='reg-btn' onClick={()=> navigate('/register')}>Register</button>
            <button className='reg-btn'>Sign in</button>
          </div>

        </div> 

        <nav id='navigation-Links'>
            <ul id='links-container'>
              <li><NavLink to="/"><FontAwesomeIcon icon={faBed} /> Stays</NavLink></li>
              <li><NavLink to="/flights"><FontAwesomeIcon icon={faPlane} /> Flights</NavLink></li>
              {/* <li><NavLink to="/flightsHotel"><FontAwesomeIcon icon={faGlobe} /> Flights + Hotel</NavLink></li> */}
              <li><NavLink to="/carrentals"><FontAwesomeIcon icon={faCar} /> Car Rentals</NavLink></li>
              <li><NavLink to="/attractions"><FontAwesomeIcon icon={faMapPin} /> Attractions</NavLink></li>
              <li><NavLink to="/airporttaxis"><FontAwesomeIcon icon={faTaxi} /> Airport taxis</NavLink></li>
              
            </ul>
        </nav>

      {/* <Header/> */}


      </div>



    </nav>
  )
}
