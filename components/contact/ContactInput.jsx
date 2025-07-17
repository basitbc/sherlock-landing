import React from 'react'
import {contact} from "../../data/contactUs"
import Image from 'next/image';


const ContactInput = () => {
  return (
    <div className='container'>
        <div className=' contact-input'>
            <div className='contact-left'>
              <input className='brandon-medium fs-18-9 grey-5A5 input-field' placeholder='Name'></input>
              <input className='brandon-medium fs-18-9 grey-5A5 input-field' placeholder='Email'></input>
              <textarea
  className='brandon-medium fs-18-9 grey-5A5 input-field message-box'
  placeholder='Message'
/>
</div>

<div className='contact-right'>
  {contact?.map((c) => {
    return (
      <div className='contact-details d-flex flex-row' key={c.title}>
        <Image width={48} height={48} src={c.imgSrc} alt="icon" />
        <div className='d-flex flex-column'>
          <p className='brandon-bold fs-20-10 black'>{c.title}</p>
          <span className='brandon-regular fs-16-8 grey-5A5'>{c.detail}</span>
        </div>
      </div>
    );
  })}
</div>


        </div>

    </div>
  )
}

export default ContactInput
