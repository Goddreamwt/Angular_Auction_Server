"use strict";
/**
 * Created by mac on 2018/8/1.
 */
var http = require('http');
var server = http.createServer(function (request, response) {
    response.end("Hello Node!");
});
server.listen(8000);
