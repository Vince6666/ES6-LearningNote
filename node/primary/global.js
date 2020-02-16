let counter = 10

console.time('获取数据')



// console.dir(process.env)

var util = require('util'); 
function Person() { 
    this.name = 'byvoid'; 
    this.toString = function() { 
    return this.name; 
    }; 
} 
var obj = new Person(); 
// console.log(util.inspect(obj)); 
// console.log(util.inspect(obj, true)); 
console.log(util.inspect(obj, true, 3, true)); 







console.timeEnd("获取数据")