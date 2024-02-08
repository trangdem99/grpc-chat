'use strict'

require('dotenv').config({
  'path': '.env',
})

require('./configs/db')

const grpc = require('@grpc/grpc-js');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');

const accounts_package_definition = protoLoader.loadSync(path.join(__dirname, 'protos', 'accounts.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})
const accounts_proto = grpc.loadPackageDefinition(accounts_package_definition).accounts;

const { getProfile, searchAccount } = require('./controllers/accounts')

const authentications_package_definition = protoLoader.loadSync(path.join(__dirname, 'protos', 'authentications.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const authentications_proto = grpc.loadPackageDefinition(authentications_package_definition).authentications;

const { signIn, signUp } = require('./controllers/authentications')

const conversations_package_definition = protoLoader.loadSync(path.join(__dirname, 'protos', 'conversations.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const conversations_proto = grpc.loadPackageDefinition(conversations_package_definition).conversations;

const {
  newConversation,
  list,
  get,
  addAccount,
  removeAccount,
  leave,
  send,
  deleteConversation,
  stream,
} = require('./controllers/conversations')

const server = new grpc.Server();

server.addService(accounts_proto.Accounts.service, {
  getProfile: getProfile,
  searchAccount: searchAccount,
})

server.addService(authentications_proto.Authentications.service, {
  signUp: signUp,
  signIn: signIn,
})

server.addService(conversations_proto.Conversations.service, {
  newConversation: newConversation,
  list: list,
  addAccount: addAccount,
  removeAccount: removeAccount,
  send: send,
  stream: stream,
})


server.bindAsync(`0.0.0.0:${process.env.PORT_GRPC}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Your server as started on port ${port}`);
  server.start();
});