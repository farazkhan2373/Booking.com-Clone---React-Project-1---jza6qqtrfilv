import React, { useState } from 'react'
import './FlightBooking.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BookingSuccessModal } from '../../components/BookingSuccessModal/BookingSuccessModal'

export const FlightBooking = () => {

    const [isBookingSuccessful, setBookingSuccessful] = useState(false);
    
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
        travellerName: '',
        travellerEmail: '',
        travellerNumber: '',
        country: '',
        cardHolderName: '',
        cardNumber: '',
        expiryDate: '',
        cvc: ''
    })

    const {state} = useLocation();
    console.log(state);

    const handleInputChange = (e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        
    }

    const userBearerToken = sessionStorage.getItem('userToken');
    const loggedInUserDetails = JSON.parse(sessionStorage.getItem('loginUserDetails'));
    console.log(userBearerToken);

    const bookFlightTicket = async (flightDetails)=>{

        const config ={
            headers:{
                Authorization: `Bearer ${userBearerToken}`,
                projectID: "jza6qqtrfilv"
            }
        }

        try{
            const response = await axios.post('https://academics.newtonschool.co/api/v1/bookingportals/booking', flightDetails, config )
            console.log(response);
            setBookingSuccessful(true);
        }
        catch(error){
            console.log(error);
        }

    }

    function handleFlightForm(e){
         e.preventDefault();
         console.log("Pay button triggered");

         const flightDetails = {
            bookingType: "flight",
            userId: loggedInUserDetails._id,
            bookingDetails:{
                flightId: state.flightId,
                startDate: state.startDate,
            }
         }

         bookFlightTicket(flightDetails);
    }
    return (
        <section className='flight-booking-page parent-container'>
            <div className='child-container'>
                <section className='detail-payment-section'>
                    <form action="" className='flight-payment-form' onSubmit={handleFlightForm}>

                        <div className='traveller-detail-box'>
                            <h1>Traveller Details</h1>

                            <div>
                                <label htmlFor="travellerName">Name</label>
                                <input type="text" id='travellerName' name='travellerName' value={formData.travellerName} onChange={handleInputChange} required/>
                            </div>

                            <div>
                                <label htmlFor="travellerEmail">Email</label>
                                <input type="email" name='travellerEmail' id='travellerEmail' value={formData.travellerEmail} onChange={handleInputChange} required />
                            </div>

                            <div>
                                <label htmlFor="travellerEumber">Contact Number</label>
                                
                                <input type="tel" name="travellerNumber" id="travellerNumber" pattern="[0-9]{10}" value={formData.travellerNumber} onChange={handleInputChange} required placeholder='Enter 10 digit Number'/>
                            </div>

                            <div>
                                <label htmlFor="country">Country</label>
                                <input type="text" name='country' id='country' value={formData.country} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className='payment-method-box'>

                            <div>
                                <h1>Your Payment</h1>
                                <p>Simple, safe and secure</p>
                            </div>

                            <div>
                                <p>How would you like to pay?</p>
                                <div className='payment-cards-images-container'>
                                    <img src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/discover.svg" alt="discover" />
                                    <img src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/mc.svg" alt="master-card" />
                                    <img src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/jcb.svg" alt="JCB" />
                                    <img src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/visa.svg" alt="VISA" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="cardHolderName">Cardholder's Name</label>
                                <input type="text" id='cardHolderName' name='cardHolderName' value={formData.cardHolderName} onChange={handleInputChange} required/>
                            </div>
                            
                            <div>
                                <label htmlFor="cardNumber">Card Number</label>
                                <input type="number" id='cardNumber' name='cardNumber' value={formData.cardNumber} onChange={handleInputChange} required/>  
                                
                            </div>

                            <div id='expiry-cvc-box'>
                                <div>
                                    <label htmlFor="expiryDate">Expiry Date</label>
                                    <input type="number" id='expiryDate' name='expiryDate' value={formData.expiryDate} onChange={handleInputChange} required/>
                                </div>
                                <div>
                                <label htmlFor="cvc">CVC</label>
                                    <input type="number" id='cvc' name='cvc' value={formData.cvc} onChange={handleInputChange} required/>
                                </div>
                            </div>

                        

                            <div>
                                <input type="submit" value="Pay Now"/>
                            </div>

                        </div>
                    </form>
                </section>
            </div>

            {isBookingSuccessful && <BookingSuccessModal/>}
        </section>
    )
}
