// console.log(arguments);
// console.log(require("module").wrapper);

const calc = require("./test-module.js");

const c = new calc();
console.log(c.add(10, 5));

const calc1 = require("./test-module1.js");
console.log(calc1.add(10, 5));

//CACHING

require("./test-module2.js")();
require("./test-module2.js")();
require("./test-module2.js")();
