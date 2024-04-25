项目配置

```shell
pnpm i 
pnpm start
```

```mysql
# 创建数据库
create database uniapp;

# 用户信息表
CREATE TABLE IF NOT EXISTS UserInfo
(
    UserID       INT AUTO_INCREMENT PRIMARY KEY,
    OpenID       VARCHAR(255) NOT NULL UNIQUE,
    SessionKey   VARCHAR(255) NOT NULL,
    SessionToken VARCHAR(255),
    Nickname     VARCHAR(50),
    Avatar       VARCHAR(255),
    Gender       TINYINT,
    Country      VARCHAR(75),
    Province     VARCHAR(75),
    City         VARCHAR(75),
    Language     VARCHAR(10),
    CreateTime   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdateTime   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```