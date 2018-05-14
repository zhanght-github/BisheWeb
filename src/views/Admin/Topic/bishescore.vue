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
    </el-table>
  </div>
</template>

<script>
  import { getexcellent, goodstate } from '@/api/admin'
  import { topicSelect, studentSelect } from '@/api/student'
  export default {
    data() {
      return {
        page: 0,
        size: 10,
        stuData: [],
        studentid: [],
        isrecommend: 1,
        tableData: [],
        state: 1
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        goodstate(this.page, this.size, 1).then(res => {
          this.tableData = res.data.data.content
        })
      },
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
