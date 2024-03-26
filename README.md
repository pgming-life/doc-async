# doc-async

# Description
Asynchronously reads a text file or HTML source into HTML.  
This is useful when you want to reflect frequently rewritten information such as updated information without modifying the original HTML.  
Since the basic HTML source does not have to be rewritten, it is advantageous for SEO.  
If you want to display the text file contents itself in a browser, the file to be read must be prepared in UTF-8 with BOM. (If BOM is not included, characters may be garbled depending on the browser)

# About placement
▼Write the following in "&lt;head&gt;"
```html
<head>
    <script async src="doc_async.js"></script>
</head>
```
▼Need a tag with an id corresponding to the file you want to read in the HTML
```html
<body>
<pre>
<span id="result">Loading...</span>
</pre>
</body>
```

# Development
1. Install Node.js (Windows)

### ▼Node.js command prompt
2. Create directory
```
$ mkdir doc-async
$ cd doc-async
```

3. Create project
```
$ node -v
$ npm -v
$ npm update -g npm
$ npm update -g
$ npm init
```
  
## Testing
4. Install express
```
$ npm install --save express
```

5. Create server.js
```javascript
const http = require('http');
const express = require('express');

const app = express();

app.get("/", function(req, res) {
    return res.send("Hello World");
});

const server = http.createServer(app);
server.listen(3000);
```

6. Test
```
$ node server.js
```

7. Local host access
http://localhost:3000/

### Display of HTML
8. Directory Tree
<pre>
[doc-async]
    ├── node_modules
    │
    ├── server.js
    │
    └── index.html
</pre>

9. Install fs and glob
```
npm install --save fs
npm install --save glob
```

10. server.js
```javascript
const http = require('http');
const fs = require('fs');

var server = http.createServer(
    (request, response) => {
        fs.readFile('./index.html', 'UTF-8', (error, data) => {
            response.writeHead(200, {'Content-Type':'text/html'});
            response.write(data);
            response.end();
        })
    }
);

server.listen(3000);
```

11. index.html
```html
<!DOCTYPE html>
<html lang="js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello HTML</h1>
</body>
</html>
```

12. Test
```
node server.js
```

13. Local host access
http://localhost:3000/

# Deploy
### Upload to server
<pre>
[doc-async]
   ├── doc
   │
   ├── doc_async.js
   │
   └── index.html
</pre>