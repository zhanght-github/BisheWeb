<template>
  <div class="report">
    <div class="tableWrapper">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
        <el-table-column prop="topicname" label="课题名称" width="200" align="center"></el-table-column>
        <el-table-column prop="openreportIspass" label="报告状态" align="center">
          <template slot-scope="scope">
            <span type="text" v-if="scope.row.openreportIspass===0">待审核</span>
            <span type="text" v-if="scope.row.openreportIspass===1">审核通过</span>
            <span type="text" v-if="scope.row.openreportIspass===-1">审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope" >
            <div>
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                :on-exceed="handleExceedContract"
                :on-success="handleContractUpload"
                :on-change="handleChange"
                :show-file-lis="false"
                :limit="1">
                <el-button class="deepbluebtn" size="small" type="primary">上传</el-button>
              </el-upload>
            </div>
            <a :href="downloadUrl" class="deepbluebtn downStyle" size="small">下载</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { literatureList, studentSelect } from '@/api/student'
  import CMethods from '../../../commonJS/Methods'
  export default {
    data() {
      return {
        page: 1,
        size: 10,
        loading: false,
        topicDialog: false,
        tableData: [],
        showData: {},
        downloadUrl:'',
        uploadUrl:''
      }
    },
    methods: {
      getData() {
        literatureList(this.getUserId()).then(res => {
          this.tableData = res.data.data;
          this.topicname = res.data.data[0].topicname;
          this.filename = res.data.data[0].openreportPath;
          this.downloadUrl = CMethods.spliceDownloadUrl(this.topicname,this.filename);
          this.uploadUrl = CMethods.uploadreport(this.getUserId());
        });

      },
      closeDialog() {
        this.topicDialog = !this.topicDialog
      },
      handleChange(){
        console.log('上传文件!!!!')
      },

      handleExceedContract(){
        this.$message({message:'开题报告只能上传一份！',type:'warning'})
      },
      handleContractUpload(resp,file,filelist){
        // if(resp.status===1){
        //   console.log('合同上传地址')
        // }
        this.$message({message:'上传文件成功!',type:'success'})
      },
      handleSelect(id, name) {
        this.$confirm(`确定要选择「${name}」课题吗?`, '确定选择？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'blueMessage'
        })
          .then(() => {
            studentSelect(id, this.getUserId()).then(res => {
              this.$message({ type: 'success', message: res.message })
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../../styles/common';
  .downStyle{
    width: 55px;
    height: 40px;
    border-radius: 2px;
    text-align: center;
    line-height: 40px;
    background: #3a8ee6;
    display: inline-block;
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  .report .cell{
    line-height: 60px;
    height: 60px;
  }
  .report .el-upload-list.el-upload-list--text{
    display: none;
  }
  .report .cell .downStyle{
    float: right;
    margin-top: 11px;
  }
  .report .cell .upload-demo{
    float: left;
  }
  .report .el-table td, .el-table th{
    padding: 0;
  }
</style>
