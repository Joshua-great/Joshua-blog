const userRouter=require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const auth=require('../middleware/auth')
const logger = require('../config/logger');

const createUser = async ({email, first_name, last_name, password})=>{
  logger.info('[CreateUser] => Signup process started')
    const userInfo = {email, first_name, last_name, password}
    const existingUser = await User.findOne({email:userInfo.email})
    if(existingUser){
      return{
        message:"user already exist",
        code:409
      }
    }
    const newUser = await User.create({
        email:userInfo.email,
        first_name:userInfo.first_name,
        last_name:userInfo.last_name,
        password:userInfo.password
    })
    logger.info('[CreateUser] => User with email ' + newUser.email + ' created successfully');
    return{
        message:"successful signup",
        code:200,
        newUser
    }
}


const login = async (req, res) => {
  try {
    logger.info('[Authenticate user] => login process started');
    
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        code: 400,
        message: "Username and Password required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "User not found",
      });
    }

    const validPassword = await user.isValidPassword(password);

    if (!validPassword) {
      return res.status(422).json({
        code: 422,
        message: "Email or password is incorrect",
      });
    }

    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    user.token = token;

    logger.info('[Give user access] => login process successful');

    return{
      message:"successful login",
      code:200,
      user,
      token 
    }

  } catch (err) {
    logger.error(err.message);
    return{
      message: 'Server Error',
      code:500,
      data: null
    }

  }
};

module.exports={login, createUser}
