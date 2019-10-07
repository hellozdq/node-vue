<template>
	<div class="register">
		<div class="main">
			 <el-form ref="form" status-icon :model="form" class="registerForm" :rules="rules">
				<el-form-item>
					<div class="title"> 用户注册</div>
				</el-form-item>
				<el-form-item prop="userName">
					<el-input v-model="form.userName" placeholder="用户名">
						<i slot="prefix" class="icon iconfont icon-yonghu"></i>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" v-model="form.password" placeholder="密码">
						<i slot="prefix" class="icon iconfont icon-mima"></i>
					</el-input>
				</el-form-item>
				<el-form-item prop="password2">
					<el-input type="password" v-model="form.password2" placeholder="再次输入密码">
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
						<img class="imgCode" src="/captcha" ref="codeImg" @click="changeCode"/>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="success" class="submit" @click="onSubmit('form')" round>立即注册</el-button>
					<div class="more">
						<!-- <div class="forget"><a href="">找回密码</a></div> -->
						<div class="login"><router-link to="/login">已有密码？立即登录</router-link></div>
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
			var password2 = (rule, value, callback) => {
				console.log(value)
				console.log(this.form.password)
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			
			return{
				form:{
					userName:'',
					password:'',
					password2:'',
					code:'',
				},
				rules:{
					userName:[
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ pattern:'^[a-zA-Z0-9]{5,10}$', message: '用户名必须是5-10位数字或字母组成',trigger: 'blur' },
					],
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' },
					],
					password2:[
						{ validator:password2, trigger: 'blur' },
					],
					code:[
						{ required: true, message: '请输入验证码', trigger: 'blur' },
					]
				}
			}
		},
		created:function(){
			this.$nextTick(function(){
				this.changeCode();
			})
		},
		methods:{
			changeCode:function(){
				this.$refs.codeImg.src='/api/captcha?'+Math.random();
			},
			onSubmit:function(formName){
				var that=this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var form=JSON.parse(JSON.stringify(that.form))
						delete form.password2;
						form.password=md5(form.password)
						console.log(form)
						that.$http.post('/register',form)
						.then(function(response){
							that.$message.success('注册成功！')
							that.$router.push('/login')
						}).catch(function(error){
							that.changeCode();
							// err(that,error)
						})
					}
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
		.register{
			height: 100vh;
			.main{
				display :flex; 
				align-items:center; 
				justify-content:center;
				max-width: 400px;
				min-width: 320px;
				margin: auto;
				height: 100%;
				.registerForm{
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
					.login{
						float: right;
					}
				}
				
			}
		}
	}
		
</style>

