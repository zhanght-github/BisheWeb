<template>
  <div class="select">
    <div class="tableWrapper">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="topicname" label="课题名称" width="100" align="center"></el-table-column>
        <el-table-column label="选题内容" align="left">
          <template slot-scope="scope">
            <div v-html="scope.row.topiccontent"></div>
          </template>
        </el-table-column>
        <el-table-column prop="topicsource" label="题目来源" width="100" align="center"></el-table-column>
        <el-table-column prop="teachername" label="选题负责人" width="100" align="center"></el-table-column>
        <el-table-column prop="topictype" label="课题类型" width="100" align="center"></el-table-column>
        <el-table-column label="已选人数/选题总人数" width="200" align="center">
          <template slot-scope="scope">
           {{scope.row.alreadynum}}/{{scope.row.supplynum}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope" >
            <el-button type="primary" size="small" @click="handleOpen(scope.row)">查看</el-button>
            <el-button type="success" size="small" @click="handleSelect(scope.row.topicid,scope.row.topicname)">选择课题</el-button>
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
import { topicSelect, studentSelect } from '@/api/student'

export default {
  data() {
    return {
      page: 1,
      size: 10,
      loading: false,
      topicDialog: false,
      tableData: [],
      showData: {}
    }
  },
  methods: {
    getData() {
      topicSelect(this.page - 1, this.size).then(res => {
        this.tableData = res.data.data.content
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
    handleSelect(id, name) {
      this.$confirm(`确定要选择「${name}」课题吗?`, '确定选择？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'blueMessage'
      })
        .then(() => {
          studentSelect(this.getUserId(), id).then(res => {
            this.$message({ type: 'success', message: res.data.message })
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
</style>
