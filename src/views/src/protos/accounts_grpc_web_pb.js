/**
 * @fileoverview gRPC-Web generated client stub for accounts
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v3.21.12
// source: protos/accounts.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.accounts = require('./accounts_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.accounts.AccountsClient =
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
proto.accounts.AccountsPromiseClient =
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
 *   !proto.accounts.getProfileRequest,
 *   !proto.accounts.getProfileResponse>}
 */
const methodDescriptor_Accounts_getProfile = new grpc.web.MethodDescriptor(
  '/accounts.Accounts/getProfile',
  grpc.web.MethodType.UNARY,
  proto.accounts.getProfileRequest,
  proto.accounts.getProfileResponse,
  /**
   * @param {!proto.accounts.getProfileRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.accounts.getProfileResponse.deserializeBinary
);


/**
 * @param {!proto.accounts.getProfileRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.accounts.getProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.accounts.getProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.accounts.AccountsClient.prototype.getProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/accounts.Accounts/getProfile',
      request,
      metadata || {},
      methodDescriptor_Accounts_getProfile,
      callback);
};


/**
 * @param {!proto.accounts.getProfileRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.accounts.getProfileResponse>}
 *     Promise that resolves to the response
 */
proto.accounts.AccountsPromiseClient.prototype.getProfile =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/accounts.Accounts/getProfile',
      request,
      metadata || {},
      methodDescriptor_Accounts_getProfile);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.accounts.searchRequest,
 *   !proto.accounts.searchResponse>}
 */
const methodDescriptor_Accounts_searchAccount = new grpc.web.MethodDescriptor(
  '/accounts.Accounts/searchAccount',
  grpc.web.MethodType.UNARY,
  proto.accounts.searchRequest,
  proto.accounts.searchResponse,
  /**
   * @param {!proto.accounts.searchRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.accounts.searchResponse.deserializeBinary
);


/**
 * @param {!proto.accounts.searchRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.accounts.searchResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.accounts.searchResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.accounts.AccountsClient.prototype.searchAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/accounts.Accounts/searchAccount',
      request,
      metadata || {},
      methodDescriptor_Accounts_searchAccount,
      callback);
};


/**
 * @param {!proto.accounts.searchRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.accounts.searchResponse>}
 *     Promise that resolves to the response
 */
proto.accounts.AccountsPromiseClient.prototype.searchAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/accounts.Accounts/searchAccount',
      request,
      metadata || {},
      methodDescriptor_Accounts_searchAccount);
};


module.exports = proto.accounts;

