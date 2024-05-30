const {DataTypes} = require('sequelize');
const {sequelize} = require('./sequelize');
const {User} = require('./User'); // 导入用户模型，以便定义外键关联

// 定义消息模型
const Message = sequelize.define('Message', {
    messageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment:"自增序列"
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment:"聊天内容"
    },
    messageType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sendTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment:"发送时间"
    }
}, {
    freezeTableName: true,
    timestamps: false
});

// 建立外键关联，并添加 onDelete: 'CASCADE' 约束
Message.belongsTo(User, {
    foreignKey: {
        name: 'senderID',
        allowNull: false,
    }, onDelete: 'CASCADE',
});

Message.belongsTo(User, {
    foreignKey: {
        name: 'receiverID',
        allowNull: false,
    }, onDelete: 'CASCADE'
});

// 同步模型到数据库
async function syncModel() {
    try {
        await Message.sync({alter: true});
        console.log('Message model synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing message model:', error);
    }
}

// 导出消息模型和同步函数
// module.exports = {Message, syncModel_Message};
module.exports = {Message,syncModel};
// module.exports = {Message}