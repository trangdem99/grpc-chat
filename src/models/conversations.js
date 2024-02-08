const {
  Schema,
  model
} = require("mongoose")

module.exports = model(
  "conversations",
  Schema({
    "accounts": [
      {
        "type": Schema.Types.ObjectId,
        "ref": "accounts",
      },
    ],
    "messages": [
      {
        "account": {
          "type": Schema.Types.ObjectId,
          "ref": "accounts",
        },
        "message": {
          "type": String,
          "required": true,
        },
        "created_at": {
          "type": Date,
          "default": Date.now(),
        },
      },
    ],
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