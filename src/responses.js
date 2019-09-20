// In comparison to respondJSON -- content is what the
// response will actually contain
// (JSON object or XML text response), and type is the
// type of response (text/xml or application/json)
const respond = (request, response, status, content, type) => {
  // pass in our status and our accepted type,
  // both of which can vary in this application as compared to previous examples
  response.writeHead(status, { 'Content-Type': type });
  // typically we would stringify a json object, however this will also vary
  response.write(content);
  response.end();
};

// function for success status code
const success = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'This is a successful response.',
    id: 'success',
  };
  // console.dir(acceptedTypes)
    // is the user requesting an xml object?
  if (acceptedTypes[0] === 'text/xml') {
    // console.dir("Accessing text/xml");
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    responseXML = `${responseXML}<id>${responseObj.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }
  // console.dir("Disregarding your text/xml");
  // turn our response into a stringified JSON object
  const successString = JSON.stringify(responseObj);
  // return normally
  return respond(request, response, 200, successString, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseObj = {
    message: 'This request has the required parameters',
    id: 'badRequest',
  };
  let status = 200;

  if (!params.valid || params.valid !== 'true') {
    responseObj.message = 'Missing valid query parameters';
    responseObj.id = 'badRequest';
    status = 400;
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseObj.message}</message>`;
    responseXML = `${responseXML} <id>${responseObj.id}</id>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, status, responseXML, 'text/xml');
  }
  const badRequestString = JSON.stringify(responseObj);
  return respond(request, response, status, badRequestString, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseObj = {
    message: 'This request has the required parameters',
    id: 'unauthorized',
  };
  let status = 200;

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseObj.message = 'Missing valid query parameters (?loggedIn=yes)';
    status = 401;
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseObj.message}</message>`;
    responseXML = `${responseXML}<id>${responseObj.id}</id>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, status, responseXML, 'text/xml');
  }

  const unauthorizedString = JSON.stringify(responseObj);
  return respond(request, response, status, unauthorizedString, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseObj.message}</message>`;
    responseXML = `${responseXML}<id>${responseObj.id}</id>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 403, responseXML, 'text/xml');
  }

  const forbiddenString = JSON.stringify(responseObj);
  return respond(request, response, 403, forbiddenString, 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseObj.message}</message>`;
    responseXML = `${responseXML}<id>${responseObj.id}</id>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 500, responseXML, 'text/xml');
  }

  const internalString = JSON.stringify(responseObj);
  return respond(request, response, 500, internalString, 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'A GET request for this page has not been implemented yet. Check again later for content',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseObj.message}</message>`;
    responseXML = `${responseXML}<id>${responseObj.id}</id>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 501, responseXML, 'text/xml');
  }

  const notImplementedString = JSON.stringify(responseObj);
  return respond(request, response, 501, notImplementedString, 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'Page not found',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<message>${responseObj.message}</message>`;
    responseXML = `${responseXML}<id>${responseObj.id}</id>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }

  const notFoundString = JSON.stringify(responseObj);
  return respond(request, response, 404, notFoundString, 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
