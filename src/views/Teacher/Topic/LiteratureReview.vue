<!--  -->
<template>
  <div class="LiteratureReview">
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
                <span class="notAllowed result">未上传任务书</span >
              </div>
              <div v-if='scope.row.status == 1' class="handle">
                <el-button type="primary" plain class="deepbluebtn" @click="openIssued(scope.row)">下载</el-button>
                <el-button type="primary" plain class="deepbluebtn" @click="openIssued(scope.row)">评阅</el-button>
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
  }
}
</script>
<style  scoped rel="stylesheet/scss" lang="scss">
.LiteratureReview {
  margin-top: 60px;
}
</style>
<style  rel="stylesheet/scss" lang="scss">
@import 'src/styles/variables.scss';
.LiteratureReview {
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

