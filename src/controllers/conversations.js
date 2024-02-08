"use strict"

const accountsSchema = require('../models/accounts')
const conversationsSchema = require('../models/conversations')

module.exports = {
  async newConversation(call, callback) {
    try {
      const { success , msg, data } = await require("../middlewares/authorization")(call);

      if (!success) {
        return callback(null, {
          success: false,
          msg: msg
        })
      }

      const { account: found_account } = data

      const new_conversation = new conversationsSchema({
        accounts: [found_account._id],
        messages: []
      })

      await new_conversation.save()

      return callback(null, {
        success: true,
        msg: "New conversation created.",
      })
    }
    catch (error) {
      console.log(error)
      return callback(null, {
        success: false,
        msg: "Something went wrong. Please try again later. Or contact the administrator."
      })
    }
  },
  async list(call, callback) {
    try {
      const { success , msg, data } = await require("../middlewares/authorization")(call);

      if (!success) {
        return callback(null, {
          success: false,
          msg: msg
        })
      }

      const { account: found_account } = data

      const found_conversations = await conversationsSchema.find({
        accounts: { 
          $elemMatch: { $eq: found_account._id }
        } 
      }).populate([
        {
          path: "accounts",
          select: "_id username"
        },
        {
          path: "messages",
          populate: {
            path: "account",
            select: "_id username"
          }
        }
      ]).exec()

      return callback(null, {
        success: true,
        msg: "",
        data: await JSON.stringify({ conversations: found_conversations })
      })
    }
    catch (error) {
      console.log(error)
      return callback(null, {
        success: false,
        msg: "Something went wrong. Please try again later. Or contact the administrator."
      })
    }
  },
  async addAccount(call, callback) {
    try {
      const { success , msg, data } = await require("../middlewares/authorization")(call);

      if (!success) {
        return callback(null, {
          success: false,
          msg: msg
        })
      }

      const { account: found_account } = data
      const { _id, account } = call.request

      const found_conversation = await conversationsSchema.findOne({ accounts: { 
        $elemMatch: { $eq: found_account._id }
      }, _id: _id })

      if (!found_conversation) {
        return callback(null, {
          success: false,
          msg: "Conversation not found."
        })
      }

      if (found_conversation.accounts.includes(account)) {
        return callback(null, {
          success: false,
          msg: "Account already exists."
        })
      }

      const found_account_to_add = await accountsSchema.findOne({ _id: account })

      if (!found_account_to_add) {
        return callback(null, {
          success: false,
          msg: "Account not found."
        })
      }

      await found_conversation.accounts.push(account)
      found_conversation.updated_at = Date.now()
      await found_conversation.save()

      return callback(null, {
        success: true,
        msg: "Added successfully.",
      })
    }
    catch (error) {
      console.log(error)
      return callback(null, {
        success: false,
        msg: "Something went wrong. Please try again later. Or contact the administrator."
      })
    }
  },
  async removeAccount(call, callback) {
    try {
      const { success , msg, data } = await require("../middlewares/authorization")(call);

      if (!success) {
        return callback(null, {
          success: false,
          msg: msg
        })
      }

      const { account: found_account } = data
      const { _id, account } = call.request

      const found_conversation = await conversationsSchema.findOne({ accounts: { 
        $elemMatch: { $eq: found_account._id }
      }, _id: _id })

      if (!found_conversation) {
        return callback(null, {
          success: false,
          msg: "Conversation not found."
        })
      }

      if (!found_conversation.accounts.includes(account)) {
        return callback(null, {
          success: false,
          msg: "Account not found."
        })
      }

      const found_account_to_remove = await accountsSchema.findOne({ _id: account })

      if (!found_account_to_remove) {
        return callback(null, {
          success: false,
          msg: "Account not found."
        })
      }

      await found_conversation.accounts.pull(account)
      found_conversation.updated_at = Date.now()
      await found_conversation.save()

      return callback(null, {
        success: true,
        msg: "Removed successfully.",
      })
    }
    catch (error) {
      console.log(error)
      return callback(null, {
        success: false,
        msg: "Something went wrong. Please try again later. Or contact the administrator."
      })
    }
  },
  async send(call, callback) {
    try {
      const { success , msg, data } = await require("../middlewares/authorization")(call);

      if (!success) {
        return callback(null, {
          success: false,
          msg: msg
        })
      }

      const { account: found_account } = data
      const { _id, message } = call.request

      const found_conversation = await conversationsSchema.findOne({ accounts: { 
        $elemMatch: { $eq: found_account._id }
       }, _id: _id })

      found_conversation.messages.push({
        account: found_account._id,
        message: message
      })

      found_conversation.updated_at = Date.now()
      await found_conversation.save()

      return callback(null, {
        success: true,
        msg: "",
        data: await JSON.stringify({ conversation: found_conversation })
      })
    }
    catch (error) {
      console.log(error)
      return callback(null, {
        success: false,
        msg: "Something went wrong. Please try again later. Or contact the administrator."
      })
    }
  },
  async stream(call, callback) {
    try {
      const { success, msg, data } = await require("../middlewares/authorization")(call);
  
      if (!success) {
        return callback(null, {
          success: false,
          msg: msg
        })
      }
  
      const { account: found_account } = data;
  
      conversationsSchema.watch().on('change', async(change) => {
        if (change.operationType === 'update') {
          const { _id } = change.documentKey;
          const found_conversation = await conversationsSchema.findOne({ _id: _id }).populate([
            {
              path: "accounts",
              select: "_id username"
            },
            {
              path: "messages",
              populate: {
                path: "account",
                select: "_id username"
              }
            }
          ]).exec();

          if (found_conversation.accounts.map(account => account._id.toString()).includes(found_account._id.toString())) {
            call.write({
              data: JSON.stringify({
                _id: _id,
                type: "update-conversation",
                updated_data: found_conversation || {}
              })
            });
          }
        }

        if (change.operationType === 'insert') {
          const { _id, accounts } = change.fullDocument;

          if (accounts.map(account => account.toString()).includes(found_account._id.toString())) {
            const found_conversation = await conversationsSchema.findOne({ _id: _id }).populate([{
              path: "accounts",
              select: "_id username"
            }]).exec();

            call.write({
              data: JSON.stringify({
                _id: _id,
                type: "new-conversation",
                updated_data: found_conversation || {}
              })
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
      return callback(null, {
        success: false,
        msg: "Something went wrong. Please try again later. Or contact the administrator."
      });
    }
  },
}