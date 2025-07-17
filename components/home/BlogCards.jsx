import React from 'react'
import { blogCards } from "../../data/blogCards"; // Ensure the correct import path
import Image from 'next/image';

const BlogCards = () => {

  return (
    <div className='row d-flex flex-row align-items-center justify-content-between'>
        {blogCards?.map((blog) => (
            <div key={blog.id} className="col-12 col-lg-4 col-md-6">
                <div className="blog-card" >
                 <div className='d-flex flex-column blog-info'>
                  <div className='blog-image-wrapper'>
                    <Image className='blog-image object-fit-cover' fill src={blog.imgSrc} alt="image"/>
                    </div>
<div className='keyword text-center'>
    <span className='fs-14-7 brandon-medium'>{blog.keyword }</span>
</div>
<p className='blog-title black fs-24-12 brandon-bold'>{blog.title}</p>
<p className='fs-20-10 brandon-medium grey-5A5 mt-10'>{blog.date}</p>


                    </div>

                </div>
                </div>

        ))}

    </div>
  )
}

export default BlogCards
