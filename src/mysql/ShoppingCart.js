const {DataTypes} = require('sequelize');
const {sequelize} = require('./sequelize');

// 定义购物车模型
const ShoppingCart = sequelize.define('ShoppingCart', {
        CartID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // 将 UserID 字段放在前面
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ProductID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1, // 默认为1
        },
        // 添加时间等其他字段
    },
    {
        freezeTableName: true,
        timestamps: false,
    });

// 同步模型到数据库
async function syncModel_ShoppingCart() {
    try {
        await ShoppingCart.sync({alter: true});
        console.log('ShoppingCart model synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing ShoppingCart model:', error);
    }
}

// 导出购物车模型和同步函数
module.exports = {ShoppingCart, syncModel_ShoppingCart};
