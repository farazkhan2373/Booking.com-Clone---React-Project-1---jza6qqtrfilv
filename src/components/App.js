import "../styles/App.css";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import { ComingSoon } from "../Pages/ComingSoon/ComingSoon";
import { Footer } from "./Footer/Footer";
import {Flights} from "../Pages/Flights/Flights"
import { Home } from "../Pages/Home/Home";
import { Register } from "../Pages/Register/Register";
import { Login } from "../Pages/Login/Login";
import { createContext, useState } from "react";
import { Profile } from "../Pages/Profile/Profile";
import { HotelsList } from "../Pages/HotelsList/HotelsList";

export const AuthContext = createContext();

function App() {
  
  // if(isTokenAvailable){
  //   isUserLoggedIn = true;
  // }else{
  //   isUserLoggedIn = false;
  // }

  let isUserLoggedIn =  sessionStorage.getItem('userToken') ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn);

  return(
    <BrowserRouter>
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
    <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/flights" element={<Flights />}/>
      {/* <Route path="/flightsHotel" element={<ComingSoon />}/> */}
      <Route path="/carrentals" element={<ComingSoon />}/>
      <Route path="/attractions" element={<ComingSoon/>}/>
      <Route path="/airporttaxis" element={<ComingSoon />}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/hotelslist' element={<HotelsList />} />
     </Routes>
     <Footer/>
     </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App;
