import React from 'react'
import ExploreImage from "../../public/assets/images/trips-section/card-image-one.jpg"
import Image from 'next/image'

const ExploreTrips = () => {
  return (
    <div className=' container'>
        <div className='explore-trips'>
            <div className=''>
         <Image className='explore-image' src={ExploreImage} alt="image"/>
            </div>
            <div className=' explore-content d-flex flex-column justify-content-center'>
              <h4 className='brandon-bold fs-48-32 black mb-4'>Crafting Unforgettable Travel Journeys</h4>
              <span className='brandon-regular fs-18-9 grey-5A5'>We specialize in crafting unforgettable journeys that go beyond the ordinary. Dedicated to delivering luxury and personalized experiences, our travel experts curate exclusive rips to the world’s most stunning destinations.</span>
              <button className='primary-btn align-self-center'>Explore Trips <span className="arrow mt-1">&#8599;</span></button>
            </div>

        </div>

    </div>
  )
}

export default ExploreTrips
