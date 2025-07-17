import React from 'react'

const ContactMap = () => {
  return (
    <div className='container'>
        <div className='contact-map-section d-flex flex-column text-center'>
            <p className='brandon-bold fs-48-32 black'>Find Us on Maps</p>
            <span className='brandon-regular fs-18-9 grey-5A5'>Find us on maps to visit our office and start your journey with us today. Let our team bring yur dream destinations within reach.</span>
            <div className='contact-map-area'>
            <iframe
    title="Habba Kadal Srinagar,Jammu and Kashmir"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.8816315587935!2d74.79333577527605!3d34.076401517560624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1854cb9d2ef01%3A0x43ffdbeb6d3fc0f3!2sHabba%20Kadal%2C%20Srinagar%20190001%2C%20Jammu%20and%20Kashmir!5e0!3m2!1sen!2sin!4v1712475247930!5m2!1sen!2sin"
    width="100%"
    height="400"
    style={{ border: 0, borderRadius: '20px' }}
    allowFullScreen=""
    loading="lazy"
  ></iframe>
            </div>
        </div>

    </div>
  )
}

export default ContactMap
