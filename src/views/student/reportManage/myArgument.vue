<template>
  <div class="myArgument">
    <div class="tableWrapper">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
        <el-table-column prop="topicname" label="课题名称" width="150" align="center"></el-table-column>
        <el-table-column prop="defenceTime" label="答辩时间" width="150" align="center"></el-table-column>
        <el-table-column prop="defenceLocation" label="答辩地点" width="150" align="center"></el-table-column>
        <el-table-column prop="groupid" label="答辩分组" width="150" align="center"></el-table-column>
        <el-table-column prop="teachername" label="答辩导师" align="center"></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <!--<template slot-scope="scope">-->
            <!--<el-button class="deepbluebtn" type="primary" size="small" style="margin-top: 10px" @click="handleOpen(scope.row)">查看详情</el-button>-->
          <!--</template>-->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { topicSelect, studentSelect,queryMessage } from '@/api/student'

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
        queryMessage(this.getUserId()).then(res => {
          this.tableData = res.data.data
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
<style rel="stylesheet/scss" lang="scss">
  .myArgument .cell{
    height: 60px;
    line-height: 60px;
  }
  .myArgument .el-table td, .el-table th{
    padding: 0;
  }
</style>
