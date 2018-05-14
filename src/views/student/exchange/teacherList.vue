<template>
  <div class="draft">
    <div class="tableWrapper">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
        <el-table-column prop="username" label="指导教师" width="200" align="center"></el-table-column>
        <el-table-column prop="username" label="指导教师电话" width="200" align="center"></el-table-column>
        <el-table-column prop="collegename" label="学院" align="center"></el-table-column>
        <el-table-column prop="major" label="专业" width="200" align="center"></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope" >
            <el-button class="deepbluebtn" type="success" size="small" @click="openSuggest(scope.row)">进入留言板</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { getteacher } from '@/api/admin'
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
        uploadUrl:'',
        filename:'',
        topicname:'',
        buttonShow:"",
        name:'',
        id:''
        // fileList3:[{
        //   name:'docName',
        //   url:""
        // }]
      }
    },
    methods: {
      getData() {
        getteacher(0,10,1,this.getUsers().collegeid).then(res => {
          this.tableData = res.data.data.content
        })
      },
      closeDialog() {
        this.topicDialog = !this.topicDialog
      },
      openSuggest(data){
        this.id = data.userid;
        this.name = data.username;
        this.$router.push({path:'/student/exchangeList',query:{id:this.id,name:this.name}})
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../../styles/common';
</style>
<style rel="stylesheet/scss" lang="scss">
  .draft .cell{
    line-height: 60px;
    height: 60px;
  }
  .draft .el-upload-list.el-upload-list--text{
    display: none;
  }
  .draft .cell .downStyle{
    float: right;
    margin-top: 11px;
    height: 40px;
    width: 55px;
    border-radius: 2px;
    text-align: center;
    line-height: 40px;
    margin-right: 10px;
  }
  .draft .cell .upload-demo{
    float: left;
  }
  .draft .el-table td, .el-table th{
    padding: 0;
  }
</style>
