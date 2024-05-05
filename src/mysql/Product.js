const {DataTypes} = require('sequelize');
const {sequelize} = require('./sequelize');
const {User} = require('./User'); // 导入用户模型，以便定义外键关联

// 定义商品模型
const Product = sequelize.define('Product', {
        ProductID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        Price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Image: {
            type: DataTypes.STRING,
        },
        Category: {
            type: DataTypes.STRING,
        },
        Released: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        freezeTableName: true,
        timestamps: false
    }
);

// 建立外键关联
Product.belongsTo(User, {foreignKey: 'UserID'});

// 同步模型到数据库
async function syncModel_Product() {
    try {
        await Product.sync({alter: true});
        console.log('Product model synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing product model:', error);
    }
}

// 导出商品模型和同步函数
module.exports = {Product, syncModel_Product};
