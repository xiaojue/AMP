AMP 部署文档
----------------

## 环境要求

* Node@^4.4.2

* Npm@latest

* Mongodb@^3.0.4

## 部署流程

* 安装上述相关依赖

	**Mongodb 只能安装 3.0 版本**

	**安装好数据库后，需新建名为 AMP 的库**

* clone 本项目源码

	`git clone https://github.com/gomeplusFED/AMP`

* 配置相关信息

	将 `config` 文件夹下的 `base.config.js.sample` 和 `db.config.js.sample` 拷贝一份，去掉 `.sample` 结尾

	`cd AMP && cp config/base.config.js.sample config/base.config.js && cp config/db.config.js.sample config/db.config.js`

	配置相关参数，包括 `base.config.js` 中的端口信息，是否启用 ldap 验证，`db.config.js` 中的数据库信息，一个是 dev 数据库，一个是 production 数据库

* 安装项目依赖

	`npm i -d`

* 打包前端代码

	`npm run build`

* 启动应用

	`node app.babel.js`

	注意：这样会连接 production 数据库

	当然，生产环境需要 pm2 等类似工具在后台运行应用

* 访问相关端口地址即可查看效果

