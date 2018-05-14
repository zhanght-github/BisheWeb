<!--  -->
<template>
  <div class="addnews">
    <div class="content bor4">
      <div class="newsbox">
        <div class="label">公告标题:</div>
        <el-input v-model="addData.noticetitle" class="inputname" placeholder="输入课题名称"></el-input>
      </div>
      <div class="newsbox">
        <div class="label">公告内容:</div>
         <div>
            <quill-editor ref="myTextEditor"
                    v-model="addData.noticecontent"
                    :options = "editorOption"
                    @change="onEditorChange($event)">
            </quill-editor>
          </div>
        </div>
      <div>
        <el-button type="primary" plain class="deepbluebtn backbtn" @click="addNews()">新增公告</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { noticeAdd } from '@/api/index'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
export default {
  data() {
    return {
      addData: {
        noticetitle: null,
        noticecontent: null,
        userid: this.getUserId(),
        username: this.getUsers().username,
        createtime: null
      },
      editorOption: {}
    }
  },
  components: {
    quillEditor
  },
  methods: {
    addNews() {
      this.addData.createtime = this.get24Hours()
      noticeAdd(this.addData).then(res => {
        this.$message.success('添加成功')
        this.addData = {
          noticetitle: null,
          noticecontent: null,
          userid: this.getUserId(),
          username: this.getUsers().username,
          createtime: null
        }
      })
    },
    onEditorChange() {}
  }
}
</script>
<style  scoped rel="stylesheet/scss" lang="scss">
.addnews {
  .content {
    margin-top: 60px;
    background: white;
    padding: 20px 24px;
    .newsbox {
      margin-bottom: 20px;
      .label {
        margin-bottom: 15px;
      }
      .el-input {
        width: 25%;
      }
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.addnews {
  .content {
    .quill-editor {
      width: 80%;
    }
    .ql-editor {
      height: 250px;
    }
  }
}
</style>
