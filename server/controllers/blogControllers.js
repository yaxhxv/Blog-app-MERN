const blogModel = require('../models/blogModel');


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
        console.log("Request received at create-blog endpoint");
        console.log("Request Body:", req.body);
        const {title, description, image} =  req.body;
        if(!title ||  !description || !image){
            return res.status(400).send({
                success:false,
                message: "Please fill all fields",
                error: "Invalid request"
            })
        }
        const blog = new blogModel({title,description,image})   
        await  blog.save();

   
        return res.status(201).send({
            success:true,
            message: "Blog created successfully",
            blog: req.body  ,


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
            if(!id || !title || !description || !image){
                return res.status(400).send({
                    success:false,
                    message: "Please fill all fields",
                })
            }

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


// 5 - 14:37 