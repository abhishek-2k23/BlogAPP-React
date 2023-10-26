import React from "react";
import DOMPurify from "dompurify";
import {Link,useNavigate} from "react-router-dom";

const PostDesign = ({ post }) => {
  // const getText = (html) =>{
  //     const doc = new DOMParser().parseFromString(html,"text/html");
  //     return doc.body.textContent;
  // }
  const htmlDesc = DOMPurify.sanitize(post.desc);

  const navigate = useNavigate();
  return (
    <div className={`w-full flex lg:flex-row flex-col  order-2 justify-between mt-10 lg:p-5 p-1 border border-slate-400 shadow-lg gap-y-5 lg:gap-y-0`}>

      <div className={`content flex flex-col justify-between ${post.img ? "lg:w-8/12" : "lg:w-full"} h-auto lg:order-1 order-2 px-1 md:px-0`}>

        {/* post title */}
        <div className="mb-2" >
          <Link to={`post/${post._id}`}>
          <h1 className="lg:text-2xl text-lg font-bold capitalize">{post.title}</h1></Link>
        </div>

          {/* post description */}
        <div className="lg:w-3/4 text-justify">
          <div dangerouslySetInnerHTML={{ __html: htmlDesc }} />
        </div>

        {/* button */}
        <div className="mt-5 mb-3 lg:mb-0">
          <button className="p-2 border border-green-400 text-green-500 hover:bg-green-400 hover:text-white hover:border-gray-200" onClick={() => {navigate(`/post/${post._id}`)}}>Read More</button>
        </div>
      </div>

        {/* image */}
      <div className={`lg:w-4/12 flex justify-center ${post.img ? "items-stretch" : "items-center"} order-1 lg:order-2`}>
        {
          !(post.img === " ") ? <img src={`${post?.img}`} alt="pic" width={"100%"}  className="shadow-xl border-green-300 object-cover"/> : <p>No image</p>
        }
      </div>
    </div>
  );
};

export default PostDesign;
