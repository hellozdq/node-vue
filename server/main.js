// node 后端服务器

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const app = express();
const cookie=require('cookie-parser')
const session = require('express-session')

const memo=require("./route/admin/memo");
const captcha=require("./route/admin/captcha");
const register=require("./route/admin/register");
const login=require("./route/admin/login");
const logout=require("./route/admin/logout");
const asyncTest=require("./route/admin/async");
const upload=require("./route/admin/upload");



app.set('trust proxy', 1); // trust first proxy

app.use(cookie());
app.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
    maxAge : 1000 * 60 * 300, // 设置 session 的有效时间，单位毫秒
  },

}));


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));

//检查登录状态
  app.use((req, res, next)=>{
		var arr;
		arr=req.url.split('?')[0];
		console.log(req.url)
    if(!req.session['admin_id'] && req.url!='/login'&& req.url!='/register'&& arr!='/captcha'&& arr!='/logout'&&arr!='/upload/img'){ //没有登录
			res.status(401).json("登录失效")
      // res.status(401).redirect('/login');
    }else{
      next();
    }
  });
app.use("/memo",memo)
app.use("/captcha",captcha)
app.use("/register",register)
app.use("/login",login)
app.use("/logout",logout)
app.use("/async",asyncTest)
app.use("/upload",upload)
// 监听端口
app.listen(8088);
console.log('success listen at port:8088......');