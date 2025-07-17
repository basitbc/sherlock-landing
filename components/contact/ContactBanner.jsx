import React from 'react'
import Banner from '../common/Banner'
const contactData={
    imgSrc:"",
    title : "Contact Us "
}

const ContactBanner = () => {
  return (
    <div>
      <Banner imgSrc={contactData.imgSrc} title={contactData.title}/>
    </div>
  )
}

export default ContactBanner

