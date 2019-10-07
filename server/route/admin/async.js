var express = require('express');
var router = express.Router();

router.get("/async1",function(req,res){
	res.send('hello, express')
})
// router.get("/async2",function(req,res){
	console.log(req)
	console.log(req.query.async1)
	// res.json({asy1:req.query.async1})
	res.status(400).json({msg:"参数不能为空"});
})
module.exports = router;