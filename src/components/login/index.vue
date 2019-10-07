<template>
	<div class="login">
		<div class="main">
			 <el-form ref="form" :model="form" class="loginForm">
				<el-form-item>
					<div class="title"> 用户登录</div>
				</el-form-item>
				<el-form-item>
					<el-input v-model="form.userName" placeholder="用户名">
						<i slot="prefix" class="icon iconfont icon-yonghu"></i>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input type="password" v-model="form.password" placeholder="密码">
						<i slot="prefix" class="icon iconfont icon-mima"></i>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-col :span="12">
						<el-input v-model="form.code" placeholder="验证码">
							<i slot="prefix" class="icon iconfont icon-mima"></i>
						</el-input>
					</el-col>
					<el-col :span="12" style="text-align: right; line-height: none; height: 40px;">
						<img class="imgCode" src="/api/captcha" ref="codeImg" @click="changeCode"/>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="success" class="submit" @click="onSubmit" round>登录</el-button>
					<div class="more">
						<div class="forget"><a href="">找回密码</a></div>
						<div class="register"><router-link to="/register">立即注册</router-link></div>
					</div>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	export default({
		data(){
			return{
				form:{
					userName:'',
					password:'',
					code:'',
				},
				captImg:'',
			}
		},
		created:function(){
			this.$nextTick(function(){
				this.changeCode();
			})
		},
		methods:{
			changeCode:function(){
				this.$refs.codeImg.src='/api/captcha?'+Math.random()
			},
			onSubmit:function(){
				if(this.form.userName==""||this.form.password==""){
					this.$message.error("用户名和密码不能为空！")
					return false;
				}
				if(this.form.code==""){
					this.$message.error("验证码不能为空！")
					return false;
				}
				var that=this;
				var form=JSON.parse(JSON.stringify(this.form))
				form.password=md5(form.password)
				this.$http.post("/login",form)
				.then(function(response){
					that.$message.success(response.data.msg)
					localstorage('set','loggedIn',response.data.value)
					that.$router.replace('/home')
				}).catch(function(error){
					that.changeCode();
				})
			}
		}
	})
</script>

<style lang="scss" scoped>
	@mixin clearfix {
		&:after {
			content: " ";
			display: block;
			height: 0;
			clear: both;
			visibility: hidden;
		}
	}
	
	#app {
		.login{
			height: 100vh;
			.main{
				display :flex; 
				align-items:center; 
				justify-content:center;
				max-width: 400px;
				min-width: 320px;
				margin: auto;
				height: 100%;
				.loginForm{
					width: 100%;
					background: #000000;
					background-color:rgba(0,0,0,0.5);
					padding: 5vh;
					.title{
						color: #fff;
						text-align: center;
						font-size: 20px;
					}
					.icon{
						padding: 0 5px;
					}
					.submit{
						width: 100%;
						font-size: 16px;
					}
					.imgCode{
						width: 120px;
						height: 40px;
					}
					.more{
						@include clearfix;
						margin-top: 5px;
						
						a{
							color: #fff;
							font-size: 12px;
						}
					}
					.forget{
						float: left;
					}
					.register{
						float: right;
					}
				}
				
			}
		}
	}
		
</style>

