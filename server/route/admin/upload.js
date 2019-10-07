var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment =require('moment');
var models = require('../../model/config');//数据库链接信息
var fs = require('fs');

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

let uuid = () => {  //生成uuid方法
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid;
}

//登录
router.post('/img', function(req, res) {
	var imgData = req.body.imgData;
	console.log(imgData)
	// var bufferData = new Buffer(imgData,'base64'); 
	// console.log(bufferData)
	//过滤data:URL
	var base64Data = imgData.replace(/^data:image\/(png|jpeg)+;base64,/, "");
	var dataBuffer = new Buffer(base64Data, 'base64');
	console.log(dataBuffer)
	console.log(uuid())
	var id=uuid();
	// 写入图片名称和路径，（如果文件不存在会创建一个文件）。
	//需要注意的是，这里的路径，是以开始文件入口的位置开始的。例如我这里是以app.js所在位置为基准。
	fs.writeFile("./images/"+id+".jpg", dataBuffer, function (err) {
	if (err) {
	res.send(err);
	} else {
	res.send("保存成功！");
	}
	});

})

module.exports = router;