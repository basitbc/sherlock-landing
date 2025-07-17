import React from 'react'
import BlogCards from './BlogCards'

const BlogsSection = () => {
  return (
    <div className='container'>
        <div className='blogs-section'>
            <div className='blogs-main'>
            <div className='d-flex flex-column blogs-left'>
  <button className="mb-28 primary-btn">BLOGS</button>
  <p className='black fs-48-32 brandon-bold'>Explore Global Adventure and Insights</p>
 </div>

 <div className='d-flex flex-column blogs-right'>
 <p className='fs-18-9 brandon-regular grey-5A5'>Our articles cover everything from hidden gems and cultural experiences to expert travel advice and adventurous itineraries. </p>
  <p className=" black fs-20-10 brandon-medium">
    <span className="link-text">SEE ALL BLOGS</span>
    <span className="right-arrow">&#x2192;</span>
</p>
 </div>
 </div>
 <div className='blogs-card-section'>
    <BlogCards/>

 </div>
        </div>



    </div>
  )
}

export default BlogsSection
