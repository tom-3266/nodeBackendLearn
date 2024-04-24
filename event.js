const http = require("http");

const EventEmitter = require("events");
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();

myEmitter.on("onSale", () => {
  console.log("There is a sale");
});
myEmitter.on("onSale", () => {
  console.log("Customer name : Tom");
});
myEmitter.on("onSale", (stock) => {
  console.log(`The stock is ${stock}`);
});
myEmitter.emit("onSale", 9);

///////////////////////////////////////

const server = http.createServer();
server.on("request", (req, res) => {
  console.log("request recieved");
  console.log(req.url);
  res.end("Request recieved");
});

server.on("request", (req, res) => {
  console.log("Another request");
});

server.close("close", () => {
  console.log("server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to port 8000");
});
