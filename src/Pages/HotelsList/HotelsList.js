import React, { useEffect, useState } from 'react'
import './hotelslist.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { format, max } from 'date-fns';
import { HotelsListSearchBox } from '../../components/HotelsListComponents/HotelsListSearchBox/HotelsListSearchBox';
import axios from 'axios';

export const HotelsList = () => {

  const location = useLocation();


  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [personCountInfo, setPersonCountInfo] = useState(location.state.personCountInfo);

  const [hotelsData, setHotelsData] = useState(null);

  const [hotelHeading, setHotelHeading] = useState(destination);

  const navigateTo = useNavigate()

  const fetchHotelsData = async (location) => {
    const config = {
      headers: {
        projectID: "jza6qqtrfilv"
      }
    }
    try {
      const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location}"}`, config)
      console.log("Hotels List", response.data.data.hotels);
      setHotelsData(response.data.data.hotels)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    fetchHotelsData(destination)

  }, [])

  function handleLowestPrice(){

  }

  function handleHighestPrice(){

  }

  function handleRatings(){
    
    const allHotelsRating = hotelsData.map((hotel)=>{
      return hotel.rating;
    })
    const sortedRatings = allHotelsRating.sort();
    sortedRatings.reverse(); // it will reverse the array
    console.log(sortedRatings)

    const highestRatingHotels = [];

    for (let rating of sortedRatings) {
      for (let data of hotelsData) {
        if(data.rating === rating){

          // --------A check for same data-------------------
          if (highestRatingHotels.length > 0) {
            let sameData = false;
           for(let newHotel of highestRatingHotels){
             if(newHotel._id === data._id){
               sameData = true;
               break;
             }
           }
           if(sameData){
             continue;
           }
         }
        //  -------------------------------------------------

         highestRatingHotels.push(data);
         break;
        }
      }
    }

    console.log("Top Rated", highestRatingHotels)
    setHotelsData(null);
    setTimeout(()=>{
      setHotelsData(highestRatingHotels);
    }, 1000)
    


}



  return (
    <section className='hotels-list-page parent-container'>
      <div className='hotels-list-container child-container'>

        <div className='hotels-list-content'>

          {/* HOTELS LIST SEARCH BOX COMPONENT */}
          <HotelsListSearchBox destination={destination}
            setDestination={setDestination}
            date={date} setDate={setDate}
            personCountInfo={personCountInfo} setPersonCountInfo={setPersonCountInfo}
            fetchHotelsData={fetchHotelsData}
            setHotelHeading={setHotelHeading} />
           
           

          <div className='hotels-list-div'>

            {hotelsData && hotelsData.length > 0 && <h1>Hotels List</h1>}

            {hotelsData && hotelsData.length > 0 && <div className='hotelList-button-container'> 
            <button className='hotel-sorting-btn' onClick={handleLowestPrice}>Lowest Price</button>
            <button className='hotel-sorting-btn' onClick={handleHighestPrice}>Highest Price</button>
            <button className='hotel-sorting-btn' onClick={handleRatings}>Top Rated</button>
           </div>}

            {hotelsData ? hotelsData.length > 0 ? hotelsData.map((hotel) => (

              <article className='hotel-list-cards' key={hotel._id}>

                {/* HOTEL IMAGE */}
                <div className='hotels-list-img-div'>
                  <img src={hotel.images[0]} alt="hotel image" />
                </div>

                <div className='details-price-div'>
                  {/* HOTELS DETAILS */}
                  <div className='hotel-list-details-div'>
                    <h2>{hotel.name}</h2>
                    <p>{hotel.location}</p>
                    <span className='airport-taxi'>Free airport taxi</span>
                    <p className='bed-detail'>{hotel.rooms[0].bedDetail}</p>
                    <ul className='amenities-list'>
                      {hotel.amenities.map((facility, index) => (
                        <li key={index}>{facility}</li>
                      ))}
                    </ul>
                    <p className='green-para'>Free Cancellation</p>
                    <p className='green-para'>{hotel.rooms[0].cancellationPolicy}</p>
                  </div>
                  {/* HOTEL RATING AND PRICE */}
                  <div className='ratings-price-div'>
                    <div className='hotels-rating'>
                      <p>Ratings</p>
                      <p className='rating-para'>{hotel.rating}</p>
                    </div>
                    <div className='hotels-price'>
                      <h2>&#8377; {hotel.rooms[0].price.toLocaleString('en-IN')}</h2>
                      <p>include Taxes and fees</p>
                      <button onClick={() => {
                        navigateTo(`/hotels/${hotel._id}`, { state: { destination, date, personCountInfo } })
                      }}>See Availability</button>
                    </div>
                  </div>

                </div>

              </article>
            )) : <h1>Try different Search</h1> : <h1>Loading...</h1>
            }


          </div>
        </div>
      </div>

    </section>
  )
}
