import React from 'react'
import ImageOne from "../../public/assets/images/package-details-section/image-one.png"
import Image from 'next/image'

const PackageImages = ({ images }) => {
  return (
    <div className='package-detail-images'>
      {images?.map((i, index) => (
        <div className='package-image-container d-flex flex-row gap-4'>
        <div className='left-image-container' key={index}>
          <Image src={ImageOne} alt="image" className='img-fluid left-image' />
        </div>
        <div className='right-image-container d-flex flex-column justify-content-between ' key={index}>
          <Image src={ImageOne} alt="image" className='img-fluid right-image' />
          <Image src={ImageOne} alt="image" className='img-fluid right-image' />

        </div>
        </div>
      ))}
    </div>
  )
}

export default PackageImages
