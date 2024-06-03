项目配置

- 修改`.env`
- mysql版本8.0.32
- 创建数据库,表格会根据`.env`的`DB_CREATED`字段创建

```mysql
# 创建数据库
create database uniapp; # 同步 .env 文件里 DB_NAME
```
- 配置环境依赖

```shell
pnpm i 
pnpm start
```


项目结构
```
│   .env    配置文件
│   .gitignore
│   app.js  项目启动入口
│   package.json    
│   pnpm-lock.yaml
│   README.md   说明
│
├───data    静态文件目录
│   └───images
│
├───src 代码资源
│   ├───controllers 接口代码
│   └───mysql   squelize配置
│
└───test
        swagger.json    调试工具
```