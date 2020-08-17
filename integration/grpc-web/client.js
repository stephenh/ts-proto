#!/usr/bin/env node

var rpx = require('./generated/example_pb_service.js')
var ex = require('./generated/example_pb.js')
var pb = require('./generated/types_pb.js')

var grpc = require("@improbable-eng/grpc-web");
var ts = require("@improbable-eng/grpc-web-node-http-transport");
 
// Do this first, before you make any grpc requests!
grpc.grpc.setDefaultTransport(ts.NodeHttpTransport());

const client = new rpx.DashStateClient("http://localhost:9090");
const req = new pb.Empty();
client.userSettings(req, (err, settings) => {
	console.log(err);
	console.log(settings);
});

const creds = new rpx.DashAPICredsClient("http://localhost:9090");


const createReq = new ex.DashAPICredsCreateReq()
createReq.setDescription("test desc fooo");
createReq.setMetadata("test metadata");

creds.create(createReq, (err, cred) => {
	console.log(err);
	console.log(cred);
	id = cred.getId();

	var delReq = new ex.DashAPICredsDeleteReq()
	delReq.setId(cred.getId());

	creds.delete(delReq, (err, res) => {
		console.log(err);
		console.log(res);
	});
});

const updateReq = new ex.DashAPICredsUpdateReq();
updateReq.setDescription("test desc2");

// This should reutrn a not found error
creds.update(updateReq, (err, cred) => {
	console.log("EXPECTED ERROR")
	console.log(err);
	console.log("EXPECTED ERROR")
});
