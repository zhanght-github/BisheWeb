<!--  -->
<template>
  <div class="uploadTask">
    <el-table
        :data="studentList"
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
          label="学生学号"
           width="100">
          </el-table-column>
          <el-table-column
          property="major"
          label="学生专业"
           >
          </el-table-column>
          <el-table-column
          label="下发状态">
          <template slot-scope="scope">
            <div class="flex">
              <div v-if='scope.row.taskbookContent' class="handle">
                <span class="allowed result">已下达任务书</span >
              </div>
              <div v-if='!scope.row.taskbookContent' class="handle">
                <span class="notAllowed result">未下达任务书</span >
              </div>
              <div v-if='scope.row.taskbookPath' class="handle">
                <span class="allowed result">已下达文档</span >
              </div>
              <div v-if='!scope.row.taskbookPath' class="handle">
                <span class="notAllowed result">未下达文档</span >
              </div>
            </div>

            </template>
          </el-table-column>
          <el-table-column
          label="操作"
          width="240">
            <template slot-scope="scope">
              <div v-if='scope.row.taskbookPath' class="handle">
                <el-button type="primary" plain class="deepbluebtn" @click="openIssued(scope.row)">下发任务</el-button>
              </div>
              <!-- <div v-if='scope.row.taskbookPath' class="handle">
                <el-button type="primary" plain class="deepbluebtn" @click="openIssued(scope.row)">下发任务</el-button>
              </div> -->
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
          <el-input :autosize='false' type="textarea" v-model="uploadData.taskbookContent" class="inputname" placeholder="输入课题名称"></el-input>
        </div>
         <div class="infobox">
          <div class="label">目标和要求</div>
          <el-input :autosize='false' type="textarea" v-model="uploadData.taskbookTechnology" class="inputname" placeholder="输入课题名称"></el-input>
        </div>
         <div class="infobox">
          <div class="label">进度安排</div>
          <el-input :autosize='false' type="textarea" v-model="uploadData.taskbookProcess" class="inputname" placeholder="输入课题名称"></el-input>
        </div>
        <div class="infobox">
          <div class="label">参考文献</div>
          <el-input :autosize='false' type="textarea" v-model="uploadData.taskbookWenxian" class="inputname" placeholder="输入课题名称"></el-input>
        </div>
        <div class="infobox">
          <div class="label">上传文档</div>
          <el-upload
            class="upload-demo"
            :action='uploadURL'
            multiple
            :limit="1"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove">
            <el-button size="small" type="primary">点击上传</el-button>
            <span>(更换文件请先把上一文件'X'掉)</span>
          </el-upload>
        </div>
      </div>
      <div class="diafoot flex">
        <el-button v-if="isEdit"  type="primary" class="truebutton deepbluebtn"  @click="editbtn()">保存</el-button>
        <el-button v-if="isAdd"  type="primary" class="truebutton deepbluebtn"  @click="addbtn()">确定</el-button>
        <el-button type="info" class="cancelbtn" plain @click="closeDialog()">取消</el-button>
      </div>
    </el-dialog>
    <Pagging :total='total' :PageNum='pageNum' :pageSize='pageSize' @handlePageSize='handlePageSize' @handlePageNum='handlePageNum'></Pagging>
  </div>
</template>

<script>
import Pagging from '../../common/Pagging'
import { topicInfo, confirmAready, writeTaskbook } from '@/api/teacher'
export default {
  data() {
    return {
      studentList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      taskDialog: false,
      isEdit: false,
      isAdd: false,
      uploadURL: '',
      uploadData: {
        topicname: null,
        taskbookContent: null,
        taskbookTechnology: null,
        taskbookProcess: null,
        taskbookWenxian: null
      },
      topicId: '918b27809308487fb862aeacbdb67a45',
      selectData: null
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
      confirmAready(this.pageNum - 1, this.pageSize, this.getUserId()).then(res => {
        this.studentList = res.data.data.content
        this.total = res.data.data.total
      })
    },
    openIssued(val) {
      this.isAdd = true
      this.taskDialog = true
      this.uploadURL = `http://172.20.55.225:8080/bishe/select/upload?topicname=${val.topicname}`
      topicInfo(val.topicid).then(res => {
        this.selectData = res.data.data
        this.uploadData.topicname = this.selectData.topicname
        this.uploadData.taskbookContent = this.replaceBR(this.selectData.topiccontent)
        this.uploadData.taskbookTechnology = this.replaceBR(this.selectData.target)
        this.uploadData.taskbookProcess = this.replaceBR(this.selectData.schedule)
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
      this.uploadURL = ''
      this.selectData = null
    },
    closeDialog() {
      this.isAdd = false
      this.taskDialog = false
      this.reset()
    },
    handlePreview() {},
    handleRemove() {},
    beforeRemove() {},
    addbtn() {
      this.uploadData.taskbookContent = this.replaceN(this.selectData.topiccontent)
      this.uploadData.taskbookTechnology = this.replaceN(this.selectData.target)
      this.uploadData.taskbookProcess = this.replaceN(this.selectData.schedule)
      writeTaskbook(this.uploadData).then(res => {
        this.isAdd = this.isAdd = false
        this.taskDialog = false
        this.reset()
        this.getData()
      })
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
