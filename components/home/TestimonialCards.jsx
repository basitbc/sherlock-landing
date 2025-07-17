import React from 'react'
import {testimonials} from "../../data/testimonials";
import Image from 'next/image';
import Star from "../../public/assets/images/testimonial-section/star-filled.svg"

const TestimonialCards = () => {
  return (
    <div className="row d-flex flex-row justify-content-between align-items-center">
            {testimonials?.map((testimonial,index)=>(

             <div key={testimonial.id} className="col-12 col-xl-4">
                <div className={`testimonial-cards d-flex flex-column `}>
                <span className='card-desc brandon-regular fs-16-8 grey-5A5 '>{testimonial?.description}</span>
                    <div className='d-flex flex-row justify-content-between mt-4 align-items-center'>
                        <div className='d-flex flex-row align-items-center gap-2'>
                 <Image width={48} height={48} src={testimonial?.imgSrc} alt="logo"/>
                 <div className='d-flex flex-column'>
                        <p className='card-title brandon-bold fs-20-10 mb-2'>{testimonial?.title}</p>
                        <p className='card-subtitle brandon-medium fs-14-7 grey-838 mb-2'>{testimonial?.subTitle}</p>

                        </div>
                        </div>
                        <div className='d-flex flex-row gap-2 align-items-center'>
                        <Image src={Star} alt="icon"/>
                        <span className='brandon-medium fs-18-9 black'>{testimonial.rating}</span>
                        </div>
                        </div>

                </div>
            </div>
            ))

            }
        </div>
  )
}

export default TestimonialCards
