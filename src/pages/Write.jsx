import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

const Write = () => {
  const state = useLocation().state;
  const [value, setvalue] = useState(state?.desc || " ");
  const [title, setTitle] = useState(state?.title || " ");
  const [cat, setCat] = useState(state?.cat || " ");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  //to handle the image upload
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${process.env.REACT_APP_BackEndURL}/upload`, formData);
      console.log(res);
      return res.data;
    } catch (err) {
      console.log("Error during fileUpload : ", err.message);
    }
  };
  //sending the new blog
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const imgUrl = await upload();
      state
        ? await axios.put(`${process.env.REACT_APP_BackEndURL}/post/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`${process.env.REACT_APP_BackEndURL}/post/addPost`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : " ",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="my-10 flex justify-center box-border px-2 md:p-0">
      <div className="flex md:flex-row flex-col md:w-10/12 justify-evenly gap-20 md:gap-0 ">
        <div className="content-writing md:w-9/12 w-auto ">
          <input
            type="text"
            placeholder="Title"
            className="mb-4 w-full border border-gray-400 py-2 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="contailer ">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setvalue}
              className="h-[21rem]"
            ></ReactQuill>
          </div>
        </div>
        <div className="menu flex flex-col md:w-3/12 md:ml-2 gap-2">
          <div className="w-full border border-gray-400 p-3 flex flex-col gap-2">
            <h1 className="font-semibold text-xl ">Publish</h1>
            <p className="text-lg font-semibold">
              Status :{" "}
              <span className="underline font-thin text-sm">Draft</span>
            </p>
            <p className="text-lg font-semibold">
              Visiblity : <span className="font-thin text-sm">Public</span>
            </p>

            <input
              type="file"
              id="file"
              name="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file" className="underline italic text-sm">
              Image Upload
            </label>

            <div className="flex justify-between mt-2">
              {/* <button className="p-1.5 bg-green-300 rounded-sm focus:outline-none">
                Save as a draft
              </button> */}
              <button
                className="p-1.5 bg-green-300 rounded-sm focus:outline-none"
                onClick={handleClick}
              >
                Publish
              </button>
            </div>
          </div>
          <div>

            {/* category select  */}
            <div className="w-full border border-gray-400 p-3  gap-3 text-green-400  capitalize">
              <h1 className="text-xl font-semibold text-black mb-1">
                Category
              </h1>

              <input
                type="radio"
                checked={cat === "art"}
                onChange={(e) => setCat(e.target.value)}
                name="cat"
                id="art"
                value="art"
                className="mr-1 mb-2"
              />
              <label htmlFor="art">Art</label>
              <br />

              <input
                type="radio"
                checked={cat === "science"}
                onChange={(e) => setCat(e.target.value)}
                name="cat"
                id="science"
                value="science"
                className="mr-1 mb-2"
              />
              <label htmlFor="science">Science</label>
              <br />

              <input
                type="radio"
                checked={cat === "technology"}
                onChange={(e) => setCat(e.target.value)}
                name="cat"
                id="technology"
                value="technology"
                className="mr-1 mb-2"
              />
              <label htmlFor="technology">technology</label>
              <br />

              <input
                type="radio"
                checked={cat === "cinema"}
                onChange={(e) => setCat(e.target.value)}
                name="cat"
                id="cinema"
                value="cinema"
                className="mr-1 mb-2"
              />
              <label htmlFor="cinema">cinema</label>
              <br />

              <input
                type="radio"
                checked={cat === "design"}
                onChange={(e) => setCat(e.target.value)}
                name="cat"
                id="design"
                value="design"
                className="mr-1 mb-2"
              />
              <label htmlFor="design">Design</label>
              <br />

              <input
                type="radio"
                checked={cat === "food"}
                onChange={(e) => setCat(e.target.value)}
                name="cat"
                id="food"
                value="food"
                className="mr-1 mb-2"
              />
              <label htmlFor="food">Food</label>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
