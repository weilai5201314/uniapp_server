const express = require('express');
const app = express();
// require('axios');
require('dotenv').config();
const mysql = require('mysql2');
const {syncModel} = require("./src/mysql/User");
const {syncModel_Product} = require("./src/mysql/Product");
const {syncModel_ShoppingCart} = require("./src/mysql/ShoppingCart");
const {syncModel_Order} = require("./src/mysql/Order");
const {syncModel_Message} = require("./src/mysql/Message");
// const controllers = require('./src/controllers/user');
const {serve, setup} = require("swagger-ui-express");
const swaggerDocument = require('./config/swagger.json');

const fs = require('fs');
const path = require('path');

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

    console.log('[nodemon] 已连接到数据库');

    // 读取 DB_CREATED 环境变量的值
    const dbCreated = process.env.DB_CREATED === 'true';
    // 如果 DB_CREATED 为 false，则执行表格创建函数并将 DB_CREATED 设置为 true
    if (!dbCreated) {
        try {
            // 初始化数据库表格
            await syncModel();
            await syncModel_Product();
            await syncModel_ShoppingCart();
            await syncModel_Order();
            await syncModel_Message();

            console.log('[nodemon] 数据库表格创建成功');
            // 修改 DB_CREATED 的值为 true
            fs.writeFileSync('.env', fs.readFileSync('.env', 'utf8').replace('DB_CREATED=false', 'DB_CREATED=true'));

        } catch (error) {
            console.error('Error synchronizing database tables:', error);
        }
    }
    console.log('[nodemon] 数据库表格已创建');

});


// 中间件，用于解析请求体中的 JSON 数据
app.use(express.json());

// 路由处理程序
app.get('/', (req, res) => {
    res.send('Hello, World!');
});


// 导入所有控制器模块
const controllersPath = path.join(__dirname, 'src', 'controllers');
fs.readdirSync(controllersPath).forEach(directory => {
    const controllerModule = require(path.join(controllersPath, directory));
    for (const controllerPath in controllerModule) {
        const routes = controllerModule[controllerPath];
        const method = routes.method;
        const handler = routes.handler;
        // console.log("Registering routes for controller:", controllerPath);
        // console.log("Method:", method);
        // console.log(method, controllerPath, handler.name);
        app[method](controllerPath, handler);
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////
//  调试的插件

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

//  调试的插件
/////////////////////////////////////////////////////////////////////////////////////////////

// 启动服务器
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
app.listen(PORT, HOST, () => {
    console.log(('[nodemon] Server is starting...'))
    console.log(`[nodemon] Server is starting on http://${HOST}:${PORT}`);
    console.log(`[nodemon] swagger is starting on http://${HOST}:${PORT}/api-docs`);
});
