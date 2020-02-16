const Emitter = require('events').EventEmitter

// let eventHandler = function() {
//   console.log('processing')
// }

// let eventEmitter = new events.EventEmitter()


// eventEmitter.on('fn', eventHandler)
// eventEmitter.emit('fn')

// console.log('over')

let emitter = new Emitter()

emitter.on('fn', function() {
  console.log('fn1')
})

emitter.on('fn', function() {
  console.log('fn2')
})

emitter.on('fn', function() {
  console.log('fn3')
})

emitter.emit('fn')

let arr = emitter.listeners('fn')

console.log(arr)

emitter.addListener('fn',function() {
  console.log('fn4')
})

let arr1 = emitter.listeners('fn')

console.log(arr1)
