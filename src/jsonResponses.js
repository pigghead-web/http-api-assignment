// Method to change JSON objects into strings that can be displayed in the content tag on the HTML page
const respondJSON = (request, response, status, object) => {
    // pass in the status and content type (application/json)
    response.writeHead(status, {'Content-Type' : 'application/json'});
    // Stringify the JSON object passed in so that it is represented as just a string
    response.write(JSON.stringify(object));
    response.end();
}

// function for success status code
const success = (request, response) => {
    // message to send
    const responseJSON = {
        message: "This is a successful response",
        id: "success"
    }
    // send the json object (responseJSON) with the success status code/message
    respondJSON(request, response, 200, responseJSON);
};

// function for a bad request
// **INCLUDE PARAMS TO DETERMINE IF ?valid=true WAS PASSED IN
const badRequest = (request, response, params) => {
    // message to send
    const responseJSON = {
        message: "This request has the required paramaters",
    }
    // if the parameter is present, send a 400
    if (!params.valid || params.valid !== 'true') {
        // set appropriate error message
        message: "Missing valid query parameters (?valid=true)";
        // give the error message an identifiable ID
        responseJSON.id = 'id';
        // return with 400 - client error
        return respondJSON(request, response, 400, responseJSON);
    }
    
    // if the parameter IS present, send a 200 - client success
    return respondJSON(request, response, 200, responseJSON);
};

// function for unauthorized access request
const unauthorized = (request, response, params) => {
    // message to send
    const responseJSON = {
        message: "This request has the required parameters",
    }
    // if the parameter is not present, present a 401
    if (!params.loggedIn || params.loggedIn !== 'yes') {
        // update our message to reflect the error
        responseJSON.message = "Missing valid query paramaters (?loggedIn=yes)";
        // provide an id
        responseJSON.id = "unauthorized";
        // status 401 - user trying to access is not authenticated
        return respondJSON(request, response, 401, responseJSON);
    }
    // if parameter IS set, send a 200 - client success
    return respondJSON(request, response, 200, responseJSON);
}

// function for forbidden access on user (client) side
const forbidden = (request, response) => {
    // message to send
    const responseJSON = {
        message: "You do not have access to this content.",
        id: "forbidden"
    }
    // send the json object back
    respondJSON(request, response, 403, responseJSON);
}

// function for reporting an internal error
const internal = (request, response) => {
    // message to send
    const responseJSON = {
        message: "Internal Server Errror. Something went wrong.",
        id: "internalError",
    }
    // send json object back with 500 - error on server, request unable to complete
    respondJSON(request, response, 500, responseJSON);
}

// function for unimplemented get request
const notImplemented = (request, response) => {
    // message to send
    const responseJSON = {
        message: "A GET request for this page has not been implemented yet. Check again later for content",
        id: "notImplemented",
    }
    
    // send json object back with 501 - facility required is unsupported (unimplemented)
    respondJSON(request, response, 501, responseJSON);
}

// function to show a not found error
const notFound = (request, response) => {
    // message to send
    const responseJSON = {
        message: "Page not found",
        id: "notFound"
    }
    // send the json object (responseJSON) with the not found status code/message
    respondJSON(request, response, 404, responseJSON);
}

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound
}