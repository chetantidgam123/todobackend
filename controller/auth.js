const express = require('express');
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");
const { UserModel } = require('../model/user.model');
const token_secret = process.env.TOKEN_KEY;

const validateUser = async (data) => {
    let { email, password } = data;
    try {
      let user = await UserModel.findOne({ email });
      
      if (user) {
        if (await argon2.verify(user.password, password)) {
          return user;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  
const signupUser = async(req,res)=>{
  console.log("req",req.body)
  
    let {email,password,name}  = req.body;
    let existing_user =  await UserModel.findOne({email:email});
    if(existing_user){
        return res.send({
            status:false,
            message:"already registerd"
        })
    }
    let hash = await argon2.hash(password)
    let user = await UserModel.create({name:name,email:email,password:hash})
    if(user){
        return res.send({
            data:user,
            status:true,
            message:"registerd succefully"
        })  
    }else{
        return res.send({
            status:false,
            message:"Invalid details"
        })
    }
}

const loginUser = async (req, res) => {
    let { email, password } = req.body;
    let user = await validateUser({ email, password });
  
    if (user) {
      let token = jwt.sign(
        { email: user.email, name: user.name},
        token_secret,
        {
          expiresIn: "7 days",
        }
      );
  
   
       res.status(200).send({ status: true, token });
    } else {
      return res.send({ status: false, messege: "something went wrong" });
    }
  };
 const getUser = async(req,res)=>{
  let users  = await UserModel.find()
  return res.send(users)
 }
  module.exports={
    loginUser,
    signupUser,
    getUser
  }