<!--  -->
<template>
  <div class="ReplyGrade">
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
          label="选题学生"
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
                <el-button type="primary" plain class="deepbluebtn" @click="openGrade(scope.row)">评分</el-button>
              </div>
              <div v-if='scope.row.status == 1' class="handle">
                <el-button type="primary" plain class="deepbluebtn" @click="openGrade(scope.row)">重新评分</el-button>
              </div>
            </template>
          </el-table-column>
    </el-table>

    <el-dialog class='editdia uploadDia' title="答辩评分" width="600px" :visible.sync="gradedia" :close-on-press-escape='false' :close-on-click-modal='false'>
      <div class="diabody">
        <div class="infobox">
          <div class="label">评分</div>
          <el-input :autosize='false' v-model="updataData.score" class="inputname" placeholder="输入分数"></el-input>
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
        score: null
      }
    }
  },
  methods: {
    openGrade(val) {
      this.gradedia = true
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
