<template>
  <div class="literature">
    <div class="tableWrapper">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
        <el-table-column prop="topicname" label="课题名称" width="150" align="center"></el-table-column>
        <el-table-column prop="wenxianIspass" label="文献综述状态" width="150" align="center">
          <template slot-scope="scope">
            <span type="text" v-if="scope.row.wenxianIspass===0">待审核</span>
            <span type="text" v-if="scope.row.wenxianIspass===1">审核通过</span>
            <span type="text" v-if="scope.row.wenxianIspass===-1">审核通过</span>
          </template>
        </el-table-column>
        <el-table-column prop="wenxianScore" label="分数" align="center"></el-table-column>
        <el-table-column prop="teachername" label="评阅老师" width="150" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" width="200px">
          <template slot-scope="scope" >
            <el-button style="float: left;margin: 10px" class="deepbluebtn" type="primary" size="small" @click="handleOpen(scope.row)">查看</el-button>
            <div>
              <el-upload
                :action="uploadURL"
                multiple
                :before-upload="handleContractBefore"
                :on-exceed="handleExceedContract"
                :on-success="handleContractUpload"
                :on-change="handleChange"
                :show-file-lis="false"
                :limit="1">
                <el-button class="deepbluebtn" size="small" type="primary">上传</el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!--<el-pagination-->
      <!--background-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="tableParams.pageNum"-->
      <!--:page-sizes="[10, 20, 30]"-->
      <!--:page-size="tableParams.pageSize"-->
      <!--layout="total, sizes, prev, pager, next, jumper"-->
      <!--:total="paginationTotal">-->
      <!--</el-pagination>-->
    </div>
    <el-dialog title="文献综述详情" class='editdia' width="500px" :visible.sync="topicDialog" :close-on-press-escape='false' :close-on-click-modal='false'>
      <div class="diabody diascroll" style="height: 400px">
        <div class="detail-row">
          <div class="row-title">导师审核意见</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input type="textarea" v-model="showData.wenxianSuggest" :disabled="true"></el-input>
            </span>
          </div>
        </div>
      </div>
      <div class="diafoot flex">
        <el-button type="primary" class="truebutton deepbluebtn"@click="closeDialog()">确定</el-button>
        <!--<el-button type="info" class="cancelbtn" plain @click="closeDialog()">确定</el-button>-->
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { literatureList } from '@/api/student'
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
        uploadURL:""
      }
    },
    methods: {
      getData() {
        literatureList(this.getUserId()).then(res => {
          this.tableData = res.data.data;
        });
        this.uploadURL = CMethods.uploadLiterature(this.getUserId())
      },
      closeDialog() {
        this.topicDialog = !this.topicDialog
      },
      handleOpen(data) {
        this.topicDialog = !this.topicDialog;
        this.showData.wenxianSuggest = data.wenxianSuggest;
        if (data !== undefined) {
          this.showData = JSON.parse(JSON.stringify(data))
          this.showData.schedule = this.showData.schedule.replace(/<br>/g, '\n')
          this.showData.topiccontent = this.showData.topiccontent.replace(/<br>/g, '\n')
        }
      },
      handleChange(){
        console.log('上传文件!!!!')
      },
      handleContractBefore(file){
        let size = file.size/1024/1024 < 20;
        // if (file.type.indexOf('docx')<0) {
        //   this.$message({message:'只能上传DOC格式的文件！',type:'waning'});
        //   return false;
        // }
        if(!size){
          this.$message({message:'文件大小不能超过20MB',type:'waning'});
          return false;
        }
      },

      handleExceedContract(){
        this.$message({message:'开题报告只能上传一份！',type:'warning'})
      },
      handleContractUpload(resp,file,filelist){
        this.$message({message:'上传文件成功!',type:'success'})
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
  .literature .cell{
    line-height: 60px;
    height: 60px;
  }
  .literature .el-upload-list.el-upload-list--text{
    display: none;
  }
  .literature .cell .downStyle{
    float: right;
    margin-top: 11px;
  }
  .literature .cell .upload-demo{
    float: left;
  }
</style>
