// ORM配置文件

const {Sequelize} = require('sequelize');

// 创建 Sequelize 实例
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+08:00', // 设置时区为中国标准时间
});

// 测试数据库连接
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// 同步所有模型
async function syncModels() {
    const modelFiles = ['User', 'Product', 'ShoppingCart', 'Order', 'Message']; // 添加所有模型的文件名
    for (const file of modelFiles) {
        const model = require(`./${file}`);
        await model.syncModel(); // 调用每个模型文件中导出的 syncModel 函数
    }
    console.log('All models synchronized successfully.');
}

// 导出 sequelize 实例和测试连接函数
module.exports = {sequelize, testConnection, syncModels};
