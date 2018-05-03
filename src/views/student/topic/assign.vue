<template>
<div class="showAssign">
  <div class="flex" style="justify-content: space-between">
    <span class="assignTitle">本任务书于<span>{{this.creatTime}}</span>发给学生<span>{{this.studentName}}</span>学号为<span>{{this.userid}}</span></span>
    <span>
    <el-button type="primary">导出任务书</el-button>
    </span>
  </div>

  <div class="content">
    <div class="content-item">
      <div class="title">1.所选课题</div>
      <div>
        <el-input :disabled="true"></el-input>
      </div>
    </div>
    <div class="content-item">
      <div class="title">2.主要研究内容(工作)</div>
      <div>
        <el-input :disabled="true" class="item-input" type="textarea"></el-input>
      </div>
    </div>
    <div class="content-item">
      <div class="title">3.主要技术指标(或研究目录)</div>
      <div>
        <el-input :disabled="true" class="item-input" type="textarea"></el-input>
      </div>
    </div>
    <div class="content-item">
      <div class="title">4.进度计划</div>
      <div>
        <el-input :disabled="true" class="item-input" type="textarea"></el-input>
      </div>
    </div>
    <div class="content-item">
      <div class="title">5.主要参考资料</div>
      <div>
        <el-input :disabled="true" class="item-input" type="textarea"></el-input>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        creatTime:'xxx',
        studentName:'xxx',
        userid:'xxx'
      }
    },
    methods: {},
    created() {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.showAssign{
  font-size: 15px;
  .assignTitle{
    padding: 15px 0 15px 20px;
    span{
      color: forestgreen;
      padding: 15px;
      font-size: 16px;
    }
  }
  .content{
    background: white;
    padding: 0 20px;
    .content-item{
      padding-top: 10px;
      .title{
        padding: 10px;
      }
      .item-input{
        height: auto;
      }
    }
  }
}
</style>
