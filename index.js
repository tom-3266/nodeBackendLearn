const fs = require("fs");
const https = require("http");

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
const server = https.createServer((req, res) => {
  res.end("Hellp from the server");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request on port 8000");
});
