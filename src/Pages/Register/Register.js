import React from 'react'
import './register.css'
import { NavLink } from 'react-router-dom'
export const Register = () => {
  return (
    <section className='register-section'>
       <header className='parent-container register-header'>
         <div className='child-container register-header-content'>
         <h3><NavLink to='/'>Booking.com</NavLink></h3>
         </div>
       </header>
    </section>
  )
}
