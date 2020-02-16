const fs = require('fs')

// 阻塞代码
// let data = fs.readFileSync('test.txt')
// console.log(data.toString())
// console.log('over')


// 非阻塞
let data = fs.readFile('test.txt', (err, data) => {
  if(err) console.log(err)
  console.log(data.toString())
})
console.log('over')
