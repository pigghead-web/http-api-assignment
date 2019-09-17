// Method to change JSON objects into strings that can be displayed in the content tag on the HTML page
const respondJSON = (request, response, status, object) => {
    response.writeHead(status, {'Content-Type' : 'application/json'});
    response.write(JSON.stringify(object));
    response.end();
}

const success = (request, response) => {
    const responseJSON = {
        message: "This is a successful response",
        id: "success"
    }
    
    respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response) => {
    const responseJSON = {
        message: "Page nout found",
        id: "notFound"
    }
    
    respondJSON(request, response, 404, responseJSON);
}

module.exports = {
    success,
    notFound
}