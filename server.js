const http = require('http');
const url = require('url');
const fs = require('fs');
const glob = require('glob');

const index = "index.html";
const dirs = [
    "doc"
];

const server = http.createServer(RouteSetting);
server.listen(process.env.PORT || 3000, () => {
    console.log("listening on 3000...");
});

function RouteSetting(request, response) {
    let pageName = "";
    
    // Read files (Other than index.html)
    var pages = [];
    var files = glob.sync("*", {nodir: true});
    files.forEach(function(file) {
        pages.push("/" + file.replace(/\\/g, "/"));
    });
    dirs.forEach(function(dir) {
        files = glob.sync(dir + "/*", {nodir: true});
        files.forEach(function(file) {
            pages.push("/" + file.replace(/\\/g, "/"));
        });
    });
    
    // Router
    const urlParts = url.parse(request.url);
    if (urlParts.pathname == "/") {     // index.html
        pageName = "/" + index;
    }
    else {                              // other
        for (i = 0; i < pages.length; i++) {
            if (urlParts.pathname == pages[i]) {
                pageName = pages[i];
                break;
            }
        }
    }
    
    // Display
    fs.readFile("." + pageName, getOption(pageName), (error, data) => {
        if (error) {    // Failure
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write("Page Not Found!");
        }
        else {          // Success
            response.writeHead(200, {'Content-Type': getType(pageName)});
            response.write(data);
        }
        response.end();
    })
}

function getOption(_pageName) {
    const options = {
        ".html": "utf-8",
        ".css": "utf-8",
        ".js": "utf-8",
        ".png": "",
        ".jpg": "",
        ".gif": "",
        ".svg": ""
    }
    for (var key in options) {
        if (_pageName.endsWith(key)) {
            return options[key];
        }
    }
    return "utf-8";         // Failure
}

function getType(_pageName) {
    const types = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "svg+xml"
    }
    for (var key in types) {
        if (_pageName.endsWith(key)) {
            return types[key];
        }
    }
    return "text/plain";    // Failure
}