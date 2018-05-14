<!--  -->
<template>
  <div class="CheckList">
    <div class="header bor4">
      <div class="teamTeacher">
        同组检阅教师: <span>张三</span><span>李四</span><span>王二</span>
      </div>
    </div>
    <div class="content bor4">
      <div class="label">需检阅学生</div>
      <el-table
        :data="checklist"
        style="width: 100%">
        <el-table-column
          property="studentname"
          label="学生名称"
          width="100">
          </el-table-column>
         <el-table-column
          property="topicname"
          label="课题名称"
          width="250">
          </el-table-column>
          <el-table-column
          property="studentid"
          label="学生学号">
          </el-table-column>
          <el-table-column
          property="teachername"
          label="所属老师">
          </el-table-column>
          <el-table-column
          label="文件">
            <template slot-scope="scope">
              <a  class="clickdoc doclabel" v-if='scope.row.middlereportPath' :href="scope.row.url">{{scope.row.middlereportPath}}</a>
              <a  class="doclabel" v-if='!scope.row.middlereportPath' href="">未上传中检报告</a>
            </template>
          </el-table-column>
          <el-table-column
          label="评阅意见">
            <template slot-scope="scope">
              <span class="watchSuggest" @click="openSuggest(scope.row)">查看意见</span>
            </template>
          </el-table-column>
          <el-table-column
          label="操作"
          width="240">
            <template slot-scope="scope">
              <div v-if='scope.row.middlecheckScore' class="handle">
                <span class="allowed result">{{scope.row.middlecheckScore}}</span>
                <el-button type="primary" plain class="deepbluebtn" @click="editIssued(scope.row)">重新评阅</el-button>
              </div>
              <div v-if='!scope.row.middlecheckScore' class="handle">
                <el-button type="primary" plain class="deepbluebtn" @click="openIssued(scope.row)">评阅</el-button>
              </div>
            </template>
          </el-table-column>
    </el-table>

    <el-dialog class='editdia uploadDia' title="中期检查建议" width="600px" :visible.sync="Dialog" :close-on-press-escape='false' :close-on-click-modal='false'>
      <div class="diabody">
        <div class="infobox">
          <div class="label">评分</div>
          <el-input :autosize='false' v-model="updataData.middlecheckScore" class="inputname" placeholder="输入分数"></el-input>
        </div>
        <div class="infobox">
          <div class="label">建议</div>
          <el-input :autosize='false' type="textarea" v-model="updataData.middlecheckSuggest" class="inputname" placeholder="输入建议"></el-input>
        </div>
      </div>
      <div class="diafoot flex">
        <el-button type="primary" class="truebutton deepbluebtn"  @click="review()">确认评阅</el-button>
        <el-button type="info" class="cancelbtn" plain @click="closebtn()">取消</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { middleStudent, middleCheck } from '@/api/teacher'
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
          blong: '王二',
          phone: '15670372860',
          status: 0,
          suggest: '都是佛is的哈佛'
        },
        {
          name: 'zhangsan',
          keti: '基于vue的毕业设计管理系统',
          topicID: '110',
          ID: '141404050126',
          blong: '李四',
          phone: '15670372860',
          status: 1
        },
        {
          name: 'zhangsan',
          keti: '基于vue的毕业设计管理系统',
          topicID: '110',
          ID: '141404050126',
          blong: '周五',
          phone: '15670372860',
          status: -1
        }
      ],
      Dialog: false,
      isAdd: false,
      isEdit: false,
      updataData: {
        studentid: null,
        middlecheckScore: null,
        middlecheckSuggest: null,
        middlecheckIspass: 1
      },
      checklist: [],
      selectData: null
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      middleStudent(this.getUserId()).then(res => {
        this.checklist = res.data.data
        this.checklist.forEach(item => {
          item.url = CMethods.spliceDownloadUrl(item.topicname, item.middlereportPath)
        })
      })
    },
    editIssued(val) {
      this.Dialog = true
    },
    openIssued(val) {
      this.Dialog = true
      this.selectData = val
    },
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
    reset() {
      this.selectData = null
      this.updataData = {
        studentid: null,
        score: null,
        suggest: null,
        ispass: null
      }
    },
    review() {
      this.updataData.studentid = this.selectData.studentid
      if (parseInt(this.updataData.middlecheckScore) >= 60) {
        this.updataData.middlecheckIspass = 1
      } else {
        this.updataData.middlecheckIspass = -1
      }
      middleCheck(this.updataData).then(res => {
        this.getData()
        this.Dialog = false
        this.reset()
      })
    },
    closebtn() {
      this.Dialog = false
      this.reset()
    }
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.CheckList {
  .header {
    margin-top: 60px;
    padding: 10px;
    background-color: white;
    span {
      margin-right: 5px;
      color: #000;
      font-size: 14px;
    }
  }
  .content {
    margin-top: 10px;
    .label {
      margin-bottom: 10px;
      color: #000;
    }
  }
}
</style>
<style  rel="stylesheet/scss" lang="scss">
@import 'src/styles/variables.scss';
.CheckList {
  .clickdoc {
        text-decoration: underline;
        &:hover {
          cursor: pointer;
          color: $fontblue;
        }
      }
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
      .clickdoc {
        text-decoration: underline;
        &:hover {
          cursor: pointer;
          color: $fontblue;
        }
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
