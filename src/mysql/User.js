// 1
const {DataTypes} = require('sequelize');
const {sequelize} = require('./sequelize');

// 定义用户模型
const User = sequelize.define('UserInfo', {
        openid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        session_key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING(255), // 根据需要指定 token 类型和长度
            unique: true, // 添加唯一约束
        },
        nickname: {
            type: DataTypes.STRING(100),
        },
        avatar: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING(75),
        },
        province: {
            type: DataTypes.STRING(75),
        },
        city: {
            type: DataTypes.STRING(75),
        },
        language: {
            type: DataTypes.STRING(10),
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
    });

// 同步模型到数据库
async function syncModel() {
    try {
        await User.sync({alter: true});
        console.log('User model synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing user model:', error);
    }
}

// 导出用户模型和同步函数
module.exports = {User, syncModel};
// module.exports = {syncModel};
// module.exports = {User};
