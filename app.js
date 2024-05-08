const express = require('express');
const app = express();
require('axios');
require('dotenv').config();
const mysql = require('mysql2');
// const {syncModel} = require("./src/mysql/User");
// const {syncModel_Product} = require("./src/mysql/Product");
// const {syncModel_ShoppingCart} = require("./src/mysql/ShoppingCart");
// const {syncModel_Order} = require("./src/mysql/Order");
// const {syncModel_Message} = require("./src/mysql/Message");
const controllers = require('./src/controllers/index');
const {serve, setup} = require("swagger-ui-express");
const swaggerDocument = require('./config/swagger.json');

// 创建数据库连接
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// 连接到数据库
connection.connect(async (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('[nodemon] 连接到数据库');
    // 初始化数据库表格
    // await syncModel();
    // await syncModel_Product();
    // await syncModel_ShoppingCart();
    // await syncModel_Order();
    // await syncModel_Message();
    // console.log('[nodemon] 数据库表格创建成功');

});


// 中间件，用于解析请求体中的 JSON 数据
app.use(express.json());

// 路由处理程序
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// 注册所有控制器
for (const controllerPath in controllers) {
    const routes = controllers[controllerPath];
    // for (const key in routes) { // 将变量名从 route 改为 key
        // const route = routes[key];
        // console.log("Registering routes for controller:", controllerPath);
        const method = routes.method; // 从 route 改为 key
        // console.log("Method:", method);
        const handler = routes.handler;
        // console.log(method, controllerPath, handler.name);
        app[method](controllerPath, handler); // 从 route 改为 key
    // }
}

// 使用官方中间件来提供 Swagger UI
app.use('/api-docs', serve, setup(swaggerDocument, {
    swaggerUrl: '/api-docs/swagger.json', // Swagger 规范的路径
}));

// 列出所有路由
app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(`[Route]: ${Object.keys(middleware.route.methods).join(', ')} ${middleware.route.path}`);
    }
});

// 启动服务器
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
app.listen(PORT, HOST, () => {
    console.log(('[nodemon] Server is starting...'))
    console.log(`[nodemon] Server is starting on http://${HOST}:${PORT}`);
    console.log(`[nodemon] swagger is starting on http://${HOST}:${PORT}/api-docs`);
});
