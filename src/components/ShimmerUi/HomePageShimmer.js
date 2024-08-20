import React from 'react'
import PostShimmer from './PostShimmer'
function HomePageShimmer() {
  return (
    <div className='md:w-10/12'>
          {/* {console.log(post)} */}
          {Array(2).fill("").map((index) => ( 
            <PostShimmer key={index}></PostShimmer>
          ))}
        </div>
  )
}

export default HomePageShimmer