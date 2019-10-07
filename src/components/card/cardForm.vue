<template>
	<el-dialog title="" :visible.sync="dialogCardVisible">	
		<el-form ref="form" :model="form" label-width="80px">
		  <el-form-item label="类型">
			<el-select v-model="form.type" placeholder="请选择活动区域">
			  <el-option label="日常" value="1"></el-option>
			  <el-option label="生日" value="2"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="生效时间">
			 <el-date-picker type="date" placeholder="选择日期时间" v-model="form.effectAt" style="width: 220px;"></el-date-picker>
		  </el-form-item>
		  <el-form-item label="事件">
			<el-input v-model="form.incident"></el-input>
		  </el-form-item>
		  <el-form-item label="备注">
			<el-input type="textarea" v-model="form.remark"></el-input>
		  </el-form-item>
		  <el-form-item>
			<el-button type="primary" @click="onSubmit" :disabled="disabled">确认</el-button>
			<el-button @click="dialogCardVisible=false">取消</el-button>
		  </el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
import moment from 'moment'
export default {
	props:['dialogVisible'],
    data() {
      return {
        form: {
          type: '1',
          effectAt: '',
          incident: '',
          remark: '',
        },
			// form:this.dialogVisible.form,
			dialogCardVisible:false,
			labelWidth:'80px',
			disabled:false,
      }
    },
	watch:{
		dialogVisible:function(newValue,oldValue){
			this.dialogCardVisible=newValue.dialogVisible;
			this.form=newValue.form
		},
// 		dialogCardVisible:function(){
// 			if(!this.dialogCardVisible){
// 				this.$emit('dialog',this.dialogCardVisible)
// 			}
// 		}
	},
	created:function(){
		// this.form=this.dialogVisible.form
	},
    methods: {
      onSubmit() {
		  var that=this;
			this.form.effectAt=moment(this.form.effectAt).format('YYYY-MM-DD')
			this.disabled=true;
			if(!this.form.memoId){
				this.$http.post("/memo",this.form)
				.then(function(response){
					that.disabled=false;
					that.form.memoId=response.data.memoId;
					that.form.createAt=response.data.createAt;
					var backForm={
						form:that.form,
						dialogType:'add'
					};
						that.$emit('dialog',backForm)
						that.dialogCardVisible=false;
					}).catch(function(error){
						that.disabled=false;
						// err(that,error)
					})
			}else{
				this.$http.put("/memo",this.form)
				.then(function(response){
					that.disabled=false;
					var backForm={
						form:that.form,
						dialogType:'edit'
					};
						that.$emit('dialog',backForm)
						that.dialogCardVisible=false;
					}).catch(function(error){
						that.disabled=false;
						// err(that,error)
					})
			}
			
      },
    }
  }
</script>

<style>
</style>
