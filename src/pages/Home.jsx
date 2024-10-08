import Loading from "./Loading";
import PostDesign from "../components/PostDesign";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import HomePageShimer from '../components/ShimmerUi/HomePageShimmer';
const Home = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const cat = useLocation().search;
  const postRef = useRef();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // console.log("cat", cat);
        const res = await axios.get(`${process.env.REACT_APP_BackEndURL}post${cat}`);
        // console.log("res : ",res)
        setPost(res.data.data);
        postRef.current = res.data;
        setLoading(false);
      } catch (err) {
        setLoading(false);
        // console.log(err);
        toast.error(err?.response?.statusText);
      }
    };
    fetchPosts();
  }, [cat]);

  return (
    <div className=" flex justify-center px-3 md:px-2 lg:px-0">
      {loading ? (
        <HomePageShimer />
      ) : post.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-[65vh] max-h-screen">
          <div className="font-bold text-lg">No Post Available</div>
          <div className="underline font-semibold text-lg text-green-800 cursor-pointer"><Link to="/write">Write</Link></div>{" "}
        </div>
      ) : (
        <div className={`lg:w-10/12 sm:px-0 px-3 md:px-0  space-y-12 flex flex-col h-auto min-h-[75vh] `}>
          {/* {console.log(post)} */}
          {post && post.map((post) => (
            <PostDesign post={post} key={post._id}></PostDesign>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
