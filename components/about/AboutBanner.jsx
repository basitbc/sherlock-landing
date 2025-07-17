import React from 'react'
import Banner from '../common/Banner'
const aboutData={
    imgSrc:"",
    title : "About Company"
}

const AboutBanner = () => {
  return (
    <div>
      <Banner imgSrc={aboutData.imgSrc} title={aboutData.title}/>
    </div>
  )
}

export default AboutBanner
