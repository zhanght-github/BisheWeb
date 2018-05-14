<!--  -->
<template>
  <div class="recommend">
    <el-table
        :data="dataList"
        style="width: 100%">
         <el-table-column
          property="topicname"
          label="课题名称"
          width="250">
          </el-table-column>
          <el-table-column
          property="studentname"
          label="选题学生"
          width="100">
          </el-table-column>
          <el-table-column
          property="studentid"
          label="学生学号">
          </el-table-column>
          <el-table-column
          label="论文下载">
            <template slot-scope="scope">
                <div class="handle">
                  <a class="clickdoc" :href="scope.row.url">{{scope.row.paperpath}}</a>
                </div>
            </template>
          </el-table-column>
          <el-table-column
          label="操作"
          width="240">
            <template slot-scope="scope">
              <div class="handle">
                <el-button type="primary" v-if='scope.row.isrecommend ===0' plain class="deepbluebtn" @click="openGrade(scope.row)">推优</el-button>
                <span class="notAllowed result" v-if='scope.row.isrecommend ===1'>待审核</span>
                <span class="allowed result" v-if='scope.row.isrecommend ===2'>审核通过</span>
                <span class="red result" v-if='scope.row.isrecommend ===-1'>审核失败</span>
                <el-button type="primary" v-if='scope.row.isrecommend ===-1' plain class="deepbluebtn" @click="openGrade(scope.row)">再次推优</el-button>
              </div>
            </template>
          </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getScoreList, recommendPaper } from '@/api/teacher'
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
      updataData: {
        score: null
      },
      pageNum: 1,
      pageSize: 10,
      total: null,
      dataList: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getScoreList(this.pageNum - 1, this.pageSize, this.getUserId()).then(res => {
        this.dataList = res.data.data.content
        this.dataList.forEach(item => {
          if (item.paperpath) {
            item.url = CMethods.spliceDownloadUrl(item.topicname, item.paperpath)
          }
        })
        this.total = res.data.data.total
      })
    },
    openGrade(val) {
      var aa = val.paperpath
        .replace(/.docx/g, '')
        .replace(/.doc/g, '')
        .replace(/.pdf/g, '')
        .replace(/.rtf/g, '')
      this.$confirm(`确定将${val.studentname}的《${aa}》推优`, '确认推优', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'blueMessage'
      })
        .then(() => {
          recommendPaper(val.studentid, 1).then(res => {
            this.getData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    closebtn() {
      this.gradedia = false
    }
  }
}
</script>

<style  scoped rel="stylesheet/scss" lang="scss">

</style>
<style   rel="stylesheet/scss" lang="scss">
@import 'src/styles/variables.scss';
.recommend {
  .el-table {
    .watchSuggest {
      text-decoration: underline;
      &:hover {
        cursor: pointer;
        color: $fontblue;
      }
    }
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
      .red {
        background-color: $red;
      }
    }
  }
  .uploadDia {
    .diabody {
      padding: 12px 24px;
      .label {
        color: $fontcolor;
      }
      .el-radio-group {
        .el-radio-button__inner {
          padding: 10px 20px;
        }
      }
    }
  }
}
</style>
