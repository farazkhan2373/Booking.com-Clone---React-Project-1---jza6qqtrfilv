import "../styles/App.css";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import { ComingSoon } from "../Pages/ComingSoon/ComingSoon";
import { Footer } from "./Footer/Footer";
import {Flights} from "../Pages/Flights/Flights"
import { Home } from "../Pages/Home/Home";
import { Register } from "../Pages/Register/Register";

function App() {
  return(
    <BrowserRouter>
    <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/flights" element={<Flights />}/>
      {/* <Route path="/flightsHotel" element={<ComingSoon />}/> */}
      <Route path="/carrentals" element={<ComingSoon />}/>
      <Route path="/attractions" element={<ComingSoon/>}/>
      <Route path="/airporttaxis" element={<ComingSoon />}/>
      <Route path='/register' element={<Register/>}/>
     </Routes>
     <Footer/>
    </BrowserRouter>
  )
}

export default App;
