<!--  -->
<template>
  <div class="MiddleCheck">
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
          label="申请学生"
          width="100">
          </el-table-column>
          <el-table-column
          property="ID"
          label="学生学号">
          </el-table-column>
          <el-table-column
          property="zhuanye"
          label="学生专业">
          </el-table-column>
          <el-table-column
          label="操作"
          width="240">
            <template slot-scope="scope">
              <div v-if='scope.row.status == 0' class="handle">
                <span class="allowed result">84分</span>
                <span class="watchSuggest" @click="openSuggest(scope.row)">查看意见</span>
              </div>
              <div v-if='scope.row.status == 1' class="handle">
                <span class="notAllowed result">审阅老师暂未审阅</span>
              </div>
            </template>
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
          name: 'zhangsan',
          keti: '基于vue的毕业设计管理系统',
          topicID: '110',
          ID: '141404050126',
          zhuanye: '物联网工程',
          phone: '15670372860',
          status: 0
        },
        {
          name: 'zhangsan',
          keti: '基于vue的毕业设计管理系统',
          topicID: '110',
          ID: '141404050126',
          zhuanye: '物联网工程',
          phone: '15670372860',
          status: 1
        },
        {
          name: 'zhangsan',
          keti: '基于vue的毕业设计管理系统',
          topicID: '110',
          ID: '141404050126',
          zhuanye: '物联网工程',
          phone: '15670372860',
          status: -1
        }
      ]
    }
  },
  methods: {
    openSuggest(val) {
      if (val.suggest) {
        this.$confirm(`${val.suggest}`, '审核意见', {
          confirmButtonText: '好的',
          customClass: 'blueMessage',
          showCancelButton: false
        })
      } else {
        this.$confirm('暂无意见', '审核意见', {
          confirmButtonText: '好的',
          customClass: 'blueMessage',
          showCancelButton: false
        })
      }
    }
  }
}
</script>
<style  scoped rel="stylesheet/scss" lang="scss">
.MiddleCheck {
  margin-top: 60px;
}
</style>
<style  rel="stylesheet/scss" lang="scss">
@import 'src/styles/variables.scss';
.MiddleCheck {
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
      .watchSuggest {
        text-decoration: underline;
        &:hover {
          cursor: pointer;
          color: $fontblue;
        }
      }
    }
  }
}
</style>

