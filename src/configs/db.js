"use strict"

const mongoose = require("mongoose")

let session

// Connect to MongoDB
mongoose.connect(`${process.env.DB_CONNECTION}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true,
}).then(() => {
  console.log("Connected to MongoDB")
}).catch((error) => {
  console.log("Error connecting to MongoDB")
  console.log(error)
})

mongoose.connection.on("connected", async () => {
  console.log("Connection established")
})

mongoose.connection.on("error", async (error) => {
  console.log("Connection error")
  console.log(error)

  if (session) {
    await session.abortTransaction()
  }
})

mongoose.connection.on("disconnected", async () => {
  console.log("Connection disconnected")
  
  if (session) {
    await session.endSession()
  }
})