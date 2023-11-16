import React, { useState } from 'react'
import './selectroom.css'
import { useLocation } from 'react-router-dom'
import { ComingSoon } from '../ComingSoon/ComingSoon'

export const SelectRooms = () => {

    const location = useLocation()
    console.log(location);

    const hotelData = location.state.hotelData;
    const userData = location.state.userDate;
    

    const [roomValues, setRoomValues] = useState(Array(userData.personCountInfo.room).fill(''));

    const handleInputChange = (index, value) => {
        // Update the state with the new value
        const updatedValues = [...roomValues];
        updatedValues[index] = value;
        setRoomValues(updatedValues);
    };

    function totalPrice(){
        console.log(roomValues);
    }


    

    return (
        <div className='parent-container'>
            <div className='child-container select-room-content'>
              
              <div className='room-inputBox-container'>
              <div className='select-room-input-box'>
                 <h2>Select Room</h2>
                 {roomValues.map((room, index)=>(
                    <div key={index} >
                        <label htmlFor={index+1}>Room Number</label>
                        <input type="number" id={index+1} name={index+1} className='room-input-bar'
                        min="1"
                        max={hotelData.rooms.length}
                        value={room}
                        onChange={(e) => handleInputChange(index, e.target.value)}/>
                    </div>
                 ))}

                 <button className='white-btn' onClick={totalPrice}>Get Total Price</button>
              </div>
              </div>

                <div className='room-details'>
                    <h1>Rooms in Hotel {hotelData.name}</h1>

                    <div className='hotel-room-card-container'>

                        {
                            hotelData.rooms.map((room, index) => (
                                <article key={index} className='hotel-room-card'>
                                    <h3>Room Number {index + 1}</h3>
                                    <p>Room Type: {room.roomType}</p>
                                    <p>Bed details: {room.bedDetail}</p>
                                    <p>Room Size: {room.roomSize}</p>
                                    <h4>&#8377; {room.price}</h4>
                                </article>
                            ))
                        }

                    </div>
                </div>


            </div>
        </div>
    )
}
