# Angular_Auction_Server

创建Web服务器
-
使用Nodejs创建服务器
使用Express创建restful的http服务
监控服务器文件的变化

首先新建一个文件夹名为server


> cd 文件目录/server
> npm init -y
> npm i @types/node --save

webStrom打开server文件
新建tsconfig.json配置文件

```
{
//  编译器配置
"compilerOptions": {
"target": "es5",
"module": "commonjs",
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
"outDir": "build",
"lib": ["es6"]
},
"exclude": [
"node_modules"
]
}
```

配置WebStrom
![这里写图片描述](https://img-blog.csdn.net/20180801110041957?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3d0ZGFzaw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

新建一个server文件夹，在其下面创建一个typeScript类hello_server.ts

```
/**
* Created by mac on 2018/8/1.
*/
import * as http from 'http'

const server = http.createServer((request,response) =>{
response.end("Hello Node!");
});

server.listen(8000);
```

build目录下hello_server.js

```

var http =require('http');

var server = http.createServer(function(request,response){
response.end("Hello Node!");
});

server.listen(8000);
```

> node build/hello_server.js

![这里写图片描述](https://img-blog.csdn.net/20180801113025317?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3d0ZGFzaw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

安装express

> npm install express --save
> npm install @types/express --save


新建auction_server.ts

```
import * as http from 'http'

const server = http.createServer((request,response) =>{
response.end("Hello Node!");
});

server.listen(8000);
```

生成的auction_server.js

```
"use strict";

var express = require("express");
var app = express();
app.get('/', function (req, res) {
res.send("Hello Express");
});
app.get('/products', function (req, res) {
res.send("接收到商品查询请求");
});
var server = app.listen(8000, "localhost", function () {
console.log("服务器已启动，地址是：http://localhost:8000");
});

```

> node build/auction_server.js

![这里写图片描述](https://img-blog.csdn.net/20180801144558376?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3d0ZGFzaw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

![这里写图片描述](https://img-blog.csdn.net/20180801144644918?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3d0ZGFzaw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

为了方便调试，安装nodemon，它会监听源代码，当代码变动时，自动重启node服务

> npm install -g nodemon
> nodemon build/auction_server.js

添加测试数据
auction_server.js

```
"use strict";
var express = require("express");
var app = express();
var Product = (function () {
function Product(id, title, price, rating, desc, categories) {
this.id = id;
this.title = title;
this.price = price;
this.rating = rating;
this.desc = desc;
this.categories = categories;
}
return Product;
}());
exports.Product = Product;
var products = [
new Product(1, '第一个商品', 1.99, 3.5, "这是第一商品，asdxc奥术大师多撒", ["电子产品", "硬件设备", "其他"]),
new Product(2, '第二个商品', 2.99, 2.5, "这是第二商品，奥术大师多驱蚊器二无", ["硬件设备", "其他"]),
new Product(3, '第三个商品', 3.99, 1.5, "这是第三商品，请问驱蚊器翁群翁", ["电子产品", "硬件设备"]),
new Product(4, '第四个商品', 4.99, 2.0, "这是第四商品，切勿驱蚊器翁", ["电子产品", "其他"]),
new Product(5, '第五个商品', 5.99, 3.5, "这是第五商品，213123123", ["电子产品", "硬件设备", "其他"]),
new Product(6, '第六个商品', 6.99, 4.5, "这是第六商品，啊多少大所多多", ["电子产品", "硬件设备", "其他"])
];
app.get('/', function (req, res) {
res.send("Hello Express");
});
app.get('/products', function (req, res) {
res.json(products);
});
var server = app.listen(8000, "localhost", function () {
console.log("服务器已启动，地址是：http://localhost:8000");
});

```

auction_server.js

```
"use strict";
var express = require("express");
var app = express();
var Product = (function () {
function Product(id, title, price, rating, desc, categories) {
this.id = id;
this.title = title;
this.price = price;
this.rating = rating;
this.desc = desc;
this.categories = categories;
}
return Product;
}());
exports.Product = Product;
var products = [
new Product(1, '第一个商品', 1.99, 3.5, "这是第一商品，asdxc奥术大师多撒", ["电子产品", "硬件设备", "其他"]),
new Product(2, '第二个商品', 2.99, 2.5, "这是第二商品，奥术大师多驱蚊器二无", ["硬件设备", "其他"]),
new Product(3, '第三个商品', 3.99, 1.5, "这是第三商品，请问驱蚊器翁群翁", ["电子产品", "硬件设备"]),
new Product(4, '第四个商品', 4.99, 2.0, "这是第四商品，切勿驱蚊器翁", ["电子产品", "其他"]),
new Product(5, '第五个商品', 5.99, 3.5, "这是第五商品，213123123", ["电子产品", "硬件设备", "其他"]),
new Product(6, '第六个商品', 6.99, 4.5, "这是第六商品，啊多少大所多多", ["电子产品", "硬件设备", "其他"])
];
app.get('/', function (req, res) {
res.send("Hello Express");
});
app.get('/products', function (req, res) {
res.json(products);
});
app.get('/products/:id', function (req, res) {
res.json(products.find(function (product) { return product.id == req.params.id; }));
});
var server = app.listen(8000, "localhost", function () {
console.log("服务器已启动，地址是：http://localhost:8000");
});

```
![这里写图片描述](https://img-blog.csdn.net/20180801152152976?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3d0ZGFzaw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

