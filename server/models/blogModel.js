const mongoose = require("mongoose")


const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true,  "Title is required"],

    },
    description : {
        type: String,
        required:[true,  "Description is required"],
    },
    image:{
        type:String,
        required:[true,   "Image is required"],
    },
}, {timestamps:true})

const blogModel = mongoose.Model("Blog" , blogSchema);

module.export= blogModel;