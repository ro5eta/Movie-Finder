//imports
const http = require('http');
require('dotenv').config();
const fs = require('fs');

//server variables & more
const hostname = '127.0.0.1';
const port = 3000;
const ak = process.env.API_KEY;
const headers = ['text/html','text/css', 'text/javascript', 'application/json', 'text/plain'];

//files to be served to the client
var index = "";
fs.readFile('./views/index.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  index = data.toString();
});;
var styles = "";
fs.readFile('./css/style.css', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  styles = data.toString();
});;
var js = "";
fs.readFile('./js/script.js', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  js = data.toString();
});;

//server requests (handler)
const server = http.createServer((req, res) => {
  if(req.url == "/css/style.css"){
    res.statusCode = 200;
    res.setHeader('Content-Type', headers[1]);
    res.end(styles);
  }else if(req.url == "/js/script.js"){
    res.statusCode = 200;
    res.setHeader('Content-Type', headers[2]);
    res.end(js);
  } else if(req.url == "/") {
    res.statusCode = 200;
    res.setHeader('Content-Type', headers[0]);
    res.end(index);
  } else if(req.url == "/genres") {
    var urlGET = 'http://api.themoviedb.org/3/genre/movie/list?api_key=' + ak +  "&language=en-US";
    const rq = http.request(urlGET, (rs) => {
      let data = '';
      rs.on('data', (chunk) => {
          data += chunk;
      });
      // Ending the response 
      rs.on('end', () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', headers[3]);
          res.end(data);
      });
         
    }).on("error", (err) => {
      console.log("Error: ", err)
    }).end()
  } else if(req.url.includes("/results")) {
    let text = new URL(req.url,`http://${req.headers.host}`).searchParams;
    var urlGET = 'http://api.themoviedb.org/3/search/movie?api_key=' + ak +  "&query=" + text;
    const rq = http.request(urlGET, (rs) => {
      let data = '';
      rs.on('data', (chunk) => {
        data += chunk;
      });
      // Ending the response 
      rs.on('end', () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', headers[3]);
        res.end(data);
      });
         
    }).on("error", (err) => {
      console.log("Error: ", err)
    }).end()
  }
});

//server ("init") listener
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
