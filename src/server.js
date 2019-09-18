// Import modules for handling basic web server things
const http = require('http');  // message handling / stream parsing
const url = require('url');
const query = require('querystring');

// Modules created by dev (me)
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// Port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// URL struct
// Structure that contains all file paths
const urlStruct = {
    '/' : htmlHandler.getIndex,
    '/style.css' : htmlHandler.getCss,
    '/success' : jsonHandler.success,
    '/badRequest' : jsonHandler.badRequest,
    '/unauthorized' : jsonHandler.unauthorized,
    '/forbidden' : jsonHandler.forbidden,
    '/internal' : jsonHandler.interal,
    '/notImplemented' : jsonHandler.notImplemented,
    notFound : jsonHandler.notFound,
};

// onRequest -> Handle HTTP requests
const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);  // parse the url via url module
    // grab query parameters, whatever is to the right of '?=', and make them reusable
    const params = query.parse(parsedUrl.query);  
    //console.dir(params.valid);
    
    // If our URL structure contains the pathname ( /name ), call that function
    if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response, params);
    } else {
        urlStruct.notFound(request, response, params);
    }
};

// start the server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);