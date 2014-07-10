//include the http module
var http = require("http");
//include the url module to process url arguments
var url = require ("url");
//querystring is required for parse
var querystring = require("querystring");
//file system
var fs = require("fs");

/* 
  Creates the Server
  Parameters:
    function: is called on every request
      request: holds all request Parameters
      response: the response sent to the client
*/
http.createServer(function (request, response) {
    //Attach listener to the "end" event - this is called when the client is waiting for response
    //call resume because "end" doesn't happen until the stream is closed otherwise
    request.resume();
    request.on("end", function() {
      //parse the request and store them in _get variable 
      //var _get = url.parse(request.url, true).query;

      //check if requesting favicon or actual address
      if (request.url == '/') {
        //read file
        fs.readFile('test.txt', 'utf-8', function (error, data) {
          //write headers
          response.writeHead(200, {'Content-Type': 'text/plain'});
          //increment file
          data = parseInt(data) + 1;
          //write to file
          fs.writeFile('test.txt', data);
          response.end('test file reads ' + data + request.url);
        });
        
      } else {
        response.writeHead(404);
        response.end();
      }


      //write headers to the response
      //first parameter is the status code 
      //second parameter is the header fields
      //response.writeHead(200, {"Content-Type": "text/plain"});
      //send the response/data
      //response.end('refreshed ' + data + ' times!');
    });
  //listen on the 8080 port
  }).listen(8080);