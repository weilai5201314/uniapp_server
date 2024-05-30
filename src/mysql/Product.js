// 2
const {DataTypes} = require('sequelize');
const {sequelize} = require('./sequelize');
const {User} = require('./User'); // 导入用户模型，以便定义外键关联

// 定义商品模型
const Product = sequelize.define('Product', {
    ProductID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment:"自增序列"
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment:"商品标题"
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment:"商品描述"
    },
    Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment:"商品价格"
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:"商品数量"
    },
    Image1: {
        type: DataTypes.STRING,
        comment:"商品图片1,后面同理"
    },
    Image2: {
        type: DataTypes.STRING,
    },
    Image3: {
        type: DataTypes.STRING,
    },
    Category: {
        type: DataTypes.STRING,
        comment:"商品种类"
    },
    ShowTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // 设置当前时间作为默认值
        comment:"上架时间"
    },
}, {
    freezeTableName: true,
    timestamps: false
});

// 建立外键关联，并添加 onDelete: 'CASCADE' 约束
Product.belongsTo(User, {
    foreignKey: {
        name: 'userid',
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

// 同步模型到数据库
async function syncModel() {
    try {
        await Product.sync({alter: true});
        console.log('Product model synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing product model:', error);
    }
}

// 导出商品模型和同步函数
// module.exports = {Product, syncModel_Product};
module.exports = {Product,syncModel};
// module.exports = {Product}
