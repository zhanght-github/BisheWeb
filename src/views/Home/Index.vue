<!--  -->
<template>
  <div class="advertise">
    <div v-if="listshow">
      <div class="header">
      欢迎登陆毕业设计管理系统
      </div>
      <div class="space">
        科大毕业公告
      </div>
      <div class="content bor4">
        <ul>
          <li v-for="(item, index) in list" :key="index">
            <div class="flex messagebox">
              <div class="title" @click="handleinfo()">{{item.title}}</div>
              <div class="time">{{item.time}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div  v-if="!listshow" class="messagebox">
      <div class="back">
        <el-button type="primary" plain class="deepbluebtn backbtn" @click="backtolist()"><i class="iconfont icon-ico_arrow_left"></i> 返回上一页</el-button>
      </div>
      <div class="messageinfo bor4">
        <h2>{{data.title}}</h2>
        <div class="author">
          {{data.author}}
        </div>
        <div class="messagecontent" v-html="data.content"></div>
        <div class="messagetime">{{data.time}}</div>
      </div>
    </div>


    <Pagging  v-if="listshow" :total='total' :PageNum='pageNum' :pageSize='pageSize' @handlePageSize='handlePageSize' @handlePageNum='handlePageNum'></Pagging>
  </div>
</template>

<script>
import Pagging from '../common/Pagging'
export default {
  data() {
    return {
      list: [
        {
          title: '关于今年2018届毕业生提前毕业的通知',
          time: '2018-05-28 00:00:00'
        },
        {
          title: '关于今年2018届毕业生提前毕业的通知',
          time: '2018-05-28 00:00:00'
        },
        {
          title: '关于今年2018届毕业生提前毕业的通知',
          time: '2018-05-28 00:00:00'
        },
        {
          title: '关于今年2018届毕业生提前毕业的通知',
          time: '2018-05-28 00:00:00'
        },
        {
          title: '关于今年2018届毕业生提前毕业的通知',
          time: '2018-05-28 00:00:00'
        },
        {
          title: '关于今年2018届毕业生提前毕业的通知',
          time: '2018-05-28 00:00:00'
        }
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      listshow: true,
      data: {
        title: '关于今年2018届毕业生提前毕业的通知',
        time: '2018-05-28 00:00:00',
        author: '河南科技大学',
        content:
          '<p>这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容</p><p>这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容</p><p>这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容</p>'
      }
    }
  },
  components: { Pagging },
  methods: {
    handlePageSize(val) {
      this.pageSize = val
      this.getData()
    },
    handlePageNum(val) {
      this.pageNum = val
      this.getData()
    },
    getData() {},
    openIssued() {},
    handleinfo() {
      this.listshow = false
    },
    backtolist() {
      this.listshow = true
    }
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
@import 'src/styles/variables.scss';
.advertise {
  .header {
    text-align: center;
    line-height: 40px;
    color: #000;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .space {
    font-size: 16px;
    margin-left: 35px;
    margin-bottom: 20px;
  }
  .content {
    min-height: 520px;
    background-color: #fff;
    padding: 20px;
    margin-bottom: 70px;
    .messagebox {
      justify-content: space-between;
      padding-right: 100px;
      line-height: 50px;
      font-size: 14px;
      .title {
        text-decoration: underline;
        color: #444;
        &:hover {
          cursor: pointer;
          color: $fontblue;
        }
      }
    }
  }
  .messagebox {
    padding-top: 15px;
    .messageinfo {
      margin-top: 15px;
      padding-top: 20px;
      min-height: 560px;
      background-color: #fff;
    }
    h2 {
      text-align: center;
    }
    .author {
      text-align: center;
    }
    .messagecontent {
      padding: 0 100px;
      font-size: 13px;
      color: #111;
      text-indent: 2em;
    }
    .messagetime {
      margin-top: 50px;
      text-align: right;
      margin-right: 110px;
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
@import 'src/styles/variables.scss';
.advertise {
  .backbtn {
    padding: 12px 10px !important;
    i {
      font-size: 13px;
    }
  }
}
</style>
