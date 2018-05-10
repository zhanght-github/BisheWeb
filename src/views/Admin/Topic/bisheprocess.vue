<!--  -->
<template>
  <div class="checkStudent">
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        property="keti"
        label="课题名称"
        width="250">
      </el-table-column>
      <el-table-column
        property="name"
        label="教师姓名"
        width="100">
      </el-table-column>
      <el-table-column
        property="subject"
        label="课题类型"
        width="100">
      </el-table-column>
      <el-table-column
        property="process"
        label="课题进行阶段">
      </el-table-column>
      <el-table-column
        property="phone"
        label="导师联系电话">
      </el-table-column>
      <el-table-column
        property="score"
        label="课题评分">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          {
            name: '王五',
            score: '70',
            keti: '长途客运公司信息管理系统',
            subject: '设计类',
            process: '中期检查',
            phone: '123456798',
            status: 0
          },
          {
            name: '王六',
            score: '80',
            keti: '校园跳蚤市场的设计与实现',
            subject: '论文类',
            process: '答辩',
            phone: '123456798',
            status: 1
          },
          {
            name: '王七',
            score: '90',
            keti: '基于网络爬虫的搜索引擎设计与实现',
            subject: '设计类',
            process: '评分',
            phone: '123456798',
            status: -1
          }
        ]
      }
    },
    methods: {
      allowStudent(val) {
        this.$confirm(`确定同意${val.name}选择「${val.keti}」课题?`, '同意选题', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'blueMessage'
        })
          .then(() => {})
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      },
      rejectStudent(val) {
        this.$confirm(`确定拒绝${val.name}选择「${val.keti}」课题?`, '拒绝选题', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {})
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
