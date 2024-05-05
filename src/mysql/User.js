const {DataTypes} = require('sequelize');
const {sequelize} = require('./sequelize');

// 定义用户模型
const User = sequelize.define('UserInfo', {
        Openid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Session_Key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Token: {
            type: DataTypes.STRING, // 可以根据需要指定 token 类型
        },
        Nickname: {
            type: DataTypes.STRING(100),
        },
        Avatar: {
            type: DataTypes.STRING,
        },
        Country: {
            type: DataTypes.STRING(75),
        },
        Province: {
            type: DataTypes.STRING(75),
        },
        City: {
            type: DataTypes.STRING(75),
        },
        Language: {
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
