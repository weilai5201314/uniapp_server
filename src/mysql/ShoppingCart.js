// 3
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
            references: {
                model: 'Userinfo', // 关联的用户表名称
                key: 'ID' // 关联的用户表主键
            },
            onDelete: 'CASCADE',
        },
        ProductID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Product', // 关联的商品表名称
                key: 'ProductID' // 关联的商品表主键
            },
            onDelete: 'CASCADE',
        },
        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1, // 默认为1
        },
        AddedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // 默认为当前时间
        },
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
