const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();
const mysql = require('mysql2');
const {syncModel} = require("./User");

// 创建数据库连接
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// 连接到数据库
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// 中间件，用于解析请求体中的 JSON 数据
app.use(express.json());

// 路由处理程序
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// 登录接口
app.post('/login', async (req, res) => {
    try {
        // 初始化数据库表格
        await syncModel()

        // 获取前端发送过来的用户登录凭证 code
        const code = req.body.code;

        // 获取请求参数
        const {APP_ID, APP_SECRET} = process.env;

        // 向微信服务器发送请求，换取用户的唯一标识符或 session_key
        const wxRes = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`);

        // 解析微信服务器返回的响应数据
        const {openid, session_key} = wxRes.data;
        console.log(wxRes.data)
        // 返回用户信息给前端
        res.status(200).json({
            openid,
            session_key
        });

        // 在此处将用户信息存储到数据库中，如果openid已经存在，则更新session_key和更新时间
        const sql = `INSERT INTO UserInfo (openid, session_key, createdat, updatedat)
                     VALUES (?, ?, NOW(), NOW()) ON DUPLICATE KEY
        UPDATE session_key =
        VALUES (session_key), updatedAt = NOW()`;
        const values = [openid, session_key];
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error inserting or updating user info into database:', err);
                return;
            }
            console.log('User info inserted or updated into database');
        });
        // 然后关闭连接
        connection.end();
    } catch (err) {
        // 防止未关闭连接
        connection.end();
        console.error('登录失败：', err);
        res.status(500).send('登录失败');
    }
});

// 启动服务器
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
app.listen(PORT, HOST, () => {
    console.log(('Server is starting...'))
    console.log(`Server is starting on http://${HOST}:${PORT}`);
});
