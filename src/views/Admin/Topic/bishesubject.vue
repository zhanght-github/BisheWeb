<template>
  <div class="select">
    <div class="tableWrapper">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column
          prop="topicname"
          label="课题名称"
          width="300"
          align="center">
        </el-table-column>
        <el-table-column
          prop="topictype"
          label="课题类型"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="teachername"
          label="负责导师"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="teachername"
          label="导师电话"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="412">
          <template slot-scope="scope">
            <el-button type="success" @click="handleOpen(scope.row)">查看课题信息</el-button>
            <div v-if='scope.row.topicstate === 0' class="handle">
              <el-button type="primary" plain class="deepbluebtn" @click="allowStudent(scope.row.topicid, scope.row.topicstate, scope.row.teachername)">同意</el-button>
              <el-button type="primary" plain class="deepredbtn reject" @click="rejectStudent(scope.row.topicid, scope.row.topicstate, scope.row.teachername)">拒绝</el-button>
            </div>
            <div v-if='scope.row.topicstate === 1' class="handle">
              <span class="allowed result">已通过</span >
            </div>
            <div v-if='scope.row.topicstate === -1' class="handle">
              <span class="notAllowed result">未通过</span >
            </div>
          </template>
        </el-table-column>
      </el-table>
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
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { topicSelect, studentSelect } from '@/api/student'
  import { getexamine } from '@/api/admin'

  export default {
    data() {
      return {
        page: 1,
        size: 10,
        loading: false,
        topicDialog: false,
        tableData: [],
        showData: {},
        topic: [],
        topiciD: [],
        topicstate: 0,
        teachername: [],
        status: 'OK'
      }
    },
    methods: {
      getData() {
        topicSelect(this.page - 1, this.size).then(res => {
          this.tableData = res.data.data.content
        })
      },
      getexamine() {
        getexamine(this.topicid, this.topicstate).then(res => {
          this.topic = res.data
        })
      },
      closeDialog() {
        this.topicDialog = !this.topicDialog
      },
      handleOpen(data) {
        this.topicDialog = !this.topicDialog
        if (data !== undefined) {
          this.showData = JSON.parse(JSON.stringify(data))
          this.showData.schedule = this.showData.schedule.replace(/<br>/g, '\n')
          this.showData.topiccontent = this.showData.topiccontent.replace(/<br>/g, '\n')
        }
      },
      allowStudent(id, topicname, teachername) {
        this.$confirm(`确定同意「${teachername}」的课题?`, '同意选题', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'blueMessage'
        })
          .then(() => {
            getexamine(id, 1).then(res => {
              this.status = res.data.status
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
      rejectStudent(id, topicname, teachername) {
        this.$confirm(`确定拒绝「${teachername}」的课题?`, '拒绝选题', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            getexamine(id, -1).then(res => {
              this.status = res.data.status
              this.getdata()
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
      this.getexamine()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../../styles/common';
</style>
