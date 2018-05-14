<!--  -->
<template>
  <div class="message">
    <div class="header">
        <personHeader :searchOptions='menuOptions' :menuOptions='menuOptions' @changeway='changeway' :defaultselect='100'></personHeader>
    </div>
    <div class="content">
      <div class="messagebox bor4" v-for="(item, index) in dataList" :key="index">
        <div class="messagetop flex">
          <div class="flex">
            <div class="stuname">
              {{item.sendername}}:&nbsp;&nbsp;
            </div>
            <div class="stucontent">{{item.messagecontent}}</div>
          </div>
          <div class="reply" v-if='!item.replycontent' @click="replybtn(item)">回复</div>
          <div class="reply" v-if='item.replycontent' @click="replybtn(item)">重新回复</div>
        </div>
        <div class="messagebottom flex" v-if='item.replycontent'>
          <div class="stuname">
            {{item.receivername}}:&nbsp;&nbsp;
          </div>
          <div class="stucontent">{{item.replycontent}}</div>
        </div>
      </div>
    </div>

    <el-dialog class='editdia replyDia' title='回复留言' width="600px" :visible.sync="replydialog" :close-on-press-escape='false' :close-on-click-modal='false'>
      <div class="diabody diascroll">
        <div class="infobox">
          <div class="label">回复&nbsp;{{replydata.name}}:</div>
          <el-input :autosize='false' type="textarea" v-model="replydata.replycontent" class="inputname"></el-input>
        </div>
      </div>
      <div class="diafoot flex">
        <el-button  type="primary" class="truebutton deepbluebtn"  @click="replysender()">确定</el-button>
        <el-button  type="primary" class="truebutton deepbluebtn"  @click="closeDialog()">取消</el-button>
      </div>
    </el-dialog>

    <Pagging :total='total' :PageNum='pageNum' :pageSize='pageSize' @handlePageSize='handlePageSize' @handlePageNum='handlePageNum'></Pagging>
  </div>
</template>

<script>
import { getMessage, replyMessage, changeMessageState } from '@/api/teacher'
import personHeader from '../../common/PersonHeader'
import Pagging from '../../common/Pagging'
export default {
  data() {
    return {
      menuOptions: [
        {
          key: '100',
          option: '全部'
        },
        {
          key: '0',
          option: '未回复'
        }
      ],
      pageNum: 1,
      pageSize: 10,
      total: null,
      way: '',
      waydata: '',
      dataList: [],
      replydialog: false,
      replydata: {
        name: '',
        replycontent: '',
        messageid: ''
      }
    }
  },
  components: { Pagging, personHeader },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getMessage(this.pageNum - 1, this.pageSize, this.getUserId(), this.waydata).then(res => {
        this.dataList = res.data.data.content
        this.total = res.data.data.total
        console.log(res.data.data.content)
      })
    },
    handlePageSize(val) {
      this.pageSize = val
      this.getData()
    },
    handlePageNum(val) {
      this.pageNum = val
      this.getData()
    },
    changeway(val) {
      this.way = val
    },
    reset() {
      this.replydata = {
        name: '',
        replycontent: '',
        messageid: ''
      }
    },
    replybtn(val) {
      this.replydata.name = val.sendername
      if (val.replycontent) {
        this.replydata.replycontent = val.replycontent
      }
      this.replydata.messageid = val.messageid
      this.replydialog = true
    },
    closeDialog() {
      this.replydialog = false
      this.reset()
    },
    replysender() {
      if (this.replydata.replycontent !== '') {
        replyMessage(this.replydata.messageid, this.replydata.replycontent).then(res => {
          var messagearr = []
          messagearr.push(this.replydata.messageid)
          changeMessageState(1, messagearr).then(res => {
            this.replydialog = false
            this.reset()
            this.getData()
          })
        })
      }
    }
  },
  watch: {
    way(val) {
      if (val === '100') {
        this.waydata = ''
        this.getData()
      } else {
        this.waydata = '0'
        this.getData()
      }
    }
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
@import 'src/styles/variables.scss';
.message {
  position: relative;
  padding: 0;
  .header {
    position: fixed;
    top: 50px;
    left: 240px;
    right: 0;
    .searchroom {
      display: none;
    }
  }
  .content {
    margin-top: 120px;
    margin-bottom: 70px;
    .messagebox {
      margin-bottom: 10px;
      .messagetop {
        min-height: 60px;
        background-color: white;
        padding-left: 30px;
        justify-content: space-between;
        padding-right: 40px;
        align-items: center;
        font-size: 15px;
        .stuname {
          color: #000;
          font-weight: bold;
        }
        .reply {
          color: $fontblue;
          font-size: 13px;
          &:hover {
            cursor: pointer;
            color: $light-blue;
          }
        }
      }
      .messagebottom {
        min-height: 40px;
        background-color: #f6f7fa;
        padding-left: 30px;
        align-items: center;
        font-size: 13px;
      }
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.message {
  .header {
    .searchroom {
      display: none;
    }
  }
  .replyDia {
    .diabody {
      padding: 12px 24px;
    }
  }
}
</style>
