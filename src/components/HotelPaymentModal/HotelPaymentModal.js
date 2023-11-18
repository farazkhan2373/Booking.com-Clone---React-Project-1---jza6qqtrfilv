import React from 'react'
import './hotelpaymentmodal.css'




export const HotelPaymentModal = ({ setHotelPaymentModal, userData, hotelData, roomValues, totalAmmount }) => {

    console.log("userData", userData);
    console.log("hotelData", hotelData);
    console.log("roomValues", roomValues);
    console.log("totalAmmount", totalAmmount);


    function handleHotelPayment(e) {
        e.preventDefault();

    }

    function convertDate(date){
        const options = {day: 'numeric', month: 'short', year: 'numeric'};
        let readableDate = date.toLocaleString('en-IN', options);
        return readableDate;

    }

    


    return (
        <section className='hotel-payment-modal parent-container'>

            <div className='hotel-payment-box'>
                <div className='hotel-payment-content'>

                    <div className='hotel-final-details'>

                        <div>
                            <h4>Hotel {hotelData.name}</h4>
                            <p>{hotelData.location}</p>
                            <p>Room Number: {roomValues.join(', ')}</p>
                        </div>

                        <div>
                            <h4>Guest Details</h4>
                            <div className='guest-list'>
                                <li>{userData.personCountInfo.adult} Adult</li>
                                <li>{userData.personCountInfo.children} Children</li>
                            </div>
                        </div>

                        <div>
                            <h4>Check In & Check Out Date</h4>
                            <p>{convertDate(userData.date[0].startDate)} to {convertDate(userData.date[0].endDate)}</p>
                        </div>

                        <div>
                            <h5>Total &#8377; {totalAmmount.toLocaleString('en-IN')}</h5>
                        </div>
                    </div>

                    <button className='x-button'
                        onClick={() => setHotelPaymentModal(false)}>x</button>

                    <div className='div-1'>
                        <h2>Your Payment</h2>
                        <p>simple, safe and secure</p>
                    </div>

                    <div className='div-2'>
                        <p>How would you like to pay?</p>
                        <div className='atm-img-container'>
                            <img src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/discover.svg" alt="discover-card" />
                            <img src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/mc.svg" alt="master-card" />
                            <img src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/jcb.svg" alt="JCB" />
                            <img src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/visa.svg" alt="VISA" />
                        </div>
                    </div>

                    <form action="" className='hotel-payment-form' onSubmit={handleHotelPayment}>
                        <div>
                            <label htmlFor="payment-holder-name">Card Holder's Name</label>
                            <input type="text" name="payment-holder-name" id="payment-holder-name" required />
                        </div>

                        <div>
                            <label htmlFor="payment-card-number">Card Number</label>
                            <input type="number" name="payment-card-number" id="payment-card-number" required />
                        </div>

                        <section>

                            <div>
                                <label htmlFor="expiry-num">Expiry Number</label>
                                <input type="number" name="expiry-num" id="expiry-num" required />
                            </div>
                            <div>
                                <label htmlFor="hpay-cvc">CVC</label>
                                <input type="number" name="hpay-cvc" id="hpay-cvc" required />
                            </div>

                        </section>

                        <div>
                            <button className='blue-btn'>Pay Now</button>
                        </div>
                    </form>
                </div>
            </div>

        </section>
    )
}
