import React from 'react'
import Location from "../../public/assets/images/package-details-section/location.svg"
import Duration from "../../public/assets/images/package-details-section/duration.svg"
import Ratings from "../../public/assets/images/package-details-section/ratings.svg"
import ShareIcon from "../../public/assets/images/package-details-section/share-icon.svg"
import LikeIcon from "../../public/assets/images/package-details-section/like-icon.svg"
import Image from 'next/image'

const PackageHeading = ({title,location,duration,rating}) => {
  return (
    <div className='container'>
        <div className='package-heading d-flex flex-row justify-content-between w-100'>
          <div>
          <p className='brandson-bold fs-48-32 black'>{title}</p>
          <div className='d-flex flex-row gap-5'>
       <p className='d-flex align-items-center gap-3'>
        <Image src={Location}/>
        <span className='brandson-medium fs-20-10 black'>{location}</span>
       </p>
       <p className='d-flex align-items-center gap-3'>
        <Image src={Duration}/>
        <span className='brandson-medium fs-20-10 black'>{duration}</span>
       </p>
       <p className='d-flex align-items-center gap-3'>
        <Image src={Ratings}/>
        <span className='brandson-medium fs-20-10 black'>{rating}</span>
       </p>
          </div>
          </div>
          <div className='d-flex flex-row justify-content-end gap-4'>
          <p className='buttons d-flex gap-3'>
<span className='brandson-medium fs-18-9 black'>Share</span>
<Image src={ShareIcon} alt="icon"/>
          </p>
          <p className='buttons d-flex gap-3'>
<span className='brandson-medium fs-18-9 black'>Favorite</span>
<Image src={LikeIcon} alt="icon"/>
          </p>
          </div>
        </div>

    </div>
  )
}

export default PackageHeading
