<!--  -->
<template>
  <div class="ReplyGrade">
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
          label="论文评分">
            <template slot-scope="scope">
              <div>
                <span v-if='scope.row.paperscore'>{{scope.row.paperscore}}</span>
                <span v-if='!scope.row.paperscore'>未评分</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
          label="答辩评分">
            <template slot-scope="scope">
              <div>
                <span v-if='scope.row.defencescore'>{{scope.row.defencescore}}</span>
                <span v-if='!scope.row.defencescore'>未评分</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
          label="总体评分">
            <template slot-scope="scope">
              <div>
                <span v-if='scope.row.totalscore'>{{scope.row.totalscore}}</span>
                <span v-if='!scope.row.totalscore'>未评分</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
          label="操作"
          width="240">
            <template slot-scope="scope">
              <div v-if='!scope.row.totalscore'  class="handle">
                <el-button type="primary" plain class="deepbluebtn" @click="openGrade(scope.row)">评分</el-button>
              </div>
              <div v-if='scope.row.totalscore' class="handle">
                <el-button type="primary" plain class="deepbluebtn" @click="openGrade(scope.row)">重新评分</el-button>
              </div>
            </template>
          </el-table-column>
    </el-table>

    <el-dialog class='editdia uploadDia' title="答辩评分" width="600px" :visible.sync="gradedia" :close-on-press-escape='false' :close-on-click-modal='false'>
      <div class="diabody">
        <div class="infobox">
          <div class="label">论文评分</div>
          <el-input v-model="updataData.paperscore" class="inputname" placeholder="输入分数"></el-input>
        </div>
        <div class="infobox">
          <div class="label">答辩评分</div>
          <el-input v-model="updataData.defencescore" class="inputname" placeholder="输入分数"></el-input>
        </div>
        <div class="infobox">
          <div class="label">总体评分</div>
          <el-input v-model="updataData.totalscore" class="inputname" placeholder="输入分数"></el-input>
        </div>
      </div>
      <div class="diafoot flex">
        <el-button type="primary" class="truebutton deepbluebtn"  @click="review()">确认评分</el-button>
        <el-button type="info" class="cancelbtn" plain @click="closebtn()">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { setScore, getScoreList } from '@/api/teacher'
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
      gradedia: false,
      updataData: {
        paperscore: null,
        defencescore: null,
        totalscore: null,
        studentid: null
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
        this.total = res.data.data.total
      })
    },
    openGrade(val) {
      this.gradedia = true
      this.updataData.studentid = val.studentid
    },
    closebtn() {
      this.gradedia = false
    },
    reset() {
      this.updataData = {
        paperscore: null,
        defencescore: null,
        totalscore: null,
        studentid: null
      }
    },
    review() {
      setScore(this.updataData).then(res => {
        this.reset()
        this.gradedia = false
        this.getData()
      })
    }
  }
}
</script>

<style  scoped rel="stylesheet/scss" lang="scss">

</style>
<style   rel="stylesheet/scss" lang="scss">
@import 'src/styles/variables.scss';
.ReplyGrade {
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
