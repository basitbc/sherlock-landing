import Image from 'next/image'
import React from 'react'
import Logo from "../../public/assets/images/logo/company-logo.png"
import FacebookIcon from "../../public/assets/images/footer-section/facebook-icon.svg"
import InstagramIcon from "../../public/assets/images/footer-section/instagram-icon.svg"
import TwitterIcon from "../../public/assets/images/footer-section/twitter-icon.svg"
import ContactIcon from "../../public/assets/images/footer-section/contact.svg"
import MailIcon from "../../public/assets/images/footer-section/mail.svg"
import AddressIcon from "../../public/assets/images/footer-section/address.svg"
import Link from 'next/link'

const Footer = () => {
  return (

      <div className='footer-section'>
<div className='d-flex flex-row justify-content-between mb-40 align-items-center'>
  <Image className="company-logo" width={140} height={40} src={Logo} alt="logo"/>
  <div className='d-flex flex-row gap-40 footer-logo'>
  <Image className='logo' width={40} height={40} src={FacebookIcon} alt="logo"/>
  <Image className='logo' width={40} height={40} src={InstagramIcon} alt="logo"/>
  <Image className='logo' width={40} height={40} src={TwitterIcon} alt="logo"/>
 </div>
</div>

<div className='row  footer-details '>
<div className='col-lg-12 col-xl-5 d-flex flex-column'>
<p className='brandon-bold fs-24-12 white mb-20'>Join Our Newsletter!</p>
<div className='input-group mb-4'>
<input className='form-control' type='text' placeholder='Your Email'/>
</div>

</div>
<div className='footer-data mt-5 mt-xl-0 justify-content-between justify-content-xl-start'>
<div className='col-xl-2 col-lg-4'>
<label className='brandon-bold fs-20-10 white mb-12'>Discover</label>
<ul className="footer-links brandon-regular fs-16-8 grey-D9D ">
                <li>
                  {" "}
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/work">Packages</Link>
                </li>
                <li>
                  <Link href="/about">Blogs</Link>
                </li>
                <li>
                  <Link href="/blogs">About</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
</div>
<div className='col-xl-2 col-lg-4 d-flex flex-column'>
<label className='brandon-bold fs-20-10 white mb-12'>Support</label>
<ul className="footer-links brandon-regular fs-16-8 grey-D9D ">
                <li>
                  {" "}
                  <Link href="/">Customer Service</Link>
                </li>
                <li>
                  <Link href="/work">Terms & Condition</Link>
                </li>
                <li>
                  <Link href="/about">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/blogs">Refund Policy</Link>
                </li>
                <li>
                  <Link href="/contact">Travel Policy</Link>
                </li>
              </ul>
</div>
<div className='col-xl-3 col-lg-4 d-flex flex-column'>
<label className='brandon-bold fs-20-10 white mb-12'>Contact</label>
<div className='d-flex flex-row contact-details'>
<Image  src={ContactIcon} alt="Contact" />

                    <p className="brandon-regular fs-16-8 grey-D9D  contact-num">
                      <a href="tel:+919797009339">+91 9797009339</a>
                    </p>
</div>
<div className='d-flex flex-row contact-details'>
<Image  src={MailIcon} alt="Mail" />

                    <p className="brandon-regular fs-16-8 grey-D9D contact-num">
                    <a href="mailto:sherlocktravels@gmail.com">
                    sherlocktravels@gmail.com
                  </a>
                    </p>
</div>
<div className='d-flex flex-row contact-details'>
<Image  src={AddressIcon} alt="Address" />

                    <p className="brandon-regular fs-16-8 grey-D9D contact-num">
                      Habba Kadal Srinagar,Jammu and Kashmir
                    </p>
</div>

</div>
</div>
</div>
<hr className='horizontal-line '/>
<div className='d-flex justify-content-center'>

<p className='fs-12-6 brandon-medium white'>ⓒ Copyright 2025</p>
</div>
      </div>


  )
}

export default Footer
