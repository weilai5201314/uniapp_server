// 4
const {DataTypes} = require('sequelize');
const {sequelize} = require('./sequelize');

// 定义订单模型
const Order = sequelize.define('Order', {
    OrderID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment:"自增序列"
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'userinfo', // 关联的用户表名称
            key: 'ID' // 关联的用户表主键
        },
        comment:"用户表ID",

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
        comment:"商品表ID"
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:"下单数量"
    },
    OrderStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '待付款', // 默认订单状态为待付款
        comment:"订单状态"
    },
    OrderTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // 默认下单时间为当前时间
        comment:"下单时间"
    },
    // 可以添加支付时间、完成时间等其他字段
    PayTime: {
        type: DataTypes.DATE,
        allowNull: false,
        comment:"付款时间"
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

// 同步模型到数据库
async function syncModel() {
    try {
        await Order.sync({alter: true});
        console.log('Order model synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing order model:', error);
    }
}

// 导出订单模型和同步函数
// module.exports = {Order, syncModel_Order};
module.exports = {Order,syncModel};
// module.exports = {Order}