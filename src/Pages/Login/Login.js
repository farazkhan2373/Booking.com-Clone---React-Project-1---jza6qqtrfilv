import React, { useContext, useState } from 'react'
import './login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { RegisterLoginHeader } from '../../components/RegisterLoginHeader/RegisterLoginHeader'
import axios from 'axios'
import { AuthContext } from '../../components/App'


export const Login = () => {

  const {setIsLoggedIn} = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  const navigateTo = useNavigate();

  const createUser = async (user) =>{
    const config = {
      headers:{
        projectID: 'jza6qqtrfilv',
      }
    }
    try {
      const res = await axios.post('https://academics.newtonschool.co/api/v1/bookingportals/login', user, config)
      console.log(res);
      const token = res.data.token;
      if(token){
        sessionStorage.setItem("userToken", token);
        sessionStorage.setItem('loginUserDetails', JSON.stringify(res.data.data));
        setIsLoggedIn(true);
        navigateTo('/')

        
      }

    } catch (error) {
      console.log("error", error);
      setErrorMessage(error.response.data.message);
    }
     
  }

  function handleLoginForm(e){

    e.preventDefault();
    // ALL FIELD MUST BE FILLED
    for(let key in userInfo){
      if(userInfo[key] === ''){
        setErrorMessage("All fields must be filled");
        return; // it will return to handleRegisteration form
      }
    }
    const userDetails = {
      email: userInfo.email,
      password: userInfo.password,
      appType: "bookingportals",
    }
    console.log("userDetails", userDetails);
    createUser(userDetails);


  }

  function handleInputChange(e){
    const {name, value} = e.target;
    setUserInfo({...userInfo, [name]: value});
    setErrorMessage(null);
  }


  return (
   <section className='login-section'>
      <RegisterLoginHeader/>

      <div className='parent-container'>
        <div className='child-container login-form-content'>

          <form action="" className='login-form' onSubmit={handleLoginForm}>
            <h2>Sign in or create an account</h2>

            {errorMessage && <div>
              <p className='error-message'>{errorMessage}</p>
              </div>}
            
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id='email' name='email' onChange={handleInputChange}/>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id='password' name='password' onChange={handleInputChange}/>
            </div>

            <div>
               <input type="submit" value="Sign In" />
            </div>

            <div>
                <p>Don't have account? <NavLink to='/register'>Create an account</NavLink></p>
            </div>

          </form>
        </div>

      </div>
   </section>
  )
}
