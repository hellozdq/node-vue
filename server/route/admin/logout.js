var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment =require('moment');
var models = require('../../model/config');//数据库链接信息
var svgCaptcha = require('svg-captcha');

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

//注销
router.get('/', function(req, res) {
	delete req.session.admin_id;
	console.log(req.session)
	res.json("已退出");
})

module.exports = router;