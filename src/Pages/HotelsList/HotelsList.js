import React, { useEffect, useState } from 'react'
import './hotelslist.css'
import { useLocation } from 'react-router-dom'
import { format, max } from 'date-fns';
import { HotelsListSearchBox } from '../../components/HotelsListComponents/HotelsListSearchBox/HotelsListSearchBox';
import axios from 'axios';

export const HotelsList = () => {

  const location = useLocation();


  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [personCountInfo, setPersonCountInfo] = useState(location.state.personCountInfo);

  const [hotelsData, setHotelsData] = useState([]);

  const fetchHotelsData = async (location)=>{
    const config = {
      headers: {
        projectID: "jza6qqtrfilv"
      }
    }
    try{
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location}"}`, config)
        console.log(response.data.data.hotels);
        setHotelsData(response.data.data.hotels)
    } catch(error){
        console.log("error", error)
    }
  }

  useEffect(() => {

    fetchHotelsData(destination)
    // const config = {
    //   headers: {
    //     projectID: "jza6qqtrfilv"
    //   }
    // }

    // axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${destination}"}`, config)
    //   .then((response) => {
    //     console.log(response.data.data.hotels);
    //     setHotelsData(response.data.data.hotels);
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

  }, [])


  return (
    <section className='hotels-list-page parent-container'>
      <div className='hotels-list-container child-container'>

        <div className='hotels-list-content'>

          {/* HOTELS LIST SEARCH BOX COMPONENT */}
          <HotelsListSearchBox destination={destination}
            setDestination={setDestination}
            date={date} setDate={setDate}
            personCountInfo={personCountInfo} setPersonCountInfo={setPersonCountInfo}
            fetchHotelsData={fetchHotelsData} />


          <div className='hotels-list-div'>
            
            {hotelsData.length > 0 ? hotelsData.map((hotel)=>(

             <div className='hotel-list-cards' key={hotel._id}>

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
                    {hotel.amenities.map((facility, index)=>(
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
                    <h2>rs {hotel.rooms[0].price}</h2>
                    <p>include Taxes and fees</p>
                    <button>See Availability</button>
                  </div>
                </div>

              </div>

            </div> 
            )) : <h1>No Results Found!</h1>
            }


          </div>
        </div>
      </div>

    </section>
  )
}
