<template>
  <div class="select">
    <div class="tableWrapper">
      <el-table :data="stuData" border style="width: 100%" v-loading="loading">
        <el-table-column
          prop="username"
          label="学生姓名"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="collegename"
          label="学生学院"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="major"
          label="学生专业"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userid"
          label="学生学号"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userphone"
          label="学生电话"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userpassword"
          label="学生密码"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="300">
          <template slot-scope="scope" >
            <el-button type="success" size="small" @click="handleOpen(scope.row)">修改</el-button>
            <el-button type="danger" size="small" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    el
      <el-dialog title="查看课题信息" class='editdia' width="500px" :visible.sync="topicDialog" :close-on-press-escape='true' :close-on-click-modal='false'>
      <div class="diabody diascroll" style="height: 400px">
        <div class="detail-row">
          <div class="row-title">课题名称</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.topicname"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">课题内容</div>
          <div class="row-content">
             <span>
              <el-input type="textarea" v-model="showData.topiccontent"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">选题总人数</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.supplynum"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">已选人数</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.alreadynum"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">选题时间</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.createtime"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">指导教师</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.topicname"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">课题类型</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.teachername"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">课题来源</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.topicsource"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">指导老师电话</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.teacherphone"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">日程安排</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input type="textarea" v-model="showData.schedule"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">学院</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.collegename"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">专业</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.major"></el-input>
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
  import { getteacher } from '@/api/admin'

  export default {
    data() {
      return {
        page: 1,
        size: 10,
        loading: false,
        topicDialog: false,
        tableData: [],
        showData: {},
        stuData: []
      }
    },
    methods: {
      getData() {
        topicSelect(this.page - 1, this.size).then(res => {
          this.tableData = res.data.data.content
        })
      },
      getteacher() {
        getteacher(0, 10, 0, 1).then(res => {
          this.stuData = res.data.data.content
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
    },
    created() {
      this.getData()
      this.getteacher()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../../styles/common';
</style>
