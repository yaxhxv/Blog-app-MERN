const express = require('express');
const { getAllBlogsControllter, createBlogController, updateBlogController, getBlogIdController, deleteBlogController } = require('../controllers/blogControllers');

//router Object 
const router = express.Router()

// //GET ||   get a blog by id

router.get('/get-blog/:id' , getBlogIdController)

// //delete || delete a blog

router.delete("/delete-blog/:id", deleteBlogController)

//GET || all Blogs

router.get('/all-blogs' , getAllBlogsControllter);

//POST || create a blog

router.post("/create-blog" ,  createBlogController);

// //PUT ||  update a blog

router.put('/update-blog/:id', updateBlogController);




module.exports = router;