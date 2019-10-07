<template>
	<view>
		<h1>aaaaaaaaaaaaaaaaaaaaaaa</h1>
	</view>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				
			};
		},
		created:function(){
			this.$nextTick(function(){
				this.textAsync()
			})
		},
		methods:{
			checkLogin:function(){
				let that=this;
				return new Promise((resolve,reject)=>{
					that.$http.get("/async/async1")
					.then(function(respose){
						resolve(respose.data)
					}).catch(function(error){
						reject(error);
					})
				})
			},
			checkLogin2:function(a){
				let that=this;
				return new Promise((resolve,reject)=>{
					that.$http.get("/async/async2?async1="+a)
					.then(function(respose){
						console.log(respose.data)
						resolve(respose.data)
					}).catch(function(error){
						console.log(error.response.data)
						reject(error.response.data);
					})
				})
			},
			async textAsync(){
				const data=await this.checkLogin()
				let data2;
				console.log("======="+data+"=============")
// 				try {
// 					data2=await this.checkLogin2(data)
// 				} catch(error){
// 					console.log(error)
// 					return false;
// 				}
				data2=await this.checkLogin2(data).catch(function(error){
					console.log(error)
				})
				console.log(data2)
			}
		}
	}
</script>

<style>

</style>
