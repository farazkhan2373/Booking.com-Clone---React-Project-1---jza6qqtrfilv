import React, { useState } from 'react'
import './FlightBooking.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BookingSuccessModal } from '../../components/BookingSuccessModal/BookingSuccessModal'

export const FlightBooking = () => {

    const [isBookingSuccessful, setBookingSuccessful] = useState(false);

    const {state} = useLocation();
    // console.log(state);
    
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


    const userBearerToken = sessionStorage.getItem('userToken');
    const loggedInUserDetails = JSON.parse(sessionStorage.getItem('loginUserDetails'));
    // console.log(userBearerToken);

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

     const handleInputChange = (e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        
    }

    const handleCardDetails = (e) =>{
        const {name, value} = e.target; 
         

         const digits = value.replace(/[^\d]/g, '');
         const formatCardNumber = (digits.match(/.{1,4}/g) || []).join('-').substr(0, 19);
     
         setFormData({ ...formData, [name]: formatCardNumber });
       

    }

    
    function handleExpiryDate(e){
        const {name, value} = e.target;

       

        const digits = value.replace(/[^\d]/g, '');
          // Insert a "/" after the first 2 digits
          const formatExpiryDate = digits.replace(/(\d{2})(?=\d)/, '$1/').substr(0, 5);
        setFormData({ ...formData, [name]: formatExpiryDate });

        
    }
    
    function handleCVC(e){
       const {name, value} = e.target;

       if(isNaN(value)){
           return;
       }

        setFormData({...formData, [name]: value});
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
                                <input type="text" id='travellerName' name='travellerName' value={formData.travellerName} onChange={handleInputChange} placeholder='Traveller Name' required/>
                            </div>

                            <div>
                                <label htmlFor="travellerEmail">Email</label>
                                <input type="email" name='travellerEmail' id='travellerEmail' value={formData.travellerEmail} onChange={handleInputChange} placeholder='Email' required />
                            </div>

                            <div>
                                <label htmlFor="travellerEumber">Contact Number</label>
                                
                                <input type="tel" name="travellerNumber" id="travellerNumber" pattern="[0-9]{10}" value={formData.travellerNumber} onChange={handleInputChange} required placeholder='Mobile Number'/>
                            </div>

                            <div>
                                <label htmlFor="country">Country</label>
                                <input type="text" name='country' id='country' value={formData.country} onChange={handleInputChange} placeholder='Country Name'  required />
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
                                <input type="text" id='cardHolderName' name='cardHolderName' value={formData.cardHolderName} onChange={handleInputChange}
                                placeholder='Name On Card' required/>
                            </div>
                            
                            <div>
                                <label htmlFor="cardNumber">Card Number</label>
                                <input type="text" id='cardNumber' name='cardNumber' value={formData.cardNumber} pattern="\d{4}-\d{4}-\d{4}-\d{4}" maxLength='19' onChange={handleCardDetails} placeholder='XXXX-XXXX-XXXX-XXXX' required/>  
                               
                                
                            </div>

                            <div id='expiry-cvc-box'>
                                <div>
                                    <label htmlFor="expiryDate">Expiry Date</label>
                                    <input type="text" id='expiryDate' pattern='\d{2}/\d{2}' name='expiryDate' value={formData.expiryDate} onChange={handleExpiryDate} placeholder='MM/YY' maxLength='5' required/>
                                </div>
                                <div>
                                <label htmlFor="cvc">CVC</label>
                                    <input type="text" id='cvc' name='cvc' pattern='\d{3}' value={formData.cvc} onChange={handleCVC} maxLength='3' placeholder='XXX' required/>
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
