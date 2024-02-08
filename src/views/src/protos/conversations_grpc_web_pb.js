/**
 * @fileoverview gRPC-Web generated client stub for conversations
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v3.21.12
// source: protos/conversations.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.conversations = require('./conversations_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.conversations.ConversationsClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.conversations.ConversationsPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.conversations.newConversationRequest,
 *   !proto.conversations.newConversationResponse>}
 */
const methodDescriptor_Conversations_newConversation = new grpc.web.MethodDescriptor(
  '/conversations.Conversations/newConversation',
  grpc.web.MethodType.UNARY,
  proto.conversations.newConversationRequest,
  proto.conversations.newConversationResponse,
  /**
   * @param {!proto.conversations.newConversationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.conversations.newConversationResponse.deserializeBinary
);


/**
 * @param {!proto.conversations.newConversationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.conversations.newConversationResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.conversations.newConversationResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.conversations.ConversationsClient.prototype.newConversation =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/conversations.Conversations/newConversation',
      request,
      metadata || {},
      methodDescriptor_Conversations_newConversation,
      callback);
};


/**
 * @param {!proto.conversations.newConversationRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.conversations.newConversationResponse>}
 *     Promise that resolves to the response
 */
proto.conversations.ConversationsPromiseClient.prototype.newConversation =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/conversations.Conversations/newConversation',
      request,
      metadata || {},
      methodDescriptor_Conversations_newConversation);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.conversations.addAccountRequest,
 *   !proto.conversations.addAccountResponse>}
 */
const methodDescriptor_Conversations_addAccount = new grpc.web.MethodDescriptor(
  '/conversations.Conversations/addAccount',
  grpc.web.MethodType.UNARY,
  proto.conversations.addAccountRequest,
  proto.conversations.addAccountResponse,
  /**
   * @param {!proto.conversations.addAccountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.conversations.addAccountResponse.deserializeBinary
);


/**
 * @param {!proto.conversations.addAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.conversations.addAccountResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.conversations.addAccountResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.conversations.ConversationsClient.prototype.addAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/conversations.Conversations/addAccount',
      request,
      metadata || {},
      methodDescriptor_Conversations_addAccount,
      callback);
};


/**
 * @param {!proto.conversations.addAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.conversations.addAccountResponse>}
 *     Promise that resolves to the response
 */
proto.conversations.ConversationsPromiseClient.prototype.addAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/conversations.Conversations/addAccount',
      request,
      metadata || {},
      methodDescriptor_Conversations_addAccount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.conversations.removeAccountRequest,
 *   !proto.conversations.removeAccountResponse>}
 */
const methodDescriptor_Conversations_removeAccount = new grpc.web.MethodDescriptor(
  '/conversations.Conversations/removeAccount',
  grpc.web.MethodType.UNARY,
  proto.conversations.removeAccountRequest,
  proto.conversations.removeAccountResponse,
  /**
   * @param {!proto.conversations.removeAccountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.conversations.removeAccountResponse.deserializeBinary
);


/**
 * @param {!proto.conversations.removeAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.conversations.removeAccountResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.conversations.removeAccountResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.conversations.ConversationsClient.prototype.removeAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/conversations.Conversations/removeAccount',
      request,
      metadata || {},
      methodDescriptor_Conversations_removeAccount,
      callback);
};


/**
 * @param {!proto.conversations.removeAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.conversations.removeAccountResponse>}
 *     Promise that resolves to the response
 */
proto.conversations.ConversationsPromiseClient.prototype.removeAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/conversations.Conversations/removeAccount',
      request,
      metadata || {},
      methodDescriptor_Conversations_removeAccount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.conversations.sendRequest,
 *   !proto.conversations.sendResponse>}
 */
const methodDescriptor_Conversations_send = new grpc.web.MethodDescriptor(
  '/conversations.Conversations/send',
  grpc.web.MethodType.UNARY,
  proto.conversations.sendRequest,
  proto.conversations.sendResponse,
  /**
   * @param {!proto.conversations.sendRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.conversations.sendResponse.deserializeBinary
);


/**
 * @param {!proto.conversations.sendRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.conversations.sendResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.conversations.sendResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.conversations.ConversationsClient.prototype.send =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/conversations.Conversations/send',
      request,
      metadata || {},
      methodDescriptor_Conversations_send,
      callback);
};


/**
 * @param {!proto.conversations.sendRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.conversations.sendResponse>}
 *     Promise that resolves to the response
 */
proto.conversations.ConversationsPromiseClient.prototype.send =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/conversations.Conversations/send',
      request,
      metadata || {},
      methodDescriptor_Conversations_send);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.conversations.streamRequest,
 *   !proto.conversations.streamResponse>}
 */
const methodDescriptor_Conversations_stream = new grpc.web.MethodDescriptor(
  '/conversations.Conversations/stream',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.conversations.streamRequest,
  proto.conversations.streamResponse,
  /**
   * @param {!proto.conversations.streamRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.conversations.streamResponse.deserializeBinary
);


/**
 * @param {!proto.conversations.streamRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.conversations.streamResponse>}
 *     The XHR Node Readable Stream
 */
proto.conversations.ConversationsClient.prototype.stream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/conversations.Conversations/stream',
      request,
      metadata || {},
      methodDescriptor_Conversations_stream);
};


/**
 * @param {!proto.conversations.streamRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.conversations.streamResponse>}
 *     The XHR Node Readable Stream
 */
proto.conversations.ConversationsPromiseClient.prototype.stream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/conversations.Conversations/stream',
      request,
      metadata || {},
      methodDescriptor_Conversations_stream);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.conversations.listRequest,
 *   !proto.conversations.listResponse>}
 */
const methodDescriptor_Conversations_list = new grpc.web.MethodDescriptor(
  '/conversations.Conversations/list',
  grpc.web.MethodType.UNARY,
  proto.conversations.listRequest,
  proto.conversations.listResponse,
  /**
   * @param {!proto.conversations.listRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.conversations.listResponse.deserializeBinary
);


/**
 * @param {!proto.conversations.listRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.conversations.listResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.conversations.listResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.conversations.ConversationsClient.prototype.list =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/conversations.Conversations/list',
      request,
      metadata || {},
      methodDescriptor_Conversations_list,
      callback);
};


/**
 * @param {!proto.conversations.listRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.conversations.listResponse>}
 *     Promise that resolves to the response
 */
proto.conversations.ConversationsPromiseClient.prototype.list =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/conversations.Conversations/list',
      request,
      metadata || {},
      methodDescriptor_Conversations_list);
};


module.exports = proto.conversations;

