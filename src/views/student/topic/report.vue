<template>
  <div class="select">
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
    <el-dialog title="查看课题信息" class='editdia' width="500px" :visible.sync="topicDialog" :close-on-press-escape='false' :close-on-click-modal='false'>
      <div class="diabody diascroll" style="height: 400px">
        <div class="detail-row">
          <div class="row-title">课题名称</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.topicname" :disabled="true"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">课题内容</div>
          <div class="row-content">
             <span>
              <el-input type="textarea" v-model="showData.topiccontent" :disabled="true"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">选题总人数</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.supplynum" :disabled="true"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">已选人数</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.alreadynum" :disabled="true"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">选题时间</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.createtime" :disabled="true"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">指导教师</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.topicname" :disabled="true"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">课题类型</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.teachername" :disabled="true"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">课题来源</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.topicsource" :disabled="true"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">指导老师电话</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.teacherphone" :disabled="true"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">日程安排</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input type="textarea" v-model="showData.schedule" :disabled="true"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">学院</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.collegename" :disabled="true"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">专业</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.major" :disabled="true"></el-input>
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
        // fileList3:[{
        //   name:'docName',
        //   url:""
        // }]
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
  .select .cell{
    line-height: 60px;
    height: 60px;
  }
  .select .el-upload-list.el-upload-list--text{
    display: none;
  }
  .select .cell .downStyle{
    float: right;
    margin-top: 11px;
  }
  .select .cell .upload-demo{
    float: left;
  }
</style>
