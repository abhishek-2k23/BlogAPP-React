import React from "react"

function SinglePostShimmer() {
  return (
    <div class="shadow-sm rounded-md p-4  w-10/12 mx-auto">
      <div className="animate-pulse w-full flex">
        {/* left  */}
        <div className="w-3/4  ">
          {/* image banner */}
          <div>
            <div class="h-44 w-11/12  bg-slate-200 rounded-lg"></div>
          </div>

          {/* user info  */}
          <div className="flex gap-5 w-2/3 h-14 items-center">
            <div className="w-10 h-10 rounded-full bg-slate-200"></div>
            <div className="flex-col items-center space-y-3">
              <div className="w-10 h-2 rounded-full bg-slate-200"></div>
              <div className="w-24 h-2 rounded-full bg-slate-200"></div>
            </div>
          </div>

          {/* post info  */}
          <div>
            {/* post header  */}
            <div className="w-[75%] h-2 rounded-full bg-slate-200 mb-5"></div>

            {/* post description  */}
            <div className="flex flex-col space-y-5 w-full">
              <div className="w-1/4 h-2 rounded-full bg-slate-200"></div>
              <div className="w-[40%] h-2 rounded-full bg-slate-200"></div>
              <div className="w-[50%] h-2 rounded-full bg-slate-200"></div>
              <div className="w-[60%] h-2 rounded-full bg-slate-200"></div>
              <div className="w-[75%] h-2 rounded-full bg-slate-200"></div>
            </div>
          </div>

          <div className="w-10/12 md:1/2 lg:w-[15%] h-10 sm:h-14 mt-5 rounded-md border-gray-800 bg-slate-200">
            {" "}
          </div>
        </div>

        {/* right */}
        <div className="w-1/4 hidden md:block  space-y-4">
          {/* heading */}
          <div>
            <div className="w-[75%] h-2 rounded-full bg-slate-200"></div>
          </div>
          {Array(2)
            .fill("")
            .map((index) => {
              return (
                <div className="space-y-2">
                  {" "}
                  {/* image */}
                  <div class="h-44 w-10/12 bg-slate-200 rounded"></div>
                  {/* post title */}
                  <div class="h-2 w-1/3 bg-slate-300 rounded "></div>
                  {/* read more button  */}
                  <div className="w-1/4 h-12 rounded-lg border border-gray-50 bg-slate-300"></div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default SinglePostShimmer
