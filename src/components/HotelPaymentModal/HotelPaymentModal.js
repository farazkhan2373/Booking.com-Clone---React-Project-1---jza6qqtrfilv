import React from 'react'
import './hotelpaymentmodal.css'

export const HotelPaymentModal = () => {
    return (
        <section className='hotel-payment-modal parent-container'>

            <div className='hotel-payment-box'>
                <div className='hotel-payment-content'>

                    <div className='div-1'>
                        <h2>Your Payment</h2>
                        <p>simple, safe and secure</p>
                    </div>

                    <div className='div-2'>
                        <h3>How would you like to pay?</h3>
                        <div className='atm-img-container'>
                            <img src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/discover.svg" alt="discover-card" />
                            <img src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/mc.svg" alt="master-card" />
                            <img src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/jcb.svg" alt="JCB" />
                            <img src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/visa.svg" alt="VISA" />
                        </div>
                    </div>

                    <form action="" className='hotel-payment-form'>
                        <div>
                            <label htmlFor="payment-holder-name">Card Holder's Name</label>
                            <input type="text" name="payment-holder-name" id="payment-holder-name" />
                        </div>

                        <div>
                            <label htmlFor="payment-card-number">Card Number</label>
                            <input type="number" name="payment-card-number" id="payment-card-number" />
                        </div>

                        <section>

                            <div>
                                <label htmlFor="payment-card-number">Expiry Number</label>
                                <input type="number" name="payment-card-number" id="payment-card-number" />
                            </div>
                            <div>
                                <label htmlFor="payment-card-number">CVC</label>
                                <input type="number" name="payment-card-number" id="payment-card-number" />
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
