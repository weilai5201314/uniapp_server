// ORM配置文件

const {Sequelize} = require('sequelize');

// 创建 Sequelize 实例
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
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

// 导出 sequelize 实例和测试连接函数
module.exports = {sequelize, testConnection};
