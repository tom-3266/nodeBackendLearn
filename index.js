const fs = require("fs");
const http = require("http");
const url = require("url");

/******************************/
/******** Synchronous *********/
/******************************/

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we knowo about the avocado ${textIn}. \n Created on ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written");

/*******************************/
/******** Asynchronous *********/
/*******************************/

// const textAsyncIn = fs.readFile("./txt/input.txt", "utf-8", (err, data) => {
//   console.log(data);
// });

// const hello = "Hello World";
// console.log(hello);
/////////////////////////

//SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"); // written as synchronous because this is loaded only once
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview")
    res.end("Hello from the OVERVIEW");
  else if (pathName === "/product") res.end("Hello from the PRODUCT");
  else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
    // res.end("API");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>PAGE NOT FOUND<h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request on port 8000");
});
