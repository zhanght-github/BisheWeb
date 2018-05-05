<template>
<div class="showAssign">
  <div class="flex" style="justify-content: space-between">
    <span class="assignTitle">本任务书已发给学生<span>{{this.studentName}}</span>学号为<span>{{this.studentId}}</span></span>
    <span style="padding: 15px">
    <a class="exportAssign" :href="this.downloadUrl">导出任务书</a>
    </span>
  </div>

  <div class="content">
    <div class="content-item">
      <div class="title">1.所选课题</div>
      <div>
        <el-input :disabled="true" v-model="this.assignData.topicname"></el-input>
      </div>
    </div>
    <div class="content-item">
      <div class="title">2.主要研究内容(工作)</div>
      <div>
        <el-input v-model="this.assignData.taskbookContent" :disabled="true" class="item-input" type="textarea"></el-input>
      </div>
    </div>
    <div class="content-item">
      <div class="title">3.主要技术指标(或研究目录)</div>
      <div>
        <el-input v-model="this.assignData.taskbookTechnology" :disabled="true" class="item-input" type="textarea"></el-input>
      </div>
    </div>
    <div class="content-item">
      <div class="title">4.进度计划</div>
      <div>
        <el-input v-model="this.assignData.taskbookProcess" :disabled="true" class="item-input" type="textarea"></el-input>
      </div>
    </div>
    <!--<div class="content-item">-->
      <!--<div class="title">5.主要参考资料</div>-->
      <!--<div>-->
        <!--<el-input :disabled="true" class="item-input" type="textarea"></el-input>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</div>
</template>

<script>
import { studentAssign, downloadAssign } from  '@/api/student'
import CMethods from '../../../commonJS/Methods'

export default {
  data() {
    return {
      studentName: 'xxx',
      studentId: 'xxx',
      assignData:{},
      taskPath:'',
      topicname:'',
      downloadUrl:""
    }
  },
  methods: {
    getData(){
      studentAssign(this.getUserId()).then(res=>{
        if (res.data.status === 'OK'){
          this.studentName = res.data.data.studentname;
          this.studentId = res.data.data.studentid;
          this.filename = res.data.data.taskbookPath;
          this.topicname = res.data.data.topicname;
          this.assignData = res.data.data;
          this.downloadUrl = CMethods.spliceDownloadUrl(this.topicname,this.filename);
          // this.downloadUrl = "http://172.20.55.146:8080/bishe/common/download?topicname="+this.topicname+"&filename="+this.filename+""
        }
      })
    }
  },
  created() {
    this.getData();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.showAssign {
  font-size: 15px;
  .assignTitle {
    padding: 15px 0 15px 20px;
    span {
      color: forestgreen;
      padding: 15px;
      font-size: 16px;
    }
  }
  .content {
    background: white;
    padding: 0 20px;
    .content-item {
      padding-top: 10px;
      .title {
        padding: 10px;
      }
      .item-input {
        height: auto;
      }
    }
  }
}
  .exportAssign{
    background: steelblue;
    color: black;
    padding: 5px;
  }
</style>
