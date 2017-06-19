# NodeJS



### MongoDB



## 简介

官方地址：https://nodejs.org/en/

Node是JavaScript语言的服务器运行环境

所谓“运行环境”有两层意思：首先，JavaScript语言通过Node在服务器运行，在这个意义上，Node有点像JavaScript虚拟机；其次，Node提供大量工具库，使得JavaScript语言与操作系统互动（比如读写文件、新建子进程），在这个意义上，Node又是JavaScript的工具库

Node内部采用Google公司的V8引擎，作为JavaScript语言解释器；通过自行开发的libuv库，调用操作系统资源

Node采用V8引擎处理JavaScript脚本，最大特点就是单线程运行，一次只能运行一个任务。这导致Node大量采用异步操作（asynchronous opertion），即任务不是马上执行，而是插在任务队列的尾部，等到前面的任务运行完后再执行

### NodeJS是什么？

使用`JavaScript`进行后台的开发

服务器端的`JavaScript`解析器

NodeJS究竟是什么？https://www.ibm.com/developerworks/cn/opensource/os-nodejs/

### npm是什么？

NPM是Nodejs的包管理工具，全球最大的代码工厂。

在安装NodeJS到电脑上的时候，npm就会被一起安装在电脑上。

使用npm之前应先初始化一个package.json文件，来帮助我们更好的管理各种包。

```
初始化package.json文件，一步一步进行输入
$ npm init

初始化默认package.json文件
$ npm init -y
```

安装生产环境所需的包 `--save`

```
$ npm install --save moduleName
```

安装开发环境所需的包 `--save-dev`

```
$ npm install --save-dev mouduleName
```



## 安装

[官网 https://nodejs.org/en/](https://nodejs.org/en/)下载安装包，傻瓜式安装。

### 查看是否安装成功

输入命令，查看版本号即可，来证明是否安装成功

```
$ node -v
v4.4.7
```

```
$ npm -v
4.6.1
```

如果node版本号过低，可以通过node.js的`n`模块完成。

```
$ npm install -g n 安装n模块
$ n stable 安装最新稳定版本
$ n 6.10.3 根据版本号安装指定版本
```

如果npm版本号过低，则使用命令安装最新的npm包管理工具

```
$ npm install -g npm@latest 使用npm来安装npm
```

执行文件

```
$ node server 执行编写好的server.js文件，后缀可以省略
$ node server.js
```





### 安装cnpm

使用淘宝镜像，加快访问的速度

```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

使用

```
$ cnpm install --save express
```





## CommonJS

Node应用由模块组成，采用CommonJS模块规范。

### CommonJS简介

根据这个规范，每个文件就是一个模块，有自己的作用域。

在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

>   CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。
>
>   AMD规范则是非同步加载模块，允许指定回调函数。
>
>   由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以CommonJS规范比较适用。
>
>   但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范。

CommonJS特点：

*   所有代码都运行在模块作用域，不会污染全局作用域。
*   模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
*   模块加载的顺序，按照其在代码中出现的顺序。

### CommonJS定义模块

**example.js**

```javascript
var x = 5;
var addX = function (value) {
  return value + x;
};

// 对外导出变量和函数
// 写法1
module.exports.x = x;
module.exports.addX = addX;

// 写法2
module.exports = {
    x: x,
    addX: addX
};

// 写法3
exports.x = x;
exports.addX = addX;
// 注意，不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。
/* 此种写法错误
exports = {
    x: x,
    addX: addX
};
*/
```

**example2.js**

```javascript
module.exports = function () {
    var a = 10;
    var b = 20;
    return {
        sum: function () {
            return a + b;
        }
    };
};
```



### CommonJS导入模块

**server.js**

```javascript
// 引入模块
// ./example后缀js可以省略，默认为js。当然了，加上也不会报错
var example = require('./example');

// 使用模块
console.log(example.x);
console.log(example.addX(10));

var example2 = require('./example2.js');
var app = example2();
console.log(app.sum());
```





## 核心模块

如果只是在服务器运行JavaScript代码，用处并不大，因为服务器脚本语言已经有很多种了

Node.js的用处在于，它本身还提供了一系列功能模块，与操作系统互动。这些核心的功能模块，不用安装就可以使用

*   **http**：提供HTTP服务器功能
*   **url**：解析URL
*   **fs**：与文件系统交互
*   **querystring**：解析URL的查询字符串
*   **child_process**：新建子进程
*   **util**：提供一系列实用小工具
*   **path**：处理文件路径
*   **crypto**：提供加密和解密功能，基本上是对OpenSSL的包装



### http模块

`http`模块主要用于搭建HTTP服务。使用Node搭建HTTP服务器非常简单。

```javascript
// 引入对应的模块
var http = require('http');

// 创建服务、设置端口
http.createServer(function (request, response) {
    // 设置返回值信息
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // 设置返回信息
    response.write("Hello World");
    // 信息返回结束
    response.end();
}).listen(8888, '127.0.0.1', function () {
    // 启动成功的回调
    console.log('Server running on port 8888');
});
```



### fs模块

`fs`模块用于读取文件中的数据

**读取普通数据文件**

```javascript
/ 引入对应的模块
var http = require('http'),
    fs = require('fs');

// 创建服务、设置端口
http.createServer(function (request, response) {
    // 读取文件数据
    fs.readFile('data.txt', function (err, data) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(data);
    });
}).listen(8888, '127.0.0.1', function () {
    // 启动成功的回调
    console.log('Server running on port 8888');
});
```

**读取html文件返回**

```javascript
/ 引入对应的模块
var http = require('http'),
    fs = require('fs');

// 创建服务、设置端口
http.createServer(function (request, response) {
    // 读取文件数据
    fs.readFile('index.html', function (err, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
  
    // 或者下面这种写法
    // fs.createReadStream(`${__dirname}/index.html`).pipe(response);
}).listen(8888, '127.0.0.1', function () {
    // 启动成功的回调
    console.log('Server running on port 8888');
});
```

**根据输入不同的网址，进行不同数据的返回**

```javascript
// 引入对应的模块
var http = require('http'),
    fs = require('fs');

// 创建服务、设置端口
http.createServer(function (request, response) {
    // 根据输入不同的网址，进行不同的内容显示
    if (request.url == '/') {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("Welcome to the homepage!");
    } else if (request.url == '/about') {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("Welcome to about page!");
    } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end("404 Error! Not Fount!!");
    }
}).listen(8888, '127.0.0.1', function () {
    // 启动成功的回调
    console.log('Server running on port 8888');
});
```

上面代码只是单纯的返回文字，下面返回真是的网页

```javascript
// 根据输入不同的网址，进行不同的内容显示
if (request.url == '/') {
    fs.createReadStream(`${__dirname}/index.html`).pipe(response);
} else if (request.url == '/about') {
    fs.createReadStream(`${__dirname}/about.html`).pipe(response);
} else {
    fs.createReadStream(`${__dirname}/404.html`).pipe(response);
}
```



### url模块

如果现在在网址中添加参数，则会访问失败

需要添加url模块，来解析url地址

```javascript
var url = require('url');
// 获取url中的地址
var pathname = url.parse(request.url).pathname;
if (pathname == '/') {
    // ...
} else if (pathname == '/about') {
    // ...
} else {
    // ...
}
```



### querystring模块

用于解析出网址中的参数，将字符串转为对象

```javascript
var url = require('url'),
    querystring = require('querystring');

// ...
// 获取get请求的参数
var urlObj = url.parse(request.url);
var params = querystring.parse(urlObj.query);


// 获取post方式的参数
var paramData = '';
// 开始接受参数
request.addListener('data', function (postDataChunk) {
    paramData += postDataChunk;
});
// 数据接收完调用
request.addListener('end', function () {
    // 解析数据
    var params = querystring.parse(paramData);
    console.log(params);
});
```





### express模块（三方模块）

Express是目前最流行的基于Node.js的Web开发框架，可以快速地搭建一个完整功能的网站

1.  初始化配置文件

    ```
    $ npm install -y
    ```

2. 安装模块

    ```
    $ npm install --save express
    ```

    建议大家进行全局安装，这样不用每个项目都安装这个模块

    ```
    $ npm install -g express
    ```

3. 创建index.js文件，引入模块，编写服务器代码

    ```javascript
    var express = require('express');
    // 创建app，后续使用此app
    var app = express();
    ```

4. 添加路由代码

    ```javascript
    app.get('/', function (req, res) {
        req.send('home page');
    });
    app.get('/about', function (req, res) {
        req.send('about page');
    });

    // 设置启动端口
    app.listen(8888, function () {
        console.log('Server running on port 8888');
    });
    ```

5. 运行文件

    ```
    node index.js
    ```

6. 优化代码，将路由代码单独放置文件
    **router.js**

    ```javascript
    module.exports = function (app) {
        app.get('/', function (req, res) {
            res.send('home page');
        });
        app.get('/about', function (req, res) {
            res.send('about page');
        });
        app.get('/mine', function (req, res) {
            res.send('mine page');
        });
    };
    ```

7. 修改index.js中的代码，引入路由代码

    ```javascript
    var app = require('express')();
    require('./router')(app);
    app.listen(8888);
    ```

    ​

