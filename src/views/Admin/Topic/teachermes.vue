<template>
  <div class="select">
    <div class="tableWrapper">
      <div>
        <el-button type="primary" class="truebutton deepbluebtn" @click="closeDialog()">添加学生</el-button>
      </div>
      <el-table :data="stuData" border style="width: 100%" v-loading="loading">
        <el-table-column
          prop="username"
          label="教师姓名"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="collegename"
          label="教师学院"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="major"
          label="教师专业"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userid"
          label="教师工号"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userpassword"
          label="教师密码"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userphone"
          label="教师电话"
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
          <div class="row-title">教师姓名</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.username"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">教师学院</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-select v-model="college" @change="getMajor" class="selectDown">
              <el-option
                v-for="(item,index) in collegeList"
                :key="index"
                :label="item.collegename"
                :value="item.collegeid">
              </el-option>
            </el-select>
            </span>
          </div>
        </div>


        <div class="detail-row">
          <div class="row-title">教师工号</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.userid"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">教师密码</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.userpassword"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">教师电话</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input v-model="showData.userphone"></el-input>
            </span>
          </div>
        </div>
      </div>
      <div class="diafoot flex">
        <el-button type="primary" class="truebutton deepbluebtn"  @click="editbtn()">保存</el-button>
        <el-button type="info" class="cancelbtn" @click="closeDialog()">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { topicSelect, studentSelect } from '@/api/student'
  import { getteacher } from '@/api/admin'
  import { register } from '@/api/login'
  import { getCollege, getMajor } from '@/api/index'

  export default {
    data() {
      return {
        page: 1,
        size: 10,
        loading: false,
        topicDialog: false,
        tableData: [],
        tablesData: [],
        college:null,
        showData: {
          username: "",
          userid: "",
          userpassword: "",
          userphone: "",
          collegeid: "",
          collegename: "",
          major: "",
          role: 1
        },
        stuData: [],
        collegeList: [],
        majorList: []
      }
    },
    methods: {
//      getData() {
//        topicSelect(this.page-1, this.size).then(res => {
//          this.tableData = res.data.data.content
//        })
//      },
      getteacher() {
        getteacher(this.page-1, this.size, 1, this.getUsers().collegeid).then(res => {
          this.stuData = res.data.data.content
        })
      },
      reset(){
        this.showData= {
          username: "",
          userid: "",
          userpassword: "",
          userphone: "",
          collegeid: "",
          collegename: "",
          major: "",
          role: 0
        }
        this.majorList = []
        this.college = null
      },
      editbtn(){
        register(this.showData).then(res => {
          this.topicDialog = false
          this.reset()
          this.getteacher()
        })
      },
      closeDialog() {
        this.topicDialog = !this.topicDialog
        this.showData= {
          username: "",
          userid: "",
          userpassword: "",
          userphone: "",
          collegeid: "",
          collegename: "",
          major: "",
          role: 1
        }
        this.majorList = []
        this.college = null
      },
      handleOpen(data) {
        this.topicDialog = !this.topicDialog
        if (data !== undefined) {
          this.showData = JSON.parse(JSON.stringify(data))
          this.college = data.collegeid
          getMajor(data.collegeid).then(res => {
            this.majorList = res.data.data
          })
        }
      },
      getCollege(){
        getCollege().then(res=>{
          this.collegeList = res.data.data
        })
      },
      getMajor(val){
        this.showData.collegeid = val
        this.collegeList.forEach(item=>{
          if(item.collegeid === val){
            this.showData.collegename = item.collegename
          }
        })
        getMajor(val).then(res => {
          this.majorList = res.data.data
        })
      }
    },
    created() {
//      this.getData()
      this.getteacher()
      this.getCollege()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../../styles/common';
</style>
