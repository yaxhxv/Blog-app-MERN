import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/Card";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/blogs/all-blogs"
      );
      if (data) {
        setBlogs(data.blogs);
        console.log(blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <>
      {blogs &&
        blogs.map((blogs) => (
          <BlogCard
            key={blogs._id}
            title={blogs.title}
            description={blogs.description}
            image={blogs.image}
            userName={blogs.user?.userName || "Anonymous"}
            time={blogs.createdAt}
          />
        ))}
    </>
  );
};

export default Blogs;

// 10- 3:00
