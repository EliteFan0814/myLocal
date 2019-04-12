window.onload = function () {
    // form提交，转移到iframe刷新
    formSub.onclick = function () {
        setTimeout(function () {
            let iframe = window.frames['result'].document
            let result = iframe.body.innerText
            if (result === 'success') {
                amount.innerText = amount.innerText - 1
            }
        }, 1000)
    }
    // 利用图片的 get 请求
    btnImg.onclick = function () {
        let image = document.createElement('img')
        image.src = 'http://server.com:8888/payImage'
        image.onload = function () {
            alert('image方法打钱成功')
            amount.innerText = amount.innerText - 1
        }
        image.onerror = function () {
            alert('image方法打钱失败')
        }
    }
    // 利用 script 的 get 请求(srj方案)
    btnScript.onclick = function () {
        let script = document.createElement('script')
        script.src = '/payScript'
        document.body.appendChild(script)
        script.onload = function (event) {
            event.currentTarget.remove()
        }
        script.onerror = function () {
            alert('script方法打钱失败(此消息发自网页本身)')
            event.currentTarget.remove()
        }
    }
    // 利用 JSONP 的 get 请求 alpha测试版 (可以跨域)
    function callFunction(result) {
        alert('这是调用的客户端 callback 函数,剩余存款为：' + result)
    }
    btnJsonpAlpha.onclick = function () {
        let script = document.createElement('script')
        script.src = 'http://server.com:8888/payJsonpAlpha?callback=callFunction'
        document.body.appendChild(script)
        script.onload = function (event) {
            event.currentTarget.remove()
        }
        script.onerror = function () {
            alert('script方法打钱失败(此消息发自网页本身)')
            event.currentTarget.remove()
        }
    }
    // 利用 JSONP 的 get 请求 beta测试版 (可以跨域)
    btnJsonpBeta.onclick = function () {
        let script = document.createElement('script')
        let funcName = 'fpc' + parseInt(Math.random() * 10000)

        window[funcName] = function (result) {
            alert('这是调用的客户端 callback 函数,剩余存款为：' + result)
        }
        script.src = 'http://server.com:8888/payJsonpBeta?callback=' + funcName
        document.body.appendChild(script)
        script.onload = function (event) {
            event.currentTarget.remove()
        }
        script.onerror = function () {
            alert('script方法打钱失败(此消息发自网页本身)')
            event.currentTarget.remove()
        }
    }
    // 利用 jQuery 中的 JSONP (可以跨域)
    btnJqueryJsonp.onclick = function () {
        $.ajax({
            url: 'http://server.com:8888/payJquery',
            dataType: 'jsonp',
            success: function (result) {
                alert('这是调用的客户端 callback 函数,剩余存款为：' + result)
            }
        })
    }
    // 利用 AJAX 的 XMLHttpRequest 请求一段 XML (不能跨域)
    btnAJAXXML.onclick = function () {
        let request = new XMLHttpRequest()
        request.open('post', 'http://client.com:7777/AJAXXML')
        request.send()
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    let string = request.responseText
                    console.log('请求成功' + string)
                    let parser = new DOMParser()
                    let xmlDom = parser.parseFromString(string, 'text/xml')
                    let from = xmlDom.getElementsByTagName('from')[0].textContent
                    console.log(from)
                } else {
                    console.log('请求失败')
                }
            }
        }
    }
    // 利用 AJAX 的 XMLHttpRequest 请求一段 JSON (不能跨域)
    btnAJAXJSON.onclick = function () {
        let request = new XMLHttpRequest()
        request.open('post', 'http://client.com:7777/AJAXJSON')
        request.send()
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    let string = request.responseText
                    console.log('请求成功' + string)
                    let obj = window.JSON.parse(string)
                    console.log(obj.note.body)
                } else {
                    console.log('请求失败')
                }
            }
        }
    }
    // 利用 AJAX 的 XMLHttpRequest 尝试跨域请求一段 JSON (AJAX并不能跨域请求)
    // 响应会成功，但是并不能操作返回的数据
    btnAJAXJSONCross.onclick = function () {
        let request = new XMLHttpRequest()
        request.onreadystatechange = function () {
            console.log('readyState 为：' + request.readyState)
            if (request.readyState === 4) {
                console.log('status 为：' + request.status)
                if (request.status >= 200 && request.status < 300) {
                    let string = request.responseText
                    console.log('请求成功' + string)
                    let obj = window.JSON.parse(string)
                    console.log(obj.note.body)
                } else {
                    console.log('请求失败')
                }
            }
        }
        request.open('post', 'http://server.com:8888/AJAXJSONCross')
        request.send()
    }
    // 利用 AJAX CORES 尝试跨域请求一段 JSON
    btnAJAXJSONCrossCORS.onclick = function () {
        let request = new XMLHttpRequest()
        request.onreadystatechange = function () {
            console.log('readyState 为：' + request.readyState)
            if (request.readyState === 4) {
                console.log('status 为：' + request.status)
                if (request.status >= 200 && request.status < 300) {
                    let string = request.responseText
                    console.log('请求成功' + string)
                    let obj = window.JSON.parse(string)
                    console.log(obj.note.body)
                } else {
                    console.log('请求失败')
                }
            }
        }
        request.open('post', 'http://server.com:8888/AJAXJSONCrossCORS')
        request.send()
    }
    btnJquerytest.onclick = function () {
        let request = new XMLHttpRequest()
        request.open('post', 'http://client.com:7777/AJAXJSONCrossCORS')
        request.setRequestHeader('fpc','syq')
        // request.setRequestHeader('Content-Type','x-www-form-urlencoded')
        request.send('这是我设置的第四部分')
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    let string = request.responseText
                    console.log('请求成功' + string)
                    let obj = window.JSON.parse(string)
                    console.log(obj.note.body)
                } else {
                    console.log('请求失败')
                    let string = request.responseText
                    console.log(string)
                }
            }
        }

        // let script = document.createElement('script')
        // script.src = 'https://testapi.internet.bs/Domain/Check?ApiKey=testapi&Password=testpass&Domain=example.com'
        // document.body.appendChild(script)
        // script.onload = function (event) {
        //     console.log(event.currentTarget)
        // }
        // script.onerror = function () {
        //     alert('失败')
        // }

        // let request = new XMLHttpRequest()
        // request.open('post','https://testapi.internet.bs/Domain/Check?ApiKey=testapi&Password=testpass&Domain=example.com')
        // request.send()
        // request.onreadystatechange = function(){
        //     if(request.readyState === 4){
        //         if(request.status >= 200 && request.status < 300){
        //             console.log('请求成功')
        //             let string = request.responseText
        //             console.log(string)
        //         }else{
        //             console.log('请求失败')
        //         }
        //     }
        // }

        // $.ajax({
        //     url: 'https://testapi.internet.bs/Domain/Check?ApiKey=testapi&Password=testpass&Domain=example.com',
        //     dataType: 'plain',
        //     success: function(result){
        //         console.log(result)
        //     }
        // })
    }
    btnJqueryPromise.onclick = function () {
        $.ajax({
            url: 'http://client.com:7777/payScriptPromise',
            method:'get'
            // dataType: 'jsonp',
            // success: function (result) {
            //     alert('这是调用的客户端 callback 函数,剩余存款为：' + result)
            // }
        }).then(function(result){
            console.log('成功'+ result)
            return ('成功1')
        },function(result){
            console.log('失败'+ result)
            return ('失败1')
        }).then((result)=>{
            console.log(result)
        },(result)=>{
            console.log(result)
        })
    }
}