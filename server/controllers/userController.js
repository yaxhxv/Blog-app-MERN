const userModel = require('../models/userModel')


//get all users
exports.getAllUsers = (req, res, next) => {
    // your implementation here
  };
  
  //create user register user
  exports.registerController = async (req, res) => {
   try {
    console.log(req.body)
    const  {userName, email, password } = req.body;
    //validation
    if(!userName ) {
        return res.status(400).json({ message: 'Please enter userName' });
    }
    if( !email ) {
        return res.status(400).json({ message: 'Please enter email' });
    }
    if( !password) {
        return res.status(400).json({ message: 'Please enter password' });
    }

    const existingUser  = await userModel.findOne({ email });
    if(existingUser){
        return res.status(400).json({ message: 'Email already in use' });
    }
    
    //save new user
    const newUser =  new  userModel({userName,email,password})
    await  newUser.save();
    return  res.status(201).json({ message: 'User created successfully',
        sucess:true,
        data: newUser
     });

   } catch (error) {
    console.log(error)
    return res.status(500).send({
        message: "Error in registerController ",
        sucess:false,
        error: error.message
    })
   }

  };
  
  // login 
  exports.loginController = (req, res, next) => {
    // your implementation here
  };