const {DataTypes} = require('sequelize');
const {sequelize} = require('./sequelize');

// 定义消息模型
const Message = sequelize.define('Message', {
    messageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    senderID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    receiverID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    messageType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sendTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true,
    timestamps: false
});

// 同步模型到数据库
async function syncModel_Message() {
    try {
        await Message.sync({alter: true});
        console.log('Message model synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing message model:', error);
    }
}

// 导出消息模型和同步函数
module.exports = {Message, syncModel_Message};
