<!--  -->
<template>
  <div class="AdviserApprise">
    <el-table
        :data="datalist"
        v-if="showTable"
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
          label="论文状态"
          width="240">
            <template slot-scope="scope">
                <div class="handle">
                  <span v-if='scope.row.paperdraftPath' class="allowed result">初稿已提交</span>
                  <span v-if='scope.row.paperdraftPath' class="watchSuggest" @click="openPaper(scope.row)">查看论文</span>
                  <span v-if='!scope.row.paperdraftPath' class="notAllowed result">初稿未提交</span>
                </div>
            </template>
          </el-table-column>
          <el-table-column
          label="审阅状态"
          width="240">
            <template slot-scope="scope">
              <div v-if='!scope.row.paperdraftIspass' class="handle">
                <span class="notAllowed result">审阅老师暂未审阅</span>
              </div>
              <div v-if='scope.row.paperdraftIspass == 1' class="handle">
                <span class="allowed result">通过</span>
                <span class="watchSuggest" @click="openSuggest(scope.row)">查看意见</span>
              </div>
              <div v-if='scope.row.paperdraftIspass == -1' class="handle">
                <span class="notAllowed result">未通过</span>
                <span class="watchSuggest" @click="openSuggest(scope.row)">查看意见</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
          label="操作"
          width="240">
            <template slot-scope="scope">
              <div v-if='!scope.row.paperdraftIspass' class="handle">
                <el-button  type="primary" plain class="deepbluebtn" @click="editIssued(scope.row)">审阅</el-button>
              </div>
              <div v-if='scope.row.paperdraftIspass' class="handle">
                <el-button type="primary" plain class="deepbluebtn" @click="editIssued(scope.row)">重新审阅</el-button>
              </div>
            </template>
          </el-table-column>
    </el-table>
    <div class="paperinfo"  v-if="!showTable">
      <div class="back">
        <el-button type="primary" plain class="deepbluebtn backbtn" @click="backtolist()"><i class="iconfont icon-ico_arrow_left"></i> 返回列表</el-button>
      </div>
      <el-table
        :data="topicInfo"
        style="width: 100%">
         <el-table-column
          property="topicname"
          label="课题名称"
          width="250">
          </el-table-column>
          <el-table-column
          label="是否结合实际"
          width="120">
            <template slot-scope="scope">
                <div v-if='scope.row.shiji' class="handle">
                  是
                </div>
                <div v-if='!scope.row.shiji' class="handle">
                  否
                </div>
            </template>
          </el-table-column>
          <el-table-column
          property="topicsource"
          label="课题来源">
          </el-table-column>
          <el-table-column
          property="topictype"
          label="课题类型">
          </el-table-column>
           <el-table-column
          label="论文下载">
            <template slot-scope="scope">
                <div class="handle">
                  <a class="clickdoc" :href="scope.row.url">测试1.doc</a>
                </div>
            </template>
          </el-table-column>
      </el-table>
    </div>

    <el-dialog class='editdia uploadDia' title="审阅初稿" width="600px" :visible.sync="Dialog" :close-on-press-escape='false' :close-on-click-modal='false'>
      <div class="diabody">
        <div class="infobox">
          <div class="label">审核结果</div>
          <el-radio-group v-model="updataData.ispass">
              <el-radio-button label="1" >通过</el-radio-button>
              <el-radio-button label="-1">不通过</el-radio-button>
            </el-radio-group>
        </div>
        <div class="infobox">
          <div class="label">建议</div>
          <el-input :autosize='false' type="textarea" v-model="updataData.suggest" class="inputname" placeholder="输入建议"></el-input>
        </div>
      </div>
      <div class="diafoot flex">
        <el-button type="primary" class="truebutton deepbluebtn"  @click="review()">确认</el-button>
        <el-button type="info" class="cancelbtn" plain @click="closebtn()">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { topicInfo, defencelist, draftispass } from '@/api/teacher'
import { studentAssign } from '@/api/student'
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
      showTable: true,
      topicInfo: [],
      Dialog: false,
      updataData: {
        studentid: null,
        suggest: null,
        ispass: 1
      },
      pageNum: 1,
      pageSize: 10,
      total: null,
      datalist: [],
      selectData: null
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      defencelist(this.pageNum - 1, this.pageSize, this.getUserId()).then(res => {
        this.datalist = res.data.data.content
        this.datalist.forEach(item => {
          if (item.paperdraftPath) {
            item.url = CMethods.spliceDownloadUrl(item.topicname, item.paperdraftPath)
          }
        })
      })
    },
    openPaper(val) {
      this.showTable = false
      if (val.paperdraftPath) {
        studentAssign(val.studentid).then(res => {
          var ids = res.data.data.topicid
          topicInfo(ids).then(res => {
            res.data.data.url = CMethods.spliceDownloadUrl(res.data.data.topicname, val.paperdraftPath)
            this.topicInfo.push(res.data.data)
          })
        })
      } else {
        this.topicInfo = []
      }
    },
    backtolist() {
      this.showTable = true
      this.topicInfo = []
    },
    editIssued(val) {
      this.Dialog = true
      this.selectData = val
    },
    closebtn() {
      this.Dialog = false
    },
    openSuggest(val) {
      if (val.paperdraftSuggest) {
        this.$confirm(`${val.paperdraftSuggest}`, '审核意见', {
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
        suggest: null,
        ispass: 1
      }
    },
    review() {
      this.updataData.studentid = this.selectData.studentid
      draftispass(this.updataData.studentid, this.updataData.ispass, this.updataData.suggest).then(res => {
        this.Dialog = false
        this.reset()
        this.getData()
      })
    }
  }
}
</script>
<style  scoped rel="stylesheet/scss" lang="scss">
.AdviserApprise {
  margin-top: 60px;
}
</style>
<style  rel="stylesheet/scss" lang="scss">
@import 'src/styles/variables.scss';
.AdviserApprise {
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

