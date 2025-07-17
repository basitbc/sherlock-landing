import React from 'react'
import {benefits} from "../../data/benefits";
import Image from 'next/image';

const BenefitsCards = () => {

  return (
    <div className="row d-flex flex-row justify-content-between align-items-center">
        {benefits?.map((benefit,index)=>(

         <div key={benefit.id} className="col-12 col-xl-4">
            <div className={`benefit-cards d-flex flex-row align-items-center ${index === 1 ? 'black-card' : ''}`}>
                <Image width={48} height={48} src={benefit?.imgSrc} alt="logo" />
                <div className='d-flex flex-column ml-20'>
                    <p className='card-title brandon-bold fs-24-12 mb-2'>{benefit?.title}</p>
                    <span className='card-desc brandon-regular fs-16-8 '>{benefit?.description}</span>
                    </div>

            </div>
        </div>
        ))

        }
    </div>
  )
}

export default BenefitsCards
