// // src/controllers/login.js

const axios = require('axios');
const {User} = require('../../mysql/User');

// 登录接口处理函数
const handleLogin = async (req, res) => {
    try {
        // 获取前端发送过来的用户登录凭证 code
        const code = req.body.code;

        // 获取请求参数
        const {APP_ID, APP_SECRET} = process.env;

        // 向微信服务器发送请求，换取用户的唯一标识符或 session_key
        const wxRes = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`);

        // 解析微信服务器返回的响应数据
        const {openid, session_key} = wxRes.data;
        console.log(wxRes.data);

        // 在此处将用户信息存储到数据库中，如果 openid 已经存在，则更新 session_key 和更新时间
        const [user, created] = await User.findOrCreate({
            where: {openid},
            defaults: {
                session_key,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        if (!created) {
            // 更新用户的 session_key 和 updatedAt
            await User.update(
                { session_key, updatedAt: new Date() },
                { where: { id: user.id } }
            );
        }


        // 返回用户信息给前端
        res.status(200).json({
            openid,
            session_key
        });

    } catch (err) {
        console.error('登录失败：', err);
        res.status(500).send('登录失败');
    }
};

module.exports = {
    handleLogin
};
