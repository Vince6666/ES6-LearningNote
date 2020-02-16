const fs = require('fs')

// fs.stat('./event.js', function (err, stats) {
//   console.log(stats.isFile());
//   console.log(stats.isDirectory());
// })

fs.open('./test.txt', 'r+', function(err, fd) {
  console.log(fd)
  console.log(typeof fd)
})

fs.writeFile('./test.txt', 'cccqq', {
  mode: 0666 
}, function(err) {
  console.log(err)
})