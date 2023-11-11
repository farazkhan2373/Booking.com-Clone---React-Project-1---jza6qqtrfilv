import React from 'react'
import './register.css'

import { RegisterForm } from '../../components/RegisterComponents/RegisterForm'
import { RegisterLoginHeader } from '../../components/RegisterLoginHeader/RegisterLoginHeader'
export const Register = () => {
  return (
    <section className='register-section'>

      <RegisterLoginHeader/>

        <RegisterForm/>
    </section>
  )
}
