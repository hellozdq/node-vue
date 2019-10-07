<template>
	<div>
		<el-upload
		  action="/api/upload/img"
		  list-type="picture-card"
		  :on-change="onChange"
		  :on-preview="handlePictureCardPreview"
		  :on-remove="handleRemove"
		  :auto-upload="false">
		  <i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible" size="tiny">
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>
<script>
	function showmsg(url,data2)
	  {
	    var xmlhttp;
	    if (window.XMLHttpRequest)
	      {// code for IE7+, Firefox, Chrome, Opera, Safari
	      xmlhttp=new XMLHttpRequest();
	      }
	    else
	      {// code for IE6, IE5
	      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	      }
	    xmlhttp.onreadystatechange=function()
	      {
	      if (xmlhttp.readyState==4 && xmlhttp.status==200)
	        {
	        // if(type == 1) id.value=xmlhttp.responseText;
	        // if(type == 2) id.innerHTML=xmlhttp.responseText;
			console.log("返回--------------------------")
			console.log(xmlhttp.responseText)
			
			//document.getElementById("img2").src=xmlhttp.responseText;
	        }
	      }
	   // xmlhttp.open("GET",url,true);
	   // xmlhttp.send();
		xmlhttp.open('POST', url);
		xmlhttp.setRequestHeader("Content-type", "application/json");
		xmlhttp.send(data2)
	  }
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
	  onChange(file, fileList){
		  console.log(file)
		  console.log(fileList)
		  var reader = new FileReader();
		  reader.readAsDataURL(file.raw);
		  var that=this;
		  reader.onload = function(){
			  console.log("-------------------1")
				showmsg("/api/upload/img",JSON.stringify({imgData:this.result}))
		 //  	that.$http.post("/upload/img",{imgData:this.result})
			// .then((response)=>{
			// 	
			// }).catch((error)=>{
			// 	
			// })
		  }
	  }
    }
  }
</script>
