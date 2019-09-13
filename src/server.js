// Modules for handling basic web server things
const http = require('http');
const url = require('url');
const query = require('querystring');

// Modules created by dev (me)
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// Port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// URL struct
const urlStruct = {
    '/' : htmlHandler.getIndex,
    '/style.css' : htmlHandler.getCss,
    '/success' : jsonHandler.success,
    '/badRequest' : jsonHandler.badRequest,
    notFound : jsonHandler.notFound,
};

// onRequest
const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const params = query.parse(parsedUrl.query);
    
    if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response, params);
    } else {
        urlStruct.notFound(request, response, params);
    }
};

// start the server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);