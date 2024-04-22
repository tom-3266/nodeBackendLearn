const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

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

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`
);
const tempCards = fs.readFileSync(`${__dirname}/templates/template-card.html`);
const tempProducts = fs.readFileSync(
  `${__dirname}/templates/template-product.html`
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"); // written as synchronous because this is loaded only once
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // const pathName = req.url;
  //OVERVIEW
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const cardsHtml = data.map((el) => replaceTemplate(tempCards, el)).join("");
    const output = tempOverview.replace("{%PRODUCTCARDS%}", cardsHtml);
    res.end(output);
  }
  //PRODUCT
  else if (pathname === "/product") {
    console.log(query);
    const product = data[query.id];
    const output = replaceTemplate(tempProducts, product);
    res.end(output);
  }
  //API
  else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
    // res.end("API");
  }
  //PAGE NOT FOUND
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>PAGE NOT FOUND<h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request on port 8000");
});
