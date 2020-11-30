This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

启动运行：

### `yarn start`

运行开发环境<br />
在浏览器打开[http://localhost:8081](http://localhost:8081)

热加载您的改动<br />

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

建立生产环境的包

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

暴露出脚本以及webpack配置项

### `yarn serve`

启动node后台服务（ps：需要建立本地mysql库、安装node文件下的依赖包以及导入所需mysql表）

### `目录`
```
|--build //-----生产环境包
|--node
|---|-bin //-----启动配置文件
|---|-dao //-----数据层文件
|---|-node_modules //-----依赖包
|---|-public //-----node静态文件
|---|-routes //-----路由层文件
|---|-service //-----服务层文件
|---|-uploads //-----图片上传存放位置
|---|-views //-----页面显示
|---|-app.js //-----node入口文件
|---|-mysql.js //-----mysql配置文件
|---|-package.json //-----依赖包json
|-node_modules //-----依赖包
|---public //-----静态文件
|--src //-----主业务文件
|---|-api //-----全局请求封装
|---|-components //-----全局组件
|---|-less //-----项目全局less
|---|-mobile-view //-----h5页面
|---|-redux //-----react-redux状态机
|---|-router //-----路由文件
|---|-utils //-----工具类函数
|---|-view //-----系统页面
|---|-web-view //-----门户页面
|---|-app.tsx //-----项目主文件
|---|-index.d.ts //-----全局类型声明
|---|-index.tsx //-----项目入口文件
|--.env //-----create-react-app配置以及环境变量定义文件
|--.gitignore //-----git配置文件
|--.README.md //-----项目说明，mackdown文档
|--tsconfig.json //-----typescript配置文件
|--yarn.lock //-----yarn命令lock文件（yarn下载时如有此文件会更快）
```

## react开发规范

### `使用less全局类`

项目css使用全局less中的类，避免滥用行内样式，主要集中until.less(布局类等)和variables.less(颜色类及变量)

### `严格遵守typescript开发规范`

项目使用typescript开发，必须明确标注变量类型，提交代码前需检查是否通过tslint校验，禁止滥用any类型









