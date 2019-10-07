var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment =require('moment');
var models = require('../../model/config');//数据库链接信息

// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();

//查询
router.post('/list', function(req, res) {
	var num1=(req.body.page-1)*req.body.sizes;
	var num2=(req.body.page)*req.body.sizes;
	var effectAt1=req.body.searchForm.effectAt1;
	var effectAt2=req.body.searchForm.effectAt2;
	var type=req.body.searchForm.type;
	
	if(effectAt2){
		effectAt2+=" 23:59:59"
	}
	var sql="select * from `memo` where 1=1 ";
	var sql2="select count(*) as t from `memo` where 1=1";//查询数量
	var s="";
	if(effectAt1) s+=" and `effectAt`>='"+ effectAt1+"'";
	if(effectAt2) s+=" and `effectAt`<='"+ effectAt2+"'";
	if(type) s+=" and `type`="+req.body.searchForm.type;
	s+=" and `userId`='"+req.session.admin_id+"'";
	sql+=s;
	sql2+=s;
	sql+=" ORDER BY `effectAt` DESC LIMIT "+num1+","+num2;
	conn.query(sql, function(err, result) {    
		if (err) {       
			console.log(err);
		}        
		if (result) {
			conn.query(sql2, function(err, count) {
				if (err) {       
					console.log(err);
				}        
				if (count) {
					var memoData,resData;
					resData=result;
					memoData={
						list:resData,
						total:count[0].t,
					};
					res.json(memoData);
				}
			})
		}
	})
});

//新增
router.post('/', function(req, res) {
	var createAt=new Date();
	var data=req.body;
	console.log(req.session.admin_id)
	createAt=moment(createAt).format('YYYY-MM-DD HH:mm:ss')
	var sql='insert into memo(type,effectAt, incident, createAt,remark,userId) values(?,?,?,?,?,?)';
	conn.query(sql, [data.type,data.effectAt,data.incident,createAt,data.remark,req.session.admin_id], function(err, result) {    
		if (err) {       
			console.log(err);
		}else{
			conn.query("SELECT LAST_INSERT_ID();",function(err,data){
				if (err) {
					res.json("请求错误")
					// res.status(200).json({ok:0,id:0}).end();
				}else{
					res.status(200).json({memoId:data[0]['LAST_INSERT_ID()'],createAt:createAt});
				}                                
			});
		}  
	})
});

//修改
router.put('/',function(req,res){
	var lastAt=moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
	var sql="update memo set remark='"+req.body.remark+"',type="+req.body.type+",effectAt='"+req.body.effectAt+"',incident='"+req.body.incident+"',lastAt='"+lastAt+"' where memoId="+req.body.memoId;
	conn.query(sql,function(err,result){
		if (err) {       
			res.json(err)
		}else{
			res.json({msg:'修改成功'});
		}     
		
	})
})

//删除
router.delete('/', function(req, res) {
// 	res.json(req.query);
	console.log(req.query)
	var sql='delete from memo where memoId ='+req.query.memoId;
	conn.query(sql, function(err, result) {    
		if (err) {       
			res.json(err)
		}        
		if (result) {
			res.json({msg:'删除成功'})
		}
	})
});

module.exports = router;