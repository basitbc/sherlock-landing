import React from 'react'
import BenefitsCards from './BenefitsCards'

const BenefitsSection = () => {
    return (
        <div className='benefits-section'>
            <div className='container d-flex flex-column align-items-center'>
                <button className='primary-btn benefit-btn mb-28'> BENEFITS</button>
                <p className='brandon-bold fs-48-32 black mb-16 text-center'>The Perks of Traveling with Us</p>
                <p className='benefit-desc brandon-regular fs-18-9 grey-5A5 text-center '>At Ryovel, we prioritize your travel experience. With expertly curated itineraries, personalized service, and a passion for adventure, we ensure every journey is unforgettable. </p>
                <div className='benefit-card-section'>
                    <BenefitsCards />
                </div>
                <button className='primary-btn checkout'>Check It Out! <span className="arrow">&#8599;</span></button>



            </div>

        </div>
    )
}

export default BenefitsSection
