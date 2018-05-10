<!--  -->
<template>
  <div class="checkStudent">
    <el-table
        :data="applyList"
        style="width: 100%">
         <el-table-column
          property="topicname"
          label="课题名称"
          width="250">
          </el-table-column>
          <el-table-column
          property="studentname"
          label="申请学生"
          width="100">
          </el-table-column>
          <el-table-column
          property="studentid"
          label="学生学号">
          </el-table-column>
          <el-table-column
          property="major"
          label="学生专业">
          </el-table-column>
          <el-table-column
          property="studentphone"
          label="学生电话">
          </el-table-column>
          <el-table-column
          label="操作"
          width="240">
            <template slot-scope="scope">
              <div v-if='scope.row.selectIspass == 0' class="handle">
                <el-button type="primary" plain class="deepbluebtn" @click="allowStudent(scope.row)">同意</el-button>
                <el-button type="primary" plain class="deepredbtn reject" @click="rejectStudent(scope.row)">拒绝</el-button>
              </div>
              <div v-if='scope.row.selectIspass == 1' class="handle">
                <span class="allowed result">已通过</span >
                <!-- <el-button type="primary" plain class="orangebtn" >撤销选题</el-button> -->
              </div>
              <div v-if='scope.row.selectIspass == -1' class="handle">
                <span class="notAllowed result">未通过</span >
                <!-- <el-button type="primary" plain class="orangebtn" >撤销选题</el-button> -->
              </div>
            </template>
          </el-table-column>
      </el-table>
    <Pagging :total='total' :PageNum='pageNum' :pageSize='pageSize' @handlePageSize='handlePageSize' @handlePageNum='handlePageNum'></Pagging>
  </div>
</template>

<script>
import Pagging from '../../common/Pagging'
import { getSelectList, confirmStudent } from '@/api/teacher'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      applyList: []
    }
  },
  components: { Pagging },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getdata()
    },
    handlePageSize(val) {
      this.pageSize = val
      this.getdata()
    },
    handlePageNum(val) {
      this.pageNum = val
      this.getdata()
    },
    getdata() {
      getSelectList(this.pageNum - 1, this.pageSize, this.getUserId()).then(res => {
        this.applyList = res.data.data.content
        this.total = res.data.data.total
      })
    },
    allowStudent(val) {
      this.$confirm(`确定同意${val.studentname}选择「${val.topicname}」课题?`, '同意选题', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'blueMessage'
      })
        .then(() => {
          confirmStudent(val.studentid, 1).then(res => {
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
    rejectStudent(val) {
      this.$confirm(`确定拒绝${val.studentname}选择「${val.topicname}」课题?`, '拒绝选题', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          confirmStudent(val.studentid, -1).then(res => {
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
  }
}
</script>
<style  scoped rel="stylesheet/scss" lang="scss">
.checkStudent {
  margin-top: 60px;
}
</style>
<style  rel="stylesheet/scss" lang="scss">
.checkStudent {
  .el-table {
    margin-bottom: 70px;
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
