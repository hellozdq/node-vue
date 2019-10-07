var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment =require('moment');
var models = require('../../model/config');//数据库链接信息
var svgCaptcha = require('svg-captcha');

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

//登录
router.post('/', function(req, res) {
	if(!req.body){
		res.status(400).json({msg:"参数不能为空"});
		return false;
	}else if(!req.body.code){
		res.status(400).json({msg:"验证码不能为空"});
		return false;
	}else if(req.body.code!=req.session.captcha){
		res.status(400).json({msg:"验证码不正确"});
		return false;
	}else if(!req.body.userName){
		res.status(400).json({msg:"用户名不能为空"});
		return false;
	}else if(!req.body.password){
		res.status(400).json({msg:"密码不能为空"});
		return false;
	}
	
	conn.query("select * from user where userName= '"+req.body.userName+"'", function(err, result) {
		if(result.length==0||result[0].password!==req.body.password){
			res.status(400).json({msg:"用户名或密码不正确！"});
			return false;
		}else{
			req.session.admin_id =result[0].userId;
			console.log(result)
			console.log("result[0].userId:"+result[0].userId)
			console.log("----------"+req.session.admin_id)
			// res.status(200).json({msg:"登录成功！"}).end();
			res.json({msg:"登录成功！",value:result[0].userId});
// 			conn.query("SELECT LAST_INSERT_ID();",function(err,data){
// 				if (err) {
// 					res.status(400).json("请求错误").end();
// 				}else{
// 					req.session.admin_id =data[0]['LAST_INSERT_ID()'];
// 					console.log(req.session.admin_id)
// 				}                                
// 			});
		}
				
	})
	
	
})

module.exports = router;