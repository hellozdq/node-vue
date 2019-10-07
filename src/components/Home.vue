<template>
	<div id="app">
		<div class="head"><a @click="logout">注销</a></div>
		<div class="contain">
			<div class="title">
				<h1>备忘录</h1>
			</div>
			<div class="search">
				<div class="search_child">
					<div class="button_group">
						<button class="but" @click="add">新增</button>
						<!-- <button class="but">编辑</button> -->
					</div>
					<ul>
						<li @click="onType(0)"><a :class="{'active': active==0}">全部</a></li>
						<li v-for="(item,index) in typeData" @click="onType(item.value)"><a :class="{'active': item.value == active}">{{item.label}}</a></li>
					</ul>
					<div class="el_time">
						<div class="time_l">
							<span class="active">时间</span>
						</div>
						<div class="time_r">
							<el-date-picker style="margin-bottom: 5px;" v-model="searchForm.effectAt1" type="date" size="small" placeholder="选择日期" @change="onChange">
							</el-date-picker>
							到
							<el-date-picker v-model="searchForm.effectAt2" type="date" size="small" placeholder="选择日期" @change="onChange">
							</el-date-picker>
						</div>
					</div>
				</div>
			</div>
			<el-row class="main">
				<el-col  class="card_f" :xs="24" :sm="12" :md="8" :lg="6" v-for="(item,index) in memoData" :key="item.momeId">
					<div class="card_hl" @click="edit(index,item)">
						<i class="el-icon-edit-outline"></i>
					</div>
					<div class="card_hr" @click="delCard(index,item.memoId)">
						<i class="el-icon-error"></i>
					</div>
					<card class="card_m">
						<div slot="header">{{typeName(item.type)}}</div>
						<div>
							<div class="time">{{item.effectAt}}</div>
							<div>{{item.incident}}</div>
						</div>
						<div slot="footer">——{{item.createAt}}</div>
						<span slot="remark">{{item.remark}}</span>
					</card>
				</el-col>
			</el-row>
			
			<div>
				<el-pagination @size-change="handleSize" @current-change="handleCurrent" :current-page="page" :page-sizes="pages"
				 :page-size="sizes" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
			<!-- 弹窗 -->
			<cardForm @dialog="dialog" :dialogVisible="dialogForm"></cardForm>
		</div>
	</div>
</template>

<script>
	import card from './card/card'
	import cardForm from './card/cardForm'
	import axios from 'axios'
	import moment from 'moment'

	export default {
		name: 'Index',
		data() {
			return {
				memoData: [],
				value1: '',
				value2: '',
				// dialogVisible: false,
				form: '',
				editIndex: '',
				dialogForm: {},
				active: '0',
				searchForm: {
					effectAt1: "",
					effectAt2: "",
					type: ""
				},
				typeData: [{
					'label': '日常',
					'value': '1'
				}],
				//分页
				total: 0,
				sizes: 12,
				page: 1,
				pages:[12,24,96,240]
			}
		},
		components: {
			card: card,
			cardForm: cardForm,
		},

		created: function() {
			this.$nextTick(function() {
				// console.log(this.screenWidth)
				this.search();
			})

		},
		methods: {
			//查询
			search: function() {
				if (this.searchForm.effectAt1) {
					this.searchForm.effectAt1 = moment(this.searchForm.effectAt1).format('YYYY-MM-DD')
				}
				if (this.searchForm.effectAt2) {
					this.searchForm.effectAt2 = moment(this.searchForm.effectAt2).format('YYYY-MM-DD')
				}
				var that = this;
				this.$http.post('/memo/list', {
						searchForm: this.searchForm,
						sizes: this.sizes,
						page: this.page
					}).then(function(response) {
						that.memoData = response.data.list;
						that.total = response.data.total;
					}).catch(function(error){
						// err(that,error)
					})
			},

			//新增
			add: function() {
				// this.dialogVisible = true;
				this.form = {
					type: '1',
					effectAt: '',
					incident: '',
					remark: '',
				};
				this.dialogForm = {
					dialogVisible: true,
					form: this.form,
				}
			},

			//修改
			edit: function(index, row) {
				console.log(index)
				this.editIndex = index;
				// this.dialogVisible = true;
				var form = JSON.parse(JSON.stringify(row))
				this.dialogForm = {
					dialogVisible: true,
					form: form,
				}
			},

			//弹窗关闭时触发
			dialog: function(val) {
				console.log(this.editIndex)
				if (typeof val == "boolean") {
					// this.dialogVisible = val;
				} else if (val.dialogType == 'add') {
					this.form = val.form;
					this.memoData.splice(0, 0, this.form)
					if(this.memoData.length>this.sizes){
						this.memoData.pop()
					}
				} else {
					this.form = val.form;
					this.memoData.splice(this.editIndex, 1, this.form)
				}
			},

			// 删除
			delCard: function(index, memoId) {
				var that = this;
				this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.delete('/memo?memoId=' + memoId)
						.then(function(response) {
							that.memoData.splice(index, 1);
							that.$message.success('删除成功！')
						})
				})
			},

			//类型改变触发
			onType: function(val) {
				this.active = val;
				this.searchForm.type = val;
				this.search();
			},

			//时间改变时触发
			onChange: function() {
				this.search();
			},

			//分页
			handleSize: function(val) {
				this.sizes = val;
				this.search();
			},
			handleCurrent: function(val) {
				this.page = val;
				this.search();
			},
			
			// 退出
			logout:function(){
				logout(this)
			},




			//类型数字转中文
			typeName: function(val) {
				console.log(val)
				var typeValue = this.typeData.filter(function(x) {
					return val == x.value;
				})
				return JSON.parse(JSON.stringify(typeValue[0].label));
			},
		},
	}
</script>

<style lang="scss" scoped>
	/* 清除浮动 */
	@mixin clearfix {
		&:after {
			content: " ";
			display: block;
			height: 0;
			clear: both;
			visibility: hidden;
		}
	}

	$border:solid 1px #42B983;

	.active {
		color: #42B983;
	}

	#app {
		.head{
			text-align: right;
			max-width: 1200px;
			color: #42B983;
			padding: 20px;
			text-decoration: underline;
			font-size: 18px;
			cursor: pointer;
		}
		min-height: 100%;
		.contain {
			max-width: 1200px;
			height: 100%;
			margin: auto;
			// background: url(../images/bg.jpg);
			padding: 10px;

			.title {
				// max-width: 1200px;
				text-align: center;
				height: 80px;
			}

			.search {
				border-top: $border;
				border-bottom: $border;
				padding: 10px;

				.search_child {

					.button_group {
						// padding-bottom: 10px;
						margin-bottom: 10px;
						text-align: center;

						// border-bottom: dotted 1px #42B983;
						.but {
							width: 80px;
							height: 30px;
							background: none;
							outline: none;
							border: $border;
							margin-left: 20px;
							cursor: pointer;
						}
					}

					ul {
						margin: 0;
						@include clearfix;
						margin-bottom: 10px;

						li {
							list-style: none;
							float: left;
							margin-right: 10px;

							.active {
								color: #42B983;
							}

							a {
								&:hover {
									color: #42B983;
								}

								text-decoration: none;
								color: #000;
								cursor: pointer;
							}
						}
					}

					.el_time {
						color: #fff;
						@include clearfix;
						
						.time_l{
							float: left;
							margin-right: 10px;
						}
						.time_r{
							width: calc(100% - 42px);
							float: left;
						}
						.el-input {
							width: 150px;
							background: none;
						}

						.el-input__inner {
							background: none;
							border: $border;
						}
					}

				}
			}

			.main {
				padding-top: 10px;

				.card_f {
					position: relative;
					display: inline-block;
					// width: 250px;
					height: 180px;
					// padding-right:10px;
					
					.card_hl {
						position: absolute;
						top: 5px;
						left: 15px;
						z-index: 10;
						font-size: 18px;
					}

					.card_hr {
						position: absolute;
						top: 5px;
						right: 25px;
						z-index: 10;
						font-size: 18px;
					}

					.card_m {
						position: absolute;
					}
				}
			}

			.time {
				margin-bottom: 10px;
			}
		}
	}
</style>
