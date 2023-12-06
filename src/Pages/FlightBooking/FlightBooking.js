import React, { useEffect, useRef, useState } from 'react'
import './FlightBooking.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BookingSuccessModal } from '../../components/BookingSuccessModal/BookingSuccessModal'

export const FlightBooking = () => {

    const [isBookingSuccessful, setBookingSuccessful] = useState(false);

    const { state } = useLocation();

    // console.log(state);

    const navigateTo = useNavigate();

    const [formData, setFormData] = useState({
        travellerEmail: '',
        travellerNumber: '',
        cardHolderName: '',
        cardNumber: '',
        expiryDate: '',
        cvc: ''
    })

    const emailRef = useRef();
    const mobileRef = useRef();

    const [errorMessage, setErrorMessage] = useState(null);
    const [genderError, setGenderError] = useState(null);


    const userBearerToken = sessionStorage.getItem('userToken');
    const loggedInUserDetails = JSON.parse(sessionStorage.getItem('loginUserDetails'));
    // console.log(userBearerToken);

    const bookFlightTicket = async (flightDetails) => {

        const config = {
            headers: {
                Authorization: `Bearer ${userBearerToken}`,
                projectID: "jza6qqtrfilv"
            }
        }

        try {
            const response = await axios.post('https://academics.newtonschool.co/api/v1/bookingportals/booking', flightDetails, config)
            console.log(response);
            setBookingSuccessful(true);
        }
        catch (error) {
            console.log(error);
        }

    }

    function handleFlightForm(e) {
        e.preventDefault();
        console.log("Pay button triggered");


        const flightDetails = {
            bookingType: "flight",
            userId: loggedInUserDetails._id,
            bookingDetails: {
                flightId: state.flightId,
                startDate: state.startDate,
            }
        }

        bookFlightTicket(flightDetails);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage(null);


    }

    const handlePhoneNumber = (e) => {

        const { value, name } = e.target;
        const numericValue = value.replace(/[^0-9]/g, '');


        setFormData({ ...formData, [name]: numericValue });

    }

    const handleCardDetails = (e) => {
        const { name, value } = e.target;


        const digits = value.replace(/[^\d]/g, '');
        const formatCardNumber = (digits.match(/.{1,4}/g) || []).join('-').substr(0, 19);

        setFormData({ ...formData, [name]: formatCardNumber });


    }


    function handleExpiryDate(e) {
        const { name, value } = e.target;



        const digits = value.replace(/[^\d]/g, '');
        // Insert a "/" after the first 2 digits
        const formatExpiryDate = digits.replace(/(\d{2})(?=\d)/, '$1/').substr(0, 5);
        setFormData({ ...formData, [name]: formatExpiryDate });


    }

    function handleCVC(e) {

        const { name, value } = e.target;

        if (isNaN(value)) {
            return;
        }

        setFormData({ ...formData, [name]: value });
    }

    function handleNextBtn(e) {

        e.preventDefault();

        // CHECK IF USER ENTERED VALID EMAIL
        const userEmail = formData.travellerEmail;

        if (userEmail.includes('.com') || userEmail.includes('.co') || userEmail.includes('.in') || userEmail.includes('.org') || userEmail.includes('.net') || userEmail.includes('.gov') || userEmail.includes('.edu')) {
            console.log("Valid email")

        }
        else {
            console.log('error in gmail')
            setErrorMessage('Enter a valid Email');
            emailRef.current.focus();
            return
        }

        //  CHECK IF GENDER SELECTED OR NOT OF ALL TRAVELLERS
        let index = 1;
        for (let traveller of travellersDetailBox) {
            if (traveller.gender === 'Select your gender') {
                setGenderError(`Please Select Gender of Traveller ${index}`);
                return;
            }
            index++;
        }


    }

    function handleTravellerInputChange(e) {
        const { value, name, id } = e.target;
        // console.log(id, name, value);

        const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?\/\\|`~0-9]/;
        console.log(regex.test(value));

        if (regex.test(value)) {
            return;
        }

        setGenderError(null);


        setTravellersDetailBox((oldDetails) => {

            const updatedDetail = [...oldDetails];
            updatedDetail[parseInt(id)][name] = value;
            return updatedDetail;
        })

    }

    const travellerCount = sessionStorage.getItem("flightTravellersCount");
    const [travellersDetailBox, setTravellersDetailBox] = useState(null)


    useEffect(() => {
        setTravellersDetailBox(() => {
            const numberOfTravellers = Array.from({ length: parseInt(travellerCount) }, (_, index) => ({
                firstName: '',
                lastName: '',
                gender: 'Select your gender',
            }));

            return numberOfTravellers;
        });

    }, [])


    return (
        <section className='flight-booking-page parent-container'>
            <div className='child-container'>

                <div className='flight-travellers-contact-details-container'>

                    <div className='where-to-where-from'>
                        <div className='traveller-count-date-div'>
                            <li>{travellerCount} travellers</li>
                            <li>{state.day} {state.startDate.getDate()} {state.startDate.toLocaleString('default', { month: 'short' })}</li>
                        </div>
                        <h1>{state.departureCity} to {state.arrivalCity}</h1>
                    </div>

                </div> {/* delete this and uncomment below div */}

                <form onSubmit={handleNextBtn}>

                    <div className='Who-flying-container'>
                        <h2>Who's flying?</h2>

                        <div className='flight-contact-details-container'>
                            <h3>Contact details</h3>

                            <div className='flight-contact-details-input-div'>
                                <p>Contact email</p>
                                <input type="email" name='travellerEmail' value={formData.travellerEmail} onChange={handleInputChange} placeholder='Email' ref={emailRef} required />
                                {errorMessage ? <small className='error-message'>{errorMessage}</small> : <small>We'll send your flight confirmation here</small>}
                            </div>

                            <div className='flight-contact-details-input-div'>
                                <p>Phone number</p>
                                <input type="text" name='travellerNumber' value={formData.travellerNumber} onChange={handlePhoneNumber} maxLength='10' pattern='[0-9]{10}' placeholder='Enter 10-digit Phone Number' ref={mobileRef} required />
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <small>Get free SMS updates about your flight</small>
                                </div>

                            </div>
                        </div>

                    </div>


                    {/* </div> */}

                    {travellersDetailBox && travellersDetailBox.length > 0 && travellersDetailBox.map((item, index) => (

                        <div className='flight-travellers-name-container' key={index}>
                            <h3>Traveller {index + 1}</h3>

                            <div className='travellers-info'>
                                <div className='first-last-name-div'>
                                    <p>First name</p>
                                    <input type="text" name='firstName' id={index} value={item.firstName} onChange={handleTravellerInputChange} required />
                                    <small>Enter exactly what's written on this traveller's travel document</small>
                                </div>

                                <div className='first-last-name-div'>
                                    <p>Last name</p>
                                    <input type="text" name='lastName' id={index} value={item.lastName} onChange={handleTravellerInputChange} required />
                                    <small>Enter exactly what's written on this traveller's travel document</small>
                                </div>
                            </div>

                            <div className='flight-traveller-gender-div'>
                                <p>Gender specified on your travel document </p>
                                <select name="gender" id={index} onChange={handleTravellerInputChange} required>
                                    <option value="Select your gender">Select your gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>

                                </select>
                                <small>We're currently required by airlines and providers to ask for this information</small>
                            </div>

                        </div>

                    ))}

                    {genderError && <p className='error-message gender-error-msg'>{genderError}</p>}
                    <button className='same-btn flight-next-btn'>Next</button>

                </form>

                {/* <form action="" onSubmit={handleFlightForm}>
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
                                placeholder='Name On Card' required />
                        </div>

                        <div>
                            <label htmlFor="cardNumber">Card Number</label>
                            <input type="text" id='cardNumber' name='cardNumber' value={formData.cardNumber} pattern="\d{4}-\d{4}-\d{4}-\d{4}" maxLength='19' onChange={handleCardDetails} placeholder='XXXX-XXXX-XXXX-XXXX' required />


                        </div>

                        <div id='expiry-cvc-box'>
                            <div>
                                <label htmlFor="expiryDate">Expiry Date</label>
                                <input type="text" id='expiryDate' pattern='\d{2}/\d{2}' name='expiryDate' value={formData.expiryDate} onChange={handleExpiryDate} placeholder='MM/YY' maxLength='5' required />
                            </div>
                            <div>
                                <label htmlFor="cvc">CVC</label>
                                <input type="text" id='cvc' name='cvc' pattern='\d{3}' value={formData.cvc} onChange={handleCVC} maxLength='3' placeholder='XXX' required />
                            </div>
                        </div>



                        <div>
                            <input type="submit" value="Pay Now" />
                        </div>

                    </div>
                </form>
 */}


            </div>

            {isBookingSuccessful && <BookingSuccessModal />}
        </section>
    )
}
