// #!/usr/bin/env node
var http = require('http')
var fs = require('fs')
var url = require('url')

var port = process.env.port || 7777;
var server = http.createServer(function(request,response){

    var temp = url.parse(request.url,true)
    var path = temp.pathname
    var query = temp.query
    var method = request.method

    if(path === '/'){
        var string = fs.readFileSync('./index.html','utf-8')
        var amount = fs.readFileSync('./db','utf-8')
        string = string.replace('&&&amount&&&',amount)
        response.setHeader('Content-Type','text/html;charset=utf-8')
        response.write(string)
        response.end()
    }else if(path === '/style.css'){
        var string = fs.readFileSync('./style.css','utf-8')
        response.setHeader('Content-Type','text/css')
        response.write(string)
        response.end()
    }else if(path === '/main.js'){
        var string = fs.readFileSync('./main.js','utf-8')
        response.setHeader('Content-Type','text/javascript')
        response.write(string)
        response.end()
    }else if(path === '/payForm' && method.toUpperCase() === 'POST'){
        var amount = fs.readFileSync('./db','utf-8')
        if(Math.random()>0.5){
            amount = amount - 1
            fs.writeFileSync('./db',amount)
            response.write('success')
        }else{
            response.write('failed')
        }
        response.end()
    }else if(path === '/payImage'){
        var amount = fs.readFileSync('./db','utf-8')
        if(Math.random()>0.5){
            response.setHeader('Content-Type','image/png')
            response.statusCode = 200
            amount = amount - 1
            fs.writeFileSync('./db',amount)
            // response.write('打钱成功')
        }else{
            response.statusCode = 400
            // response.write('打钱失败')
        }
        response.end()
    }else if(path === '/payScript'){
        var amount = fs.readFileSync('./db','utf-8')
        if(Math.random()>0.5){
            response.setHeader('Content-Type','text/javascript')
            response.statusCode = 200
            amount = amount - 1
            fs.writeFileSync('./db',amount)
            response.write('alert("script方法打钱成功(此消息发自服务器)");amount.innerText = amount.innerText - 1')
            // response.write('打钱成功')
        }else{
            response.statusCode = 400
            // response.write('打钱失败')
        }
        response.end()
    }else{
        response.statusCode = 404
        response.setHeader('Content-Type','text/html;charset=utf-8')
        response.write('找不到路径')
        response.end()
    }

    console.log(method + ' ' + request.url)
})

server.listen(port)
console.log('监听 ' + port + '成功，请打开 http://localhost:' + port)