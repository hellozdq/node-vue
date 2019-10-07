var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment =require('moment');
var models = require('../../model/config');//数据库链接信息
var svgCaptcha = require('svg-captcha');
// var captchapng = require('captchapng');

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

//验证码
router.get('/', function(req, res) {
	//svg
	var codeConfig = {
        size: 4,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 40,
        width: 120,
		background: '#fff'
    }
    var captcha = svgCaptcha.create(codeConfig);
    req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
	res.type('svg');
	// let capt=new Buffer(captcha.data).toString('base64');
    res.status(200).send(captcha.data);

     //png
// 	  var code = '0123456789';
//  
// 	  var length = 4;
// 	 
// 	  var randomcode = '';
// 	 
// 	  for (var i = 0; i < length; i++) {
// 	 
// 		randomcode += code[parseInt(Math.random() * 1000) % code.length];
// 	 
// 	  }
// 	 
// 	  // 保存到session
// 	 
// 	  if (null == req.session[sessionConstant.login]) {
// 	 
// 		req.session[sessionConstant.login] = {};
// 	 
// 	  }
// 	 
// 	  req.session[sessionConstant.login][sessionConstant.randomcode] = randomcode;
// 	 
// 	  // 输出图片
// 	 
// 	   var p = new captchapng(80,30,parseInt(randomcode)); // width,height,numeric captcha
// 	 
// 	  p.color(255, 255, 255, 0); // First color: background (red, green, blue, alpha)
// 	 
// 	  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
// 	 
// 	  var img = p.getBase64();
// 	 
// 	  var imgbase64 = new Buffer(img,'base64');
// 	 
// 	  res.writeHead(200, {
// 	 
// 		'Content-Type': 'image/png'
// 	 
// 	  });
// 	 
// 	  res.end(imgbase64);
})

module.exports = router;