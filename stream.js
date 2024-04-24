const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //Soliution 1
  /*fs.readFile("test-file.txt", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });*/

  //Solution 2 : Strems
  //here the data is unabele to be send as fast as we are recieveing it and this is called backpreassure
  /*const readable = fs.createReadStream("test-file.txt");
  readable.on("data", (chunk) => {
    res.write(chunk);
  });
  readable.on("end", () => {
    res.end();
  });
  readable.on("error", (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end("File not found");
  });*/

  //Solution : piping
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening...");
});
