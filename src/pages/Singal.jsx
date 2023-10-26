import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, Link} from "react-router-dom";
import Menu from "../components/Menu";
import {PiUserCircleDuotone} from "react-icons/pi";
import {MdDeleteForever} from "react-icons/md";
import {BiEdit} from "react-icons/bi";
import Loading from "./Loading";
import DOMPurify from "dompurify";
import {toast} from "react-hot-toast";
import moment from "moment";
import {AuthContext} from "../context/authContext";

const Singal = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const [loading,setLoading] = useState(false);

  const {currentUser} = useContext(AuthContext);
  //to fetch the posts
  useEffect(() => {
    //fetch post with post id
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_BackEndURL}post/${postId}`);
        setPost(res.data.data);
        // setTimeout(() => {
        //   setLoading(false);
        // }, 100);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    //call the function
    fetchPosts();
  }, [postId]);

  //to set HTML content in the UI
  const htmlDesc = DOMPurify.sanitize(post?.desc);
  // console.log("Post : ", post);

  //to delete the posts
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BackEndURL}post/${postId}`);
      console.log(res);
      toast.success("Deleted successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex  justify-center min-h-screen mt-5">
      {
        loading ? (<Loading></Loading>) : (
          <div className="md:w-10/12 px-2 md:px-0  flex gap-10 flex-col md:flex-row">
            <div className="basis-3/4">
              {/* image */}
              <div className=''>
                <img src={`${post?.img}`} alt="postImage" className="md:min-h-60  max-h-72 w-full object-cover"/>
              </div>
              {/* user */}
              <div className="flex items-center gap-3 my-5 capitalize">  
                  <div className="w-10 h-10 flex justify-center items-center text-5xl ">
                    <PiUserCircleDuotone></PiUserCircleDuotone>
                  </div>
                  <div>
                    <p className="text-base font-semibold font-mono">{post?.name}</p>
                    <p className="italic underline text-sm">Posted {moment(post?.date).fromNow()}</p>
                  </div>
                  {
                    post?.name === currentUser?.name &&
                  
                  <div className="flex gap-1">
                  <span className="order-2 rounded-full border border-red-400 w-7 h-7 flex justify-center items-center text-red-400 hover:text-white hover:bg-red-500 ">
                    <MdDeleteForever className=" text-xl" onClick={handleDelete}></MdDeleteForever>
                  </span>
                  <span className="rounded-full border border-green-400 w-7 h-7 flex justify-center items-center text-green-400 hover:text-white hover:bg-green-500 ">
                    <Link to={`/write?edit=${post?._id}`} state ={post}>
                    <BiEdit className="text-xl "></BiEdit></Link>
                  </span>
                  </div>
                  }
                  
              </div>
              <div>
                {/* content */}
                <div className="capitalize text-lg md:text-2xl font-bold">
                  {/* title */}
                  <h1>{post?.title}</h1>
                </div>
                <div className="leading-8 text-justify text-base text-gray-700 mt-5 md:text-xl">
                  {/* description */}
                  {/* <p>{post?.desc}</p> */}
                  <div dangerouslySetInnerHTML={{ __html: htmlDesc }} />
                </div>
              </div>
            </div>
            <div className="basis-1/4 w-full"><Menu cat={post?.cat}></Menu></div>
            {/* {console.log(post.category)} */}
          </div>
    )
    }
    </div>
  );
  
}

export default Singal;
