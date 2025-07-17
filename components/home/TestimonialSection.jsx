import React from 'react'
import TestimonialCards from './TestimonialCards'

const TestimonialSection = () => {
  return (
    <div className='container'>
     <div className='testimonial-section d-flex flex-column align-items-center'>
                <button className='primary-btn testimonial-btn mb-28'>TESTIMONIALS</button>
                <p className='brandon-bold fs-48-32 black mb-16 text-center'>Real Stories From Travelers</p>
                <p className='testimonial-desc brandon-regular fs-18-9 grey-5A5 text-center '>Our clients' experiences speak volumes about the quality and dedication of Ryovel. Read on to discover why so many travelers choose Ryovel for their global explorations and let their stories inspire your next adventure.</p>
                <div className='testimonial-card-section'>
                    <TestimonialCards/>
                </div>
               </div>

    </div>
  )
}

export default TestimonialSection
