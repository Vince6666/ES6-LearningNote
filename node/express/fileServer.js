const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')
let app = express()



app.use(bodyParser.urlencoded({extended: false}))
app.use(multer({dest: '/img/'}).array('image'))

app.post('/file_upload', function(req, res) {
  console.log(req.files[0])
  console.log(req.files[1])

  let des_file0 = __dirname + '\\' + req.files[0].originalname
  let des_file1 = __dirname + '\\' + req.files[1].originalname
  let response = []
  // console.log(des_file1)

  processFiles(req.files[0].path, des_file0, response)
  console.log(response)

  processFiles(req.files[1].path, des_file1, response)

  console.log(response)
  res.end(response.toString())
  // function processFiles(uploadedPath, savePath) {
  //   fs.readFile(uploadedPath, function(err, data) {
  //     if (err) {
  //       console.log(err)
  //     }
  //     fs.writeFile(savePath, data, function(err) {
  //       if (err) {
  //         console.log(err)
  //       } else {
  //         response = []
  //         response.push({
  //           message: "File uploaded successfully.",
  //           filename: uploadedPath.originalname
  //         })
  //       }
        
  //     })
  //   })
  // }

  // fs.readFile(req.files[0].path, function(err, data) {
  //   fs.writeFile(des_file, data, function(err) {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       response = {
  //         message: "File uploaded successfully.",
  //         filename: req.files[0].originalname
  //       }
  //     }

  //     console.log(response)
  //     res.end(JSON.stringify(response))
  //   })
  // })
  function processFiles(uploadedPath, savePath, response) {
    fs.readFile(uploadedPath, function(err, data) {
      if (err) {
        console.log(err)
      }
      fs.writeFile(savePath, data, function(err) {
        if (err) {
          console.log(err)
        } else {
          response.push(JSON.stringify({
            message: "File uploaded successfully.",
            filename: uploadedPath.originalname
          }))
        }
      })
    })
  }

})

let server = app.listen(8002, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})