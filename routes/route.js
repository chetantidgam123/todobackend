const express = require("express");
let router = express.Router();
const userRoute = require('../controller/auth')
router
  .post("/user/signup", userRoute.signupUser)
  .post("/user/login", userRoute.loginUser)
  .get("/user", userRoute.getUser)

  module.exports = router