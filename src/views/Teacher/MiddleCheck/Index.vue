<!--  -->
<template>
  <div class="MiddleCheck">
    <el-table
        :data="mineList"
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
          label="中检报告">
            <template slot-scope="scope">
              <a  class="clickdoc doclabel" v-if='scope.row.middlereportPath' :href="scope.row.url">{{scope.row.middlereportPath}}</a>
              <a  class="doclabel" v-if='!scope.row.middlereportPath' href="">未上传中检报告</a>
            </template>
          </el-table-column>
          <el-table-column
          label="操作"
          width="240">
            <template slot-scope="scope">
              <div v-if='scope.row.middlecheckIspass' class="handle">
                <span class="allowed result">{{scope.row.middlecheckScore}}</span>
                <span class="watchSuggest" @click="openSuggest(scope.row)">查看意见</span>
              </div>
              <div v-if='!scope.row.middlecheckIspass' class="handle">
                <span class="notAllowed result">审阅老师暂未审阅</span>
              </div>
            </template>
          </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { middleMine } from '@/api/teacher'
import CMethods from '../../../commonJS/Methods'
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
      ],
      pageNum: 1,
      pageSize: 10,
      total: null,
      mineList: null
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    openSuggest(val) {
      if (val.middlecheckSuggest) {
        this.$confirm(`${val.middlecheckSuggest}`, '审核意见', {
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
    },
    getData() {
      middleMine(this.pageNum - 1, this.pageSize, this.getUserId()).then(res => {
        this.mineList = res.data.data.content
        this.mineList.forEach(item => {
          if (item.middlereportPath) {
            item.url = CMethods.spliceDownloadUrl(item.topicname, item.middlereportPath)
          }
        })
      })
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
  .clickdoc {
    text-decoration: underline;
    &:hover {
      cursor: pointer;
      color: $fontblue;
    }
  }
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

