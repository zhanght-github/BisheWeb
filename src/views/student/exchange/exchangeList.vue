<template>
  <div class="exchangeList">
    <div>
      <el-input type="textarea" v-model="messageContent" placeholder="请输入留言内容···"></el-input>
      <div style="text-align: center;margin-top: 10px">
        <el-button type="primary" class="truebutton deepbluebtn" @click="submitContent()">确定发布留言</el-button>
        <div style="text-align: left">
          <el-button type="success" class="truebutton" @click="isMessage()">查看全部留言</el-button>
          <el-button type="danger" class="truebutton" @click="notMessage()">查看未读留言</el-button>
        </div>
      </div>
      <div class="allMessageList" v-if="listShow === 1">
        <ul>
          <li v-for="item in studentMessageList">
            <div class="myContent">
              <span>我的留言:{{item.messagecontent}}</span>
              <span class="time">time:{{item.createtime}}</span>
            </div>
            <div class="teacherContent">{{item.receivername}}老师的回复:{{item.replycontent}}</div>
            <el-button type="danger" size="small" style="float: right">删除该条留言</el-button>
          </li>
        </ul>
      </div>
      <div class="notMessageList" v-if="listShow === 0">
        <ul>
          <li v-for="item in studentMessageList">
            <div class="myContent">
              <span>我的留言:{{item.messagecontent}}</span>
            </div>
            <div class="teacherContent">{{item.receivername}}老师的回复:{{item.replycontent}}</div>
            <el-button type="danger" size="small" style="float: right">删除该条留言</el-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {studentMessage,isMessage,notMessage,updataStatus} from '@/api/student'
  export default {
    data() {
      return {
        id:'',
        name:'',
        command:'',
        list:[],
        listShow:1,
        submitParams:{},
        messageContent:'',
        studentMessageList:[],
        messagestate:0
      }
    },
    methods: {
      getData(){
        this.id = this.$route.query.id
        this.name = this.$route.query.name
      },
      submitContent(){
        this.submitParams.senderid = this.getUsers().userid
        this.submitParams.sendername = this.getUsers().username
        this.submitParams.receiverid = this.id
        this.submitParams.receivername = this.name
        this.submitParams.messagestate = 0
        this.submitParams.messagecontent = this.messageContent
        this.submitParams.createtime = this.get24Hours();
        studentMessage(this.submitParams).then(res =>{
          this.$message({ type: 'success', message: res.data.message })
        })

      },
      isMessage(){
        isMessage(0,10,this.getUserId(),'').then(res =>{
          this.studentMessageList = res.data.data.content
        })
      },
      notMessage(){
        notMessage(0,10,this.getUserId(),1).then(res =>{
          this.studentMessageList = res.data.data.content
          let messageId = [];
          this.studentMessageList.forEach(item => {
            if (item.messagestate === 1){
              messageId.push(item.messageid)
            }
          })
          updataStatus(2,messageId).then(res =>{

          })
        })
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.exchangeList .myContent,.teacherContent{
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
.exchangeList .time{
  float: right;
  font-size: 14px;
}
.exchangeList .myContent{
  color: black;
}
.exchangeList .teacherContent{
  font-size: 14px;
  margin-left: 40px;
}
  .allMessageList li{
    margin-top: 50px;
  }
  .notMessageList{

  }
</style>
