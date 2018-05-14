<!--  -->
<template>
  <div class="checkStudent">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        property="topicname"
        label="课题名称"
        width="250">
      </el-table-column>
      <el-table-column
        property="studentname"
        label="学生姓名"
        width="100">
      </el-table-column>
      <el-table-column
        property="studentid"
        label="学生学号"
        width="100">
      </el-table-column>
      <el-table-column
        property="paperscore"
        label="学生分数">
      </el-table-column>
      <el-table-column
        label="操作"
        width="440">
        <template slot-scope="scope">
          <div v-if='scope.row.isrecommend === 1' class="handle">
            <el-button type="primary" plain class="deepbluebtn" @click="allowStudent(scope.row.studentid, scope.row.isrecommend, scope.row.studentname)">同意</el-button>
            <el-button type="primary" plain class="deepredbtn reject" @click="rejectStudent(scope.row.studentid, scope.row.isrecommend, scope.row.studentname)">拒绝</el-button>
          </div>
          <div v-if='scope.row.isrecommend === 2' class="handle">
            <span class="allowed result">已通过</span >
          </div>
          <div v-if='scope.row.isrecommend === -1' class="handle">
            <span class="notAllowed result">未通过</span >
          </div>
          <a :href="downloadUrl" class="deepbluebtn downStyle" size="small">下载</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getexcellent, goodstate } from '@/api/admin'
  import { topicSelect, studentSelect, literatureList } from '@/api/student'
  import CMethods from '../../../commonJS/Methods'
  export default {
    data() {
      return {
        page: 0,
        size: 10,
        stuData: [],
        studentid: [],
        isrecommend: 1,
        tableData: [],
        state: 1,
        downloadUrl: '',
        student: '',
        filename: ''
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        goodstate(this.page, this.size, 1).then(res => {
          this.tableData = res.data.data.content
          this.filename = res.data.data.content[0].paperpath
          this.topicname = res.data.data.content[0].topicname
          console.log(this.filename)
          this.downloadUrl = CMethods.spliceDownloadUrl(this.topicname, this.filename);
        })
      },
      allowStudent(id, isrecommend, name) {
        this.$confirm(`确定同意「${name}」的课题?`, '同意选题', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'blueMessage'
        })
          .then(() => {
            getexcellent(id, 2).then(res => {
              this.getdata()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      },
      rejectStudent(id, isrecommend, name ) {
        this.$confirm(`确定拒绝「${name}」的课题?`, '拒绝选题', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            getexcellent(id, -1).then(res => {
              this.getdata()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      },
      handleExceedContract(){
        this.$message({message:'开题报告只能上传一份！',type:'warning'})
      },
      handleContractUpload(resp,file,filelist){
        this.$message({message:'上传文件成功!',type:'success'})
      },
    }
  }
</script>
<style  scoped rel="stylesheet/scss" lang="scss">
  .checkStudent {
    margin-top: 60px;
  }
  .downStyle{
    width: 64px;
    height: 40px;
    border-radius: 4px;
    text-align: center;
    margin-left: 10px;
    line-height: 40px;
    background: #3a8ee6;
    display: inline-block;
  }
  .handle{
    float: left;
  }
</style>
<style  rel="stylesheet/scss" lang="scss">
  .checkStudent {
    .el-table {
      .handle {
        .result {
          color: #ffffff;
          font-size: 12px;
          display: inline-block;
          padding: 8px 15px;
          border-radius: 4px;
          margin-right: 8px;
        }
        .reject {
          padding: 12px 32px;
        }
        .allowed {
          background-color: #6ed596;
        }
        .notAllowed {
          background-color: #b8b9c7;
        }
      }
    }
  }
</style>
