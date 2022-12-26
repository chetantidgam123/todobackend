const mongoose = require('mongoose')
const express = require('express')

const UserSchema = mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String,required:true}
})

const UserModel = mongoose.model('users',UserSchema);
module.exports = {UserModel}