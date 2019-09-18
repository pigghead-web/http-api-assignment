const fs = require('fs')  // import filesystem module

// Create filepaths to both client.html and style.css
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// Create HTML responses for the filepaths declared above
const getIndex = (request, response) => {
    response.writeHead(200, {'Content-Type':'text/html'});
    response.write(index);
    response.end();
}

const getCss = (request, response) => {
    response.writeHead(200, {'Content-Type':'text/css'});
    response.write(css);
    response.end();
}

// Export
module.exports = {
    getIndex,
    getCss,
}