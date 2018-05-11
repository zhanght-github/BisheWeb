<template>
  <div class="select">
    <div class="tableWrapper">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="topicname" label="课题名称" width="150" align="center"></el-table-column>
        <el-table-column prop="topicsource" label="答辩时间" width="150" align="center"></el-table-column>
        <el-table-column prop="teachername" label="答辩地点" width="150" align="center"></el-table-column>
        <el-table-column prop="topictype" label="答辩导师" align="center"></el-table-column>
        <el-table-column prop="topictype" label="答辩成绩" width="100" align="center"></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="small" style="margin-top: 10px" @click="handleOpen(scope.row)">查看详情</el-button>
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
    <el-dialog title="答辩信息" class='editdia' width="500px" :visible.sync="topicDialog" :close-on-press-escape='false' :close-on-click-modal='false'>
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
        <div class="detail-row">
          <div class="row-title">课题成绩</div>
          <div class="row-content">
             <span>
              <el-input v-model="showData.topiccontent" :disabled="true"></el-input>
            </span>
          </div>
        </div>
        <div class="detail-row">
          <div class="row-title">导师评语</div>
          <div class="row-content">
            <span class="input-wrapper">
              <el-input type="textarea" v-model="showData.supplynum" :disabled="true"></el-input>
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
          this.showData.schedule = this.showData.schedule.replace(/<br>/g, '\n');
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
