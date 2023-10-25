import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../pages/Loading';

const Menu = ({cat}) => {
    const [posts, setPosts] = useState([]);
    console.log(typeof(posts));
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    //to fetch the posts
  useEffect(() =>{
    const fetchPosts = async () =>{
      try{
        setLoading(true);

        //fetching and setting the post to state
        const res = await axios.get(`${process.env.REACT_APP_BackEndURL}/post/?cat=${cat}`);
        setPosts(res.data.data);

        //loading will set to false after 1sec
        setTimeout(() => {
          setLoading(false);
        }, 1000);

      }catch(err){
        console.log(err);
      }
  }
    fetchPosts();
  },[cat]);

  console.log("Posts : ",posts)
  return (
    <div className='md:flex hidden justify-center'>
      <div className='w-full flex flex-col gap-5'>
        {/* Heading */}
        <h1 className='text-xl font-bold text-center'>Other Posts You May Like</h1>
        {console.log(typeof(posts))}
        {
          loading ? <Loading></Loading> :
          posts.map((post) => (
            <div className='flex flex-col my-3 gap-2 overflow-auto' key={post._id}>
              {/* image */}
              <div>
                <img src={post?.img} alt="pic" />
              </div>
              {/* title */}
              <div className='text-xl font-bold'>
                {post?.title}
              </div>
              {/* button */}
              <div className="mt-2 mb-3 md:mb-0">
          <button className="p-2 border border-green-400 transition-all duration-300 text-green-500 hover:bg-green-400 hover:text-black hover:border-gray-200" onClick={() => navigate(`${process.env.REACT_APP_BackEndURL}/post/${post?._id}`)}>Read More</button>
        </div>
            </div>
          ))
        } 
      </div>
    </div>
  )
}

export default Menu