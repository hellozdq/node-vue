<template>
	<div class="container">
		<div class="face">
			<header class="header">
				<slot name="header"></slot>
			</header>
			<main class="content">
				<slot></slot>
			</main>
			<footer class="footer">
				<slot name="footer"></slot>
			</footer>
		</div>
		<div class="remark">
			<slot name="remark"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		data:function(){
			return{
				timer:false,
				screenWidth:document.body.clientWidth,
			}
		},
		watch: {
			screenWidth(val) {
				console.log(val)
				if (!this.timer) {
					this.screenWidth = val
					this.timer = true
					let that = this
					setTimeout(function() {
						// that.screenWidth = that.$store.state.canvasWidth
// 						var faces=document.getElementsByClassName("face");
// 						for(var i=0; i<faces.length;i++){
// 							if(that.screenWidth>1200){
// 								faces[i].style.width="300px";
// 							}else if(1024<that.screenWidth<1200){
// 								faces[i].style.width=that.screenWidth/4+"px";
// 							}else if(768<that.screenWidth<1024){
// 								faces[i].style.width=that.screenWidth/3+"px";
// 							}else if(320>that.screenWidth<768){
// 								faces[i].style.width=that.screenWidth/2+"px";
// 							}else if(that.screenWidth<320){
// 								faces[i].style.width="320px";
// 							}
// 								
// 						}
						// that.init()
						that.timer = false
					}, 400)
				}
			}
		},
		mounted () {
			const that = this
			window.onresize = () => {
				return (() => {
					window.screenWidth = document.body.clientWidth
					that.screenWidth = window.screenWidth
				})()
			}
		},
	}
</script>

<style lang="scss" scoped>
	$width:calc(100% - 10px);
	
	.container{
		display: inline-block;
		// margin-left: 10px;
		// margin-bottom: 10px;
		width: $width;
		height: 160px;
		background: #fff;
		cursor: pointer;
		position: relative;
		&:hover .face{
			opacity: 0.2;
		}
		&:hover .remark{
			opacity: 0.6;
		}
		.face{
			.header{
				height: 30px;
				line-height: 30px;
				text-align: center;
				background: #42B983;
			}
			.content{
				height: 80px;
				padding: 10px;
				text-align: center;
			}
			.footer{
				text-align: right;
				height: 30px;
				line-height: 30px;
				padding-right:10px ;
				font-size: 14px;
			}
			
		}
		.remark{
			position: absolute;
			top: 0;
			background: #000;
			width: 100%;
			height: 160px;
			opacity: 0;
			color: #fff;
			padding-left: 10px;
			box-sizing: border-box;
			text-indent: 2em;
			
			display :flex; 
			align-items:center; 
			justify-content:flex-start ; 
		}
	}
</style>
