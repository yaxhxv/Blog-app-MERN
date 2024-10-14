const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')


//get all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find({});
      return res.status(200).send({
        userCount: users.length,
        sucess:true,
        message:"all users data",
        users
      })
    } catch (error) {
      console.log(error)
      return res.status(500)
    }
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

    const hashedPassword = await bcrypt.hash(password,10)
    
    //save new user
    const newUser =  new  userModel({userName,email,password: hashedPassword})
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
  exports.loginController =async (req, res, next) => {
      try {
        const  { email, password } = req.body;
        if(!email) {
          return res.status(401).send({
            success:false,
            message:"please provide email"
          })
        }
        if(!password) {
          return res.status(401).send({
            success:false,
            message:"please provide password"
          })
        }


        const user = await userModel.findOne({email})
        if(!user){
          return res.status(200).send({
            sucess:false,
            message:"email is not registered"
          })
        }
// password

        const isMatch = await bcrypt.compare(password, user.password )
        if(!isMatch){
          return res.status(401).send({
            sucess:false,
            message:'invalid username or password'
          })
        }

        return res.status(200).send({
          sucess:true,
          message:"login sucessfully",
          user
        })

      } catch (error) {
        console.log(error);
        return res.status(500).send({
          success:false,
          message: "Error in loginController",
          error: error.message
        })
      }
  };