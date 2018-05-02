<template>
  <div class="select">
    <div class="tableWrapper">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="topicname" label="课题名称" width="100" align="center"></el-table-column>
        <el-table-column prop="topiccontent" label="选题内容" align="center"></el-table-column>
        <el-table-column prop="topicstate" label="选题状态" width="120" align="center"></el-table-column>
        <el-table-column prop="alreadynum" label="已选人数" width="120" align="center"></el-table-column>
        <el-table-column prop="supplynum" label="选题总人数" width="120" align="center"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="200" align="center"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope" >
            <el-button type="primary" size="small">查看</el-button>
            <el-button type="success" size="small">选择</el-button>
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
  </div>
</template>

<script>
  import {topicSelect} from '@/api/student'

  export default {
    data() {
      return {
        page: 1,
        size: 10,
        loading: false,
        tableData: []
      }
    },
    methods: {
      getData() {
        topicSelect(this.page - 1, this.size).then(res => {
          this.tableData = res.data.data.content
        })
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../styles/common";
</style>
