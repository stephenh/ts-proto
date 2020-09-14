// package: rpx
// file: example.proto

var example_pb = require("./example_pb");
var types_pb = require("./types_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var DashState = (function () {
  function DashState() {}
  DashState.serviceName = "rpx.DashState";
  return DashState;
}());

DashState.UserSettings = {
  methodName: "UserSettings",
  service: DashState,
  requestStream: false,
  responseStream: false,
  requestType: types_pb.Empty,
  responseType: example_pb.DashUserSettingsState
};

DashState.ActiveUserSettingsStream = {
  methodName: "ActiveUserSettingsStream",
  service: DashState,
  requestStream: false,
  responseStream: true,
  requestType: types_pb.Empty,
  responseType: example_pb.DashUserSettingsState
};

exports.DashState = DashState;

function DashStateClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

DashStateClient.prototype.userSettings = function userSettings(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(DashState.UserSettings, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

DashStateClient.prototype.activeUserSettingsStream = function activeUserSettingsStream(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(DashState.ActiveUserSettingsStream, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.DashStateClient = DashStateClient;

var DashAPICreds = (function () {
  function DashAPICreds() {}
  DashAPICreds.serviceName = "rpx.DashAPICreds";
  return DashAPICreds;
}());

DashAPICreds.Create = {
  methodName: "Create",
  service: DashAPICreds,
  requestStream: false,
  responseStream: false,
  requestType: example_pb.DashAPICredsCreateReq,
  responseType: example_pb.DashCred
};

DashAPICreds.Update = {
  methodName: "Update",
  service: DashAPICreds,
  requestStream: false,
  responseStream: false,
  requestType: example_pb.DashAPICredsUpdateReq,
  responseType: example_pb.DashCred
};

DashAPICreds.Delete = {
  methodName: "Delete",
  service: DashAPICreds,
  requestStream: false,
  responseStream: false,
  requestType: example_pb.DashAPICredsDeleteReq,
  responseType: example_pb.DashCred
};

exports.DashAPICreds = DashAPICreds;

function DashAPICredsClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

DashAPICredsClient.prototype.create = function create(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(DashAPICreds.Create, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

DashAPICredsClient.prototype.update = function update(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(DashAPICreds.Update, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

DashAPICredsClient.prototype.delete = function pb_delete(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(DashAPICreds.Delete, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.DashAPICredsClient = DashAPICredsClient;

