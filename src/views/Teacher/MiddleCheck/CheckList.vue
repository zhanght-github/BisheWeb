<!--  -->
<template>
  <div class="CheckList">
    <div class="header bor4">
      <div class="teamTeacher">
        同组检阅教师: <span>张三</span><span>李四</span><span>王二</span>
      </div>
    </div>
    <div class="content bor4">
      <div class="label">检阅学生</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
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
}
</style>
