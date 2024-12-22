import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BlogCard from '../components/Card'


const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const id = localStorage.getItem('userId');

    // get user Blogs
    const getUserBlogs = async () => {

        try {

            const { data } = await axios.get(`http://localhost:5000/api/v1/blogs/user-blog/${id}`)
            if (data) {
                setBlogs(data.userBlog.blogs)
                // console.log(blogs)
                console.log(data.userBlog.blogs)

            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserBlogs()
    }, [id])


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
    )

}
export default MyBlogs