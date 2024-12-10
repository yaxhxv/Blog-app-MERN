const blogModel = require('../models/blogModel');
const userModel = require ('../models/userModel')
const mongoose = require('mongoose');


//Get all blogs
exports.getAllBlogsControllter = async (req, res) =>{
    try {
        const blogs = await blogModel.find({});     
           if(blogs.length === 0){
            res.status(200).send({
                message: "No blogs found",
                success:false,
                // blogs
            })
        }
        return res.status(200).send({
            success:true,
            message:"All Blog List",
            BlogCount: blogs.length,
            blogs

        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message: "Error while fetching all blogs",
            error
        })
    }
}

// //Create a blog
exports.createBlogController = async (req, res) =>{
    try {
        const {title, description, image, user} =  req.body;
      
        if(!title ||  !description || !image || !user){
            return res.status(400).send({
                success:false,
                message: "Please fill all fields",
                error: "Invalid request"
            })
        }

        const existingUser = await userModel.findOne({ _id: user });
        if(!existingUser){
            return res.status(404).send
            ({
                success:false,
                message: "User not found",
                error: "Invalid request in creating blog"
                })
                }


        const newBlog = new blogModel({title,description,image, user})   
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existingUser.blogs.push(newBlog);
        await existingUser.save({session})
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success:true,
            message:"Blog created successfully",
            newBlog
        })

       
    } catch (error) {
        console.log(error);
        return  res.status(500).send({
            success:false,
            message: "Error while creating blogs",
            error
    })
}
    }


// //update a blog
    exports.updateBlogController = async(req,res) =>{
        try {
            const {id} = req.params;
            const  {title, description, image} = req.body;
           

            const blog = await blogModel.findOneAndUpdate({_id: id},  {...req.body }, {new: true});

            if(!blog){
                return  res.status(404).send({
                    success:false,
                    message: "Blog not found",
                })
            }
            return res.status(200).send({
                success:true,
                message: "Blog updated successfully",
                blog
            });

            
        } catch (error) {
            console.log(error)
            return res.status(500).send({
            success:false,
            message: "Error while updating blog",
            error
        })
        }
    }


// //get blog by ID
exports.getBlogIdController = async( req,res) =>{
    try {
        const {id} = req.params;
        const blog = await blogModel.findById(id);
        if(!blog){
            return res.status(404).send({
                success:false,
                message: "Blog not found",
            })
          
        }
        return  res.status(200).send({
            success:true,
            message: "Blog found",
            blog
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message: "Error while getting blog by id",
            error
        })
    }
}


// //delete a blog
exports.deleteBlogController = async(req,res) =>{
    try {
        const {id }= req.params
        const  blog = await blogModel.findByIdAndDelete(id);
        if(!blog){
            return res.status(404).send({
                success:false,
                message: "Blog not found",
            })
        }
        return res.status(200).send({
            success:true,
            message: "Blog deleted",
            // blogCount : blogs.length

        })


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message: "Error while deleting blog",
            error
        })
    }
}


exports.userBlogController = async(req,res) =>{
    try {
        const userBlog = await userModel.findById(req.params.id).populate('blogs')

        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:"blog not found",

            })
        }
        return res.status(200).send({
            success:true,
            message:"user Blog", 
            userBlog
        })
        
    } catch (error) {
        return res.status(400).send({
            sucess:false,
            message:"error in getting user blog",
            error
        })
    }
}

// 6- 13:00