"use strict"

const {
  AES,
  HmacSHA512,
} = require("crypto-js")
const jwt = require("jsonwebtoken")

const accountsSchema = require("../models/accounts")

async function generateAccessToken(_id) {
  const now = Math.floor(Date.now())
  const exp = now + Number(process.env.ACCESS_TOKEN_EXPIRATION) * 1000

  return await jwt.sign({
    "_id": _id,
    "iat": now,
    "exp": exp
  }, process.env.ACCESS_TOKEN_SECRET)
}

module.exports = {
  async signUp(call, callback) {
    try {
      const { username, email, password } = call.request

      console.log(call.request)

      if (!username || !email || !password) {
        return callback(null, {
          success: false,
          msg: "Please fill in all fields."
        })
      }

      const found_username = await accountsSchema.findOne({ username: username })

      if (found_username) {
        return callback(null, {
          success: false,
          msg: "Username already exists."
        })
      }

      const found_email = await accountsSchema.findOne({ email: email })

      if (found_email) {
        return callback(null, {
          success: false,
          msg: "Email already exists."
        })
      }

      const new_account = new accountsSchema({
        username: username,
        email: email,
        password: await HmacSHA512(password, process.env.APP_SECRET).toString(),
        status: "actived",
      })

      await new_account.save()

      return callback(null, {
        success: true,
        msg: "Account created successfully.",
      })
    }
    catch(error) {
      return callback(null, {
        success: false,
        msg: "Something went wrong. Please try again later. Or contact the administrator."
      })
    }
  },
  async signIn(call, callback) {
    try {
      const { username, password } = call.request

      console.log(call.request)

      if (!username || !password) {
        return callback(null, {
          success: false,
          msg: "Please fill in all fields."
        })
      }

      const found_account = await accountsSchema.findOne({ username: username, deleted_at: null })

      if (!found_account) {
        return callback(null, {
          success: false,
          msg: "Account not found."
        })
      }

      if (found_account.password !== await HmacSHA512(password, process.env.APP_SECRET).toString()) {
        return callback(null, {
          success: false,
          msg: "Incorrect password."
        })
      } 

      const access_token = await generateAccessToken(found_account._id)

      return callback(null, {
        success: true,
        msg: "Login successfully.",
        data: await JSON.stringify({
          access_token: access_token,
        }),
      })
    }
    catch(error) {
      console.log(error);
      return callback(null, {
        success: false,
        msg: "Something went wrong. Please try again later. Or contact the administrator."
      })
    }
  }
}