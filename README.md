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