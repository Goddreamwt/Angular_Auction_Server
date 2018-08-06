"use strict";
var express = require("express");
var ws_1 = require('ws');
var app = express();
var path = require("path");

app.use('/',express.static(path.join(__dirname,'..','client')));

app.get('/api/products', function (req, res) {
    var result = products;
    var params = req.query;
    console.log(params);
    if (params.title) {
        result = result.filter(function (p) { return p.title.indexOf(params.title) !== -1; });
    }
    if (params.price && params.price !== 'null' && result.length > 0) {
        result = result.filter(function (p) { return p.price <= parseInt(params.price); });
    }
    if (params.category && params.category !== "-1" && result.length > 0) {
        result = result.filter(function (p) { return p.categories.indexOf(params.category) !== -1; });
    }
    res.json(result);
});
app.get('/api/product/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
app.get('/api/product/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.productId == req.params.id; }));
});
var server = app.listen(8000, "localhost", function () {
    console.log("服务器已启动，地址是：http://localhost:8000");
});
//关注的商品id集合
var subscriptions = new Map();
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (websocket) {
    // websocket.send("这个消息是服务器主动推送的");
    websocket.on("message", function (message) {
        var messageObj = JSON.parse(message);
        var productIds = subscriptions.get(websocket) || [];
        subscriptions.set(websocket, productIds.concat([messageObj.productId]));
    });
});
//价格集合
var currentBids = new Map();
//每两秒更新价格
setInterval(function () {
    products.forEach(function (p) {
        var currentBid = currentBids.get(p.id) || p.price;
        var newBid = currentBid + Math.random() * 5;
        currentBids.set(p.id, newBid);
    });
    subscriptions.forEach(function (productIds, ws) {
        if (ws.readyState === 1) {
            var newBids = productIds.map(function (pid) { return ({
                productId: pid,
                bid: currentBids.get(pid)
            }); });
            ws.send(JSON.stringify(newBids));
        }
        else {
            subscriptions.delete(ws);
        }
    });
}, 2000);
//定时给所有客户端推送消息
// setInterval(() => {
//     if (wsServer.clients) {
//         wsServer.clients.forEach(client => {
//             client.send("这是定时推送");
//         })
//     }
// }, 2000);
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
var Comment = (function () {
    function Comment(id, productId, timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var products = [
    new Product(1, '第一个商品', 1.99, 3.5, "这是第一商品，asdxc奥术大师多撒", ["电子产品", "硬件设备", "其他"]),
    new Product(2, '第二个商品', 2.99, 2.5, "这是第二商品，奥术大师多驱蚊器二无", ["硬件设备", "其他"]),
    new Product(3, '第三个商品', 3.99, 1.5, "这是第三商品，请问驱蚊器翁群翁", ["电子产品", "硬件设备"]),
    new Product(4, '第四个商品', 4.99, 2.0, "这是第四商品，切勿驱蚊器翁", ["电子产品", "其他"]),
    new Product(5, '第五个商品', 5.99, 3.5, "这是第五商品，213123123", ["电子产品", "硬件设备", "其他"]),
    new Product(6, '第六个商品', 6.99, 4.5, "这是第六商品，啊多少大所多多", ["电子产品", "硬件设备", "其他"])
];
var comments = [
    new Comment(1, 1, "2017-02-02 22:22:22", "张三", 3, "东西不错"),
    new Comment(2, 2, "2017-03-02 23:22:22", "李四", 4, "东西挺不错"),
    new Comment(3, 3, "2017-04-02 24:22:22", "王五", 2, "东西不错"),
    new Comment(4, 4, "2017-05-02 25:22:22", "赵六", 1, "东西还不错"),
    new Comment(5, 5, "2017-06-02 26:22:22", "哈哈", 3, "东西不错"),
];
