<!--  -->
<template>
  <div class="uploadTask">
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
          label="下发状态">
          <template slot-scope="scope">
              <div v-if='scope.row.status == 1' class="handle">
                <span class="allowed result">已下达任务书</span >
              </div>
              <div v-if='scope.row.status == 0' class="handle">
                <span class="notAllowed result">未下达任务书 </span >
              </div>
            </template>
          </el-table-column>
          <el-table-column
          label="操作"
          width="240">
            <template slot-scope="scope">
              <div v-if='scope.row.status == 0' class="handle">
                <el-button type="primary" plain class="deepbluebtn" @click="openIssued(scope.row)">下发任务书</el-button>
              </div>
              <div v-if='scope.row.status == 1' class="handle">
                <span class="allowed result">已通过</span >
                <el-button type="primary" plain class="orangebtn" >撤销选题</el-button>
              </div>
              <div v-if='scope.row.status == -1' class="handle">
                <span class="notAllowed result">未通过</span >
                <el-button type="primary" plain class="orangebtn" >撤销选题</el-button>
              </div>
            </template>
          </el-table-column>
    </el-table>

    <el-dialog class='editdia TaskDia' :title="isAdd===true?'新增课题':'编辑课题'" width="600px" :visible.sync="taskDialog" :close-on-press-escape='false' :close-on-click-modal='false'>
      <div class="diabody diascroll">
        <div class="infobox">
          <div class="label">课题名称</div>
          <div>{{uploadData.topicname}}</div>
        </div>
        <div class="infobox">
          <div class="label">主要研究内容</div>
          <el-input :autosize='false' type="textarea" v-model="uploadData.topiccontent" class="inputname" placeholder="输入课题名称"></el-input>
        </div>
         <div class="infobox">
          <div class="label">目标和要求</div>
          <el-input :autosize='false' type="textarea" v-model="uploadData.target" class="inputname" placeholder="输入课题名称"></el-input>
        </div>
         <div class="infobox">
          <div class="label">进度安排</div>
          <el-input :autosize='false' type="textarea" v-model="uploadData.schedule" class="inputname" placeholder="输入课题名称"></el-input>
        </div>
        <div class="infobox">
          <div class="label">参考文献</div>
          <el-input :autosize='false' type="textarea" v-model="uploadData.文献" class="inputname" placeholder="输入课题名称"></el-input>
        </div>
      </div>
      <div class="diafoot flex">
        <el-button v-if="isEdit"  type="primary" class="truebutton deepbluebtn"  @click="editbtn()">保存</el-button>
        <el-button v-if="isAdd"  type="primary" class="truebutton deepbluebtn"  @click="addbtn()">确定</el-button>
        <el-button type="info" class="cancelbtn" plain @click="closeDialog()">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { topicInfo } from '@/api/teacher'
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
      taskDialog: false,
      isEdit: false,
      isAdd: false,
      uploadData: {
        topicname: null,
        topicontent: null,
        target: null,
        schedule: null,
        wenxian: null,
        url: null
      },
      topicId: '918b27809308487fb862aeacbdb67a45',
      selectData: null
    }
  },
  methods: {
    openIssued(val) {
      this.isAdd = true
      this.taskDialog = true
      topicInfo(this.topicId).then(res => {
        this.selectData = res.data.data
        console.log(this.selectData)
      })
    },
    reset() {
      this.uploadData = {
        topicname: null,
        topicontent: null,
        target: null,
        schedule: null,
        wenxian: null,
        url: null
      }
    },
    closeDialog() {
      this.isAdd = false
      this.taskDialog = false
      this.reset()
    }
  }
}
</script>
<style  scoped rel="stylesheet/scss" lang="scss">
.uploadTask {
  margin-top: 60px;
}
</style>
<style  rel="stylesheet/scss" lang="scss">
@import 'src/styles/variables.scss';
.uploadTask {
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
.uploadTask {
  .TaskDia {
    .diabody {
      padding: 12px 24px;
      height: 450px;
    }
    .infobox {
      margin-bottom: 12px;
      .el-textarea {
        height: 110px;
        textarea {
          height: 110px;
          resize: none;
        }
      }
    }
  }
}
</style>
