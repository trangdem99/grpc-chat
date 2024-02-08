"use strict"

const jwt = require("jsonwebtoken");

const accountsSchema = require("../models/accounts");

module.exports = async (call) => {
  try {
    if (!call.metadata.get("authorization")) {
      return {
        success: false,
        msg: "Unauthorized"
      }
    }

    const token = call.metadata.get("authorization")[0]

    if (!token.startsWith("Bearer ")) {
      return {
        success: false,
        msg: "Unauthorized"
      }
    }

    const access_token = token.split("Bearer ")[1];

    if (!access_token) {
      return {
        success: false,
        msg: "Unauthorized"
      }
    }
    
    const decoded = await jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
    const found_account = await accountsSchema.findOne({ _id: decoded._id }).select("-password");

    if (!found_account) {
      return {
        success: false,
        msg: "Unauthorized"
      }
    }

    return {
      success: true,
      msg: "Authorized",
      data: {
        account: found_account
      }
    }
  }
  catch(error) {
    console.log(error);
    return {
      success: false,
      msg: "Something went wrong. Please try again later. Or contact the administrator."
    }
  }
}