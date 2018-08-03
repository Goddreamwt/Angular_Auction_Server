import * as express from "express";
import {Server} from 'ws';

const app = express();


app.get('/', (req, res) => {
    res.send("Hello Express");
});

app.get('/api/products', (req, res) => {
    let result = products
    let params = req.query;
    if (params.title) {
        result =result.filter((p) => p.title.indexOf(params.title) !== -1);
    }

    if (params.price  && params.price !=='null'&&  result.length > 0) {
        result =result.filter((p) => p.price <= parseInt(params.price));
    }

    if (params.category && params.category !== "-1" && result.length > 0) {
        result =result.filter((p) => p.categories.indexOf(params.category) !== -1);
    }
    res.json(products);
});

app.get('/api/product/:id', (req, res) => {
    res.json(products.find((product) => product.id == req.params.id));
});

app.get('/api/product/:id/comments', (req, res) => {
    res.json(comments.filter((comment: Comment) => comment.productId == req.params.id));
});

const server = app.listen(8000, "localhost", () => {
    console.log("服务器已启动，地址是：http://localhost:8000");
});

const wsServer = new Server({port: 8085});
wsServer.on("connection", websocket => {
    websocket.send("这个消息是服务器主动推送的");
    websocket.on("message", message => {
        console.log("接收到消息：" + message);
    });
})


//定时给所有客户端推送消息
setInterval(() => {
    if (wsServer.clients) {
        wsServer.clients.forEach(client => {
            client.send("这是定时推送");
        })
    }
}, 2000);


export class Product {
    constructor(public id: number,
                public title: string,
                public price: number,
                public rating: number,
                public desc: string,
                public categories: Array<string>) {

    }
}

export class Comment {
    constructor(public  id: number,
                public productId: number,
                public timestamp: string,
                public user: string,
                public rating: number,
                public content: string) {

    }
}


const products: Product[] = [
    new Product(1, '第一个商品', 1.99, 3.5, "这是第一商品，asdxc奥术大师多撒", ["电子产品", "硬件设备", "其他"]),
    new Product(2, '第二个商品', 2.99, 2.5, "这是第二商品，奥术大师多驱蚊器二无", ["硬件设备", "其他"]),
    new Product(3, '第三个商品', 3.99, 1.5, "这是第三商品，请问驱蚊器翁群翁", ["电子产品", "硬件设备"]),
    new Product(4, '第四个商品', 4.99, 2.0, "这是第四商品，切勿驱蚊器翁", ["电子产品", "其他"]),
    new Product(5, '第五个商品', 5.99, 3.5, "这是第五商品，213123123", ["电子产品", "硬件设备", "其他"]),
    new Product(6, '第六个商品', 6.99, 4.5, "这是第六商品，啊多少大所多多", ["电子产品", "硬件设备", "其他"])
];

const comments: Comment[] = [
    new Comment(1, 1, "2017-02-02 22:22:22", "张三", 3, "东西不错"),
    new Comment(2, 2, "2017-03-02 23:22:22", "李四", 4, "东西挺不错"),
    new Comment(3, 3, "2017-04-02 24:22:22", "王五", 2, "东西不错"),
    new Comment(4, 4, "2017-05-02 25:22:22", "赵六", 1, "东西还不错"),
    new Comment(5, 5, "2017-06-02 26:22:22", "哈哈", 3, "东西不错"),
];