<template>
  <div class="select">
    <div class="tableWrapper">
      <div>
        <el-button type="primary" class="truebutton deepbluebtn" @click="closeDialog()">添加学生</el-button>
      </div>
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
    <el-dialog title="查看课题信息" class='editdia' width="500px" :visible.sync="topicDialog" :close-on-press-escape='false' :close-on-click-modal='false'>
      <div class="diabody diascroll" style="height: 400px">
        <div class="detail-row">
          <div class="row-title">学生姓名</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.username"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">学生学院</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.collegename"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">学生专业</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.major"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">学生学号</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.userid"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">学生密码</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.userpassword"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">学生电话</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.userphone"></el-input>
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
  import { register } from '@/api/login'

  export default {
    data() {
      return {
        page: 1,
        size: 10,
        loading: false,
        topicDialog: false,
        tableData: [],
        tablesData: [],
        showData: {
          username: ""

        },
        stuData: []
      }
    },
    methods: {
      getData() {
        topicSelect(0, 10).then(res => {
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
        }
        register().then(res => {
          this.username = data.username
        })
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
