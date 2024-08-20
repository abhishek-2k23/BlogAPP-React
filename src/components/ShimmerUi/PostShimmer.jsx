import React from 'react'

function PostShimmer() {
  return (
    
<div class="border border-gray-200 shadow rounded-xl p-4  w-full mx-auto mb-5">
  <div class="animate-pulse flex flex-col md:flex-row space-x-16 gap-4 sm:gap-0">
    <div class="flex-2 sm:flex-1 space-y-6 py-1">
      <div class="h-2 bg-slate-200 rounded"></div>
        
        <div className='flex flex-col space-y-5 w-full'>
            <div className='w-1/4 h-2 rounded-full bg-slate-200'></div>
            <div className='w-[40%] h-2 rounded-full bg-slate-200'></div>
            <div className='w-[50%] h-2 rounded-full bg-slate-200'></div>
            <div className='w-[60%] h-2 rounded-full bg-slate-200'></div>
            <div className='w-[75%] h-2 rounded-full bg-slate-200'></div>
        </div>
      <div className='w-11/12 md:1/2 lg:w-1/5 h-10 sm:h-14 rounded-xl border-gray-800 bg-slate-200'> </div>
    </div>

    
    <div class="rounded-lg bg-slate-200 md:h-60 md:w-96 w-48 h-32 flex-1 sm:flex-2"></div>
  </div>
</div>
  )
}

export default PostShimmer