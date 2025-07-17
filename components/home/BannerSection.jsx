import React from 'react'

const bannerData={
    title:"Uncover Our Unique Journey",
    description: "Dive into our exclusive destinations and see what makes each experience with our trips exceptional."
}

const BannerSection = () => {
  return (
    <div className='container '>
        <div className='banner-section'>
<div className='banner-main d-flex flex-column justify-content-center align-items-center text-center '>
<p className='brandon-bold fs-48-32 white'>{bannerData.title}</p>
<p className='brandon-regular fs-18-9 grey-D9D text-center mt-md-20'>{bannerData.description}</p>
<button className='secondary-btn-white '>Check It Out!<span className="arrow">&#8599;</span></button>
</div>
</div>
    </div>
  )
}

export default BannerSection
