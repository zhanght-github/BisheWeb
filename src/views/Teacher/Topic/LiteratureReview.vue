<!--  -->
<template>
  <div class="LiteratureReview">
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
          label="申请学生"
          width="100">
          </el-table-column>
          <el-table-column
          property="studentid"
          label="学生学号">
          </el-table-column>
          <el-table-column
          label="文件">
            <template slot-scope="scope">
              <a  class="clickdoc doclabel" v-if='scope.row.wenxianPath' :href="scope.row.url">{{scope.row.wenxianPath}}</a>
              <a  class="doclabel" v-if='!scope.row.wenxianPath' href="">未上传文献综述</a>
            </template>
          </el-table-column>
          <el-table-column
          label="审核状态">
          <template slot-scope="scope">
              <div v-if='scope.row.wenxianIspass == 0' class="handle">
                <span class="notAllowed result">未审核</span >
              </div>
              <div v-if='scope.row.wenxianIspass == 1' class="handle">
                <span class="allowed result">{{scope.row.wenxianScore}}已通过</span >
                <!-- <el-button type="primary" plain class="orangebtn" >撤销选题</el-button> -->
              </div>
              <div v-if='scope.row.wenxianIspass == -1' class="handle">
                <span class="low result">{{scope.row.wenxianScore}}未通过</span >
                <!-- <el-button type="primary" plain class="orangebtn" >撤销选题</el-button> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column
          label="操作"
          width="240">
            <template slot-scope="scope">
              <div class="handle">
                <el-button v-if='scope.row.wenxianIspass == 0' type="primary" plain class="deepbluebtn" @click="openDialog(scope.row)">评阅</el-button>
                <el-button v-if='scope.row.wenxianIspass != 0' type="primary" plain class="deepbluebtn" @click="openDialog(scope.row)">修改</el-button>
              </div>
            </template>
          </el-table-column>
    </el-table>

    <el-dialog class='editdia uploadDia' title="评阅文献综述" width="600px" :visible.sync="Dialog" :close-on-press-escape='false' :close-on-click-modal='false'>
      <div class="diabody">
        <div class="infobox">
          <div class="label">评分</div>
          <el-input :autosize='false' v-model="updataData.score" class="inputname" placeholder="输入分数"></el-input>
        </div>
        <div class="infobox">
          <div class="label">建议</div>
          <el-input :autosize='false' type="textarea" v-model="updataData.suggest" class="inputname" placeholder="输入建议"></el-input>
        </div>
      </div>
      <div class="diafoot flex">
        <el-button type="primary" class="truebutton deepbluebtn"  @click="review()">确认评阅</el-button>
        <el-button type="info" class="cancelbtn" plain @click="closebtn()">取消</el-button>
      </div>
    </el-dialog>
    <Pagging :total='total' :PageNum='pageNum' :pageSize='pageSize' @handlePageSize='handlePageSize' @handlePageNum='handlePageNum'></Pagging>
  </div>
</template>

<script>
import Pagging from '../../common/Pagging'
import { getOpenlist, reportispass } from '@/api/teacher'
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
      total: 0,
      dataList: [],
      Dialog: false,
      updataData: {
        studentid: null,
        score: null,
        suggest: null,
        ispass: 1
      }
    }
  },
  components: { Pagging },
  mounted() {
    this.getData()
  },
  methods: {
    handlePageSize(val) {
      this.pageSize = val
      this.getData()
    },
    handlePageNum(val) {
      this.pageNum = val
      this.getData()
    },
    getData() {
      getOpenlist(this.pageNum - 1, this.pageSize, this.getUserId()).then(res => {
        this.dataList = res.data.data.content
        this.total = res.data.data.total
        this.dataList.forEach(item => {
          item.url = CMethods.spliceDownloadUrl(item.topicname, item.wenxianPath)
        })
      })
    },
    openDialog(val) {
      this.Dialog = true
      this.updataData.studentid = val.studentid
    },
    closebtn() {
      this.Dialog = false
      this.reset()
    },
    reset() {
      this.updataData = {
        studentid: null,
        score: null,
        suggest: null,
        ispass: 1
      }
    },
    review() {
      if (parseInt(this.updataData.score) >= 60) {
        this.updataData.ispass = 1
      } else {
        this.updataData.ispass = -1
      }
      reportispass(
        this.updataData.studentid,
        this.updataData.ispass,
        this.updataData.score,
        this.updataData.suggest
      ).then(res => {
        this.getData()
        this.Dialog = false
        this.reset()
      })
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
    margin-bottom: 70px;
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
      .low {
        background-color: $red;
      }
    }
    .clickdoc {
      text-decoration: underline;
      &:hover {
        cursor: pointer;
        color: $fontblue;
      }
    }
  }
  .uploadDia {
    .diabody {
      padding: 12px 24px;
      .el-radio-group {
        .el-radio-button__inner {
          padding: 10px 20px;
        }
      }
    }
  }
}
</style>

