const {
  Schema,
  model
} = require("mongoose")

module.exports = model(
  "accounts",
  Schema({
    "username": {
      "type": String,
      "required": true,
      "unique": true,
    },
    "email": {
      "type": String,
      "required": true,
      "unique": true,
    },
    "password": {
      "type": String,
      "required": true,
    },
    "status": {
      "type": String,
      "enum": ["banned", "inactived", "suspended", "actived"],
      "required": true,
    },
    "created_at": {
      "type": Date,
      "default": Date.now(),
    },
    "updated_at": {
      "type": Date,
      "default": Date.now(),
    },
    "deleted_at": {
      "type": Date,
      "default": null,
    },
  })
)