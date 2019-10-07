function err(that,error){
	var  msg
	if(error.response.data.msg){
		msg=error.response.data.msg;
	}else if(error.response.status==401){
		that.$router.push('/login')
	}else{
		msg="请求错误！";
	}
	that.$message.info(msg);
}

//退出登录
function logout(that){
	that.$http.get('/logout')
	.then(function(response){
		that.$message.success("已退出登录")
		that.$router.push('/login')
		localstorage('clear','loggedIn')
	}).catch(function(error){
		that.err(error);
	})
}

function localstorage(type,item,value){
	var storage = window.localStorage;
	if(type=="get"){
		return storage.getItem(item);
	}else if(type=="set"){
		storage.setItem(item,value);
	}else if(type=="clear"){
		storage.removeItem(item); 
	}
}