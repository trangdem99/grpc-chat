"use strict"

const jwt = require("jsonwebtoken");

const accountsSchema = require("../models/accounts");

module.exports = {
  async getProfile(call, callback) {
    try {
      const { success , msg, data } = await require("../middlewares/authorization")(call);

      if (!success) {
        return callback(null, {
          success: false,
          msg: msg
        })
      }

      const { account: found_account } = data

      return callback(null, {
        success: true,
        msg: "",
        data: await JSON.stringify({ account: found_account })
      })
    }
    catch(error) {
      console.log(error);
      return callback(null, {
        success: false,
        msg: "Something went wrong. Please try again later. Or contact the administrator."
      })
    }
  },
  async searchAccount(call, callback) {
    try {
      const { success, msg } = await require("../middlewares/authorization")(call);

      if (!success) {
        return callback(null, {
          success: false,
          msg: msg
        })
      }

      const { username } = call.request

      if (!username) {
        return callback(null, {
          success: false,
          msg: "Please fill in the search field."
        })
      }

      const found_accounts = await accountsSchema.find({ username: { $regex: username, $options: "i" } });

      return callback(null, {
        success: true,
        msg: "",
        data: await JSON.stringify({ accounts: found_accounts })
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