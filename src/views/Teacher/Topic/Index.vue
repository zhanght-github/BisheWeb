
<template>
  <div class="topicList">
    <div class="allheader">
      <Addcomponents  @handleAdd='handleAdd' :addshow='true'>
        <i class="iconfont icon-ico_expand" slot="iconleft"></i>
      </Addcomponents>
    </div>
    <div class="content">
      <div class="topicBox bor4" v-for="(item, index) in topicList" :key="index">
        <div class="header flex">
          <div class="topname">
            {{item.topicname}}
            <span class="teacher">
              指导老师：{{item.teachername}}
            </span>
            <span class="type">{{item.topictype}}</span>
          </div>
          <div class="toptime">
            {{item.createtime}}
          </div>
        </div>
        <div class="detail flex">
          <div class="topicinfo topiccontent flex" v-html="item.topiccontent">
          </div>
          <div class="topicinfo source flex">
            {{item.topicsource}}
          </div>
          <div class="topicinfo topicstate flex">
            <span v-if='item.topicstate===0'>待审核</span>
            <span v-if='item.topicstate===1'>已通过</span>
            <span v-if='item.topicstate===-1'>未通过</span>
          </div>
          <div  class="topicinfo studentNum flex">
            已选人数: &nbsp;<span>{{item.alreadynum}}</span>/<span>{{item.supplynum}}</span>
          </div>
          <div class="topicinfo collage flex">{{item.collegename}}</div>
          <div class="topicinfo watchinfo flex" @click="openInfo(item)">
            查看详情
          </div>
          <div class="handle flex">
            <el-button type="primary" plain class="editBTN fontnormal" @click="openEditDialog(item,$event)">编辑</el-button>
              <el-button type="danger" plain class="delBTN" @click="deleteTopic(item,$event)"><i class="iconfont icon-ico_delete"></i></el-button>
          </div>
        </div>
      </div>
    </div>

    <el-dialog class='editdia topicDia' :title="isAdd===true?'新增课题':'编辑课题'" width="600px" :visible.sync="topicDialog" :close-on-press-escape='false' :close-on-click-modal='false'>
      <div class="diabody diascroll">
        <div class="infobox">
          <div class="label">课题名称</div>
          <el-input v-model="topicdata.topicname" class="inputname" placeholder="输入课题名称"></el-input>
        </div>
        <div class="infobox flex">
          <div class="twoselect">
            <div class="label">课题类型</div>
            <el-select v-model="topicdata.topictype" class="selectDown">
              <el-option
                label="设计类"
                value="设计类">
              </el-option>
              <el-option
                label="论文类"
                value="论文类">
              </el-option>
            </el-select>
          </div>
          <div class="twoselect">
            <div class="label">课题来源</div>
            <el-select v-model="topicdata.topicsource" class="selectDown">
              <el-option
                v-for="item in sourceoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="infobox flex">
          <div class="twoselect">
            <div class="label">是否结合实际</div>
            <el-radio-group v-model="topicdata.shiji">
              <el-radio-button label="1" >是</el-radio-button>
              <el-radio-button label="0">否</el-radio-button>
            </el-radio-group>
          </div>
          <div class="twoselect">
            <div class="label">设置人数</div>
            <el-input v-model="topicdata.supplynum" class="twoinput inputnum" placeholder="输入人数"></el-input>
          </div>
        </div>
        <div class="infobox flex">
          <div class="twoselect">
            <div class="label">学院名称</div>
            <el-select v-model="college" @change="getMajor" class="selectDown">
              <el-option
                v-for="(item,index) in collegeList"
                :key="index"
                :label="item.collegename"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="twoselect">
            <div class="label">专业名称</div>
            <el-select v-model="topicdata.major" class="selectDown">
              <el-option
                 v-for="(item,index) in majorList"
                :key="index"
                :label="item.majorname"
                :value="item.majorname">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="infobox">
          <div class="label">主要研究内容</div>
          <el-input :autosize='false' type="textarea" v-model="topicdata.topiccontent" class="inputname" placeholder="输入课题名称"></el-input>
        </div>
         <div class="infobox">
          <div class="label">目标和要求</div>
          <el-input :autosize='false' type="textarea" v-model="topicdata.target" class="inputname" placeholder="输入课题名称"></el-input>
        </div>
         <div class="infobox">
          <div class="label">进度安排</div>
          <el-input :autosize='false' type="textarea" v-model="topicdata.schedule" class="inputname" placeholder="输入课题名称"></el-input>
        </div>
      </div>
      <div class="diafoot flex">
        <el-button v-if="isEdit"  type="primary" class="truebutton deepbluebtn"  @click="editbtn()">保存</el-button>
        <el-button v-if="isAdd"  type="primary" class="truebutton deepbluebtn"  @click="addbtn()">确定</el-button>
        <el-button type="info" class="cancelbtn" plain @click="closeDialog()">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog class='editdia topicInfoDia' :title='selectdata?selectdata.topicname:""' width="600px" :visible.sync="topicInfoDialog" :close-on-press-escape='false' :close-on-click-modal='false'>
      <div class="diabody diascroll">
        <div class="topicInfoBox flex">
          <div class="label">专业班级:</div>
          <div class="info">
            {{selectdata.collegename}}&nbsp;&nbsp;{{selectdata.major}}
          </div>
        </div>
        <div class="topicInfoBox flex">
          <div class="label">课题人数:</div>
          <div class="info">
            {{selectdata.supplynum}}
          </div>
        </div>
        <div class="topicInfoBox flex">
          <div class="label">结合实际:</div>
          <div class="info">
            <div v-if='selectdata.shiji===1'>是</div>
            <div v-if='selectdata.shiji===0'>否</div>
          </div>
        </div>
        <div class="topicInfoBox flex">
          <div class="label">课题来源:</div>
          <div class="info">
            {{selectdata.topicsource}}
          </div>
        </div>
        <div class="topicInfoBox flex">
          <div class="label">课题类型:</div>
          <div class="info">
            {{selectdata.topictype}}
          </div>
        </div>
        <div class="topicInfoBox flex">
          <div class="label">课题内容:</div>
          <div class="info" v-html='selectdata.topiccontent'>
          </div>
        </div>
        <div class="topicInfoBox flex">
          <div class="label">目标要求:</div>
          <div class="info" v-html='selectdata.target'>
          </div>
        </div>
        <div class="topicInfoBox flex">
          <div class="label">进度安排:</div>
          <div class="info" v-html='selectdata.schedule'>
          </div>
        </div>
      </div>
      <div class="diafoot flex">
        <el-button  type="primary" class="truebutton deepbluebtn"  @click="closeInfo()">好的</el-button>
      </div>
    </el-dialog>
    <Pagging :total='total' :PageNum='pageNum' :pageSize='pageSize' @handlePageSize='handlePageSize' @handlePageNum='handlePageNum'></Pagging>
  </div>
</template>

<script>
import Addcomponents from '../../common/Addcomponents'
import Pagging from '../../common/Pagging'
import { getTopicList, addTopic, deleteTopic, updateTopic } from '@/api/teacher'
import { getCollege, getMajor } from '@/api/index'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: null,
      topicList: [],
      sourceoptions: [
        {
          label: '联系科研实际的课题',
          value: '联系科研实际的课题'
        },
        {
          label: '联系生产实际的课题',
          value: '联系生产实际的课题'
        },
        {
          label: '联系社会实际的课题',
          value: '联系社会实际的课题'
        },
        {
          label: '其他课题',
          value: '其他课题'
        }
      ],
      isEdit: false,
      isAdd: false,
      canClick: false,
      topicDialog: false,
      college: null,
      topicdata: {
        teacherid: this.getUserId(),
        teachername: this.getUsers().username,
        teacherphone: this.getUsers().userphone,
        topicname: null,
        topictype: null,
        topicsource: null,
        shiji: 1,
        collegeid: null,
        collegename: null,
        major: null,
        supplynum: null,
        alreadynum: 0,
        topiccontent: null,
        target: null,
        schedule: null,
        createtime: null
      },
      collegeList: [],
      majorList: [],
      topicInfoDialog: false,
      selectdata: {
        teacherid: null,
        topicname: null,
        topictype: null,
        topicsource: null,
        shiji: null,
        collegeid: null,
        collegename: null,
        major: null,
        supplynum: null,
        alreadynum: null,
        topiccontent: null,
        target: null,
        schedule: null,
        createtime: null
      }
    }
  },
  components: { Addcomponents, Pagging },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getData()
      this.getCollegeData()
    },
    handlePageSize(val) {
      this.pageSize = val
      this.getData()
    },
    handlePageNum(val) {
      this.pageNum = val
      this.getData()
    },
    getCollegeData() {
      getCollege().then(res => {
        this.collegeList = res.data.data
      })
    },
    getData() {
      getTopicList(this.pageNum - 1, this.pageSize, this.getUserId()).then(res => {
        this.topicList = res.data.data.content
        this.total = res.data.data.total
      })
    },
    getMajor(val) {
      this.topicdata.collegeid = val.collegeid
      this.topicdata.collegename = val.collegename
      getMajor(val.collegeid).then(res => {
        this.majorList = res.data.data
      })
    },
    openEditDialog(val, $event) {
      if ($event.target.nodeName === 'BUTTON') {
        $event.target.blur()
      } else {
        $event.target.parentNode.blur()
      }
      this.isEdit = true
      this.topicDialog = true
      this.topicdata = val
      this.college = {
        collegeid: val.collegeid,
        collegename: val.collegename
      }
      getMajor(val.collegeid).then(res => {
        this.majorList = res.data.data
      })
      this.topicdata.topiccontent = this.topicdata.topiccontent.replace(/<br>/g, '\n')
      this.topicdata.target = this.topicdata.target.replace(/<br>/g, '\n')
      this.topicdata.schedule = this.topicdata.schedule.replace(/<br>/g, '\n')
    },

    deleteTopic(val, $event) {
      if ($event.target.nodeName === 'BUTTON') {
        $event.target.blur()
      } else {
        $event.target.parentNode.blur()
      }
      this.$confirm(`确定要删除课题「${val.topicname}」吗?`, '确定删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteTopic(val.topicid).then(res => {
            if (res.data.status === 'OK') {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getData()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleAdd() {
      this.isAdd = true
      this.topicDialog = true
    },
    checkPrice() {
      if (!this.topicdata.topicname) {
        this.$message.error('请填写课题名称')
      } else if (!this.topicdata.topictype) {
        this.$message.error('请选择课题类型')
      } else if (!this.topicdata.topicsource) {
        this.$message.error('请选择课题来源')
        // } else if (!this.topicdata.collegeid) {
        //   this.$message.error('请选择学院')
        // } else if (!this.topicdata.major) {
        //   this.$message.error('请选择专业')
      } else if (!/^[1-9]\d*$/.test(this.topicdata.supplynum)) {
        this.$message.error('请设置合适人数')
        this.topicdata.supplynum = null
      } else if (!this.topicdata.topiccontent) {
        this.$message.error('请填写课题内容')
      } else if (!this.topicdata.target) {
        this.$message.error('请填写目标和要求')
      } else if (!this.topicdata.schedule) {
        this.$message.error('请填写进度安排')
      } else {
        this.canClick = true
      }
    },
    closeDialog() {
      this.reset()
    },
    reset() {
      this.college = null
      this.topicdata = {
        teacherid: this.getUserId(),
        teachername: this.getUsers().username,
        teacherphone: this.getUsers().userphone,
        topicname: null,
        topictype: null,
        topicsource: null,
        shiji: 1,
        collegeid: null,
        collegename: null,
        major: null,
        supplynum: null,
        alreadynum: 0,
        topiccontent: null,
        target: null,
        schedule: null,
        createtime: null
      }
      this.isAdd = false
      this.isEdit = false
      this.topicDialog = false
      this.canClick = false
      this.majorList = []
    },
    editbtn() {
      this.canClick = false
      this.checkPrice()
      if (this.canClick) {
        this.topicdata.topiccontent = this.topicdata.topiccontent.replace(/\n/g, '<br>')
        this.topicdata.target = this.topicdata.target.replace(/\n/g, '<br>')
        this.topicdata.schedule = this.topicdata.schedule.replace(/\n/g, '<br>')
        this.topicdata.createtime = this.get24Hours()
        updateTopic(this.topicdata).then(res => {
          this.reset()
          this.getData()
        })
      }
    },
    addbtn() {
      this.canClick = false
      this.checkPrice()
      if (this.canClick) {
        this.topicdata.topiccontent = this.topicdata.topiccontent.replace(/\n/g, '<br>')
        this.topicdata.target = this.topicdata.target.replace(/\n/g, '<br>')
        this.topicdata.schedule = this.topicdata.schedule.replace(/\n/g, '<br>')
        this.topicdata.createtime = this.get24Hours()
        addTopic(this.topicdata).then(res => {
          this.reset()
          this.getData()
        })
      }
    },
    closeInfo() {
      this.topicInfoDialog = false
      this.selectdata = {
        teacherid: null,
        topicname: null,
        topictype: null,
        topicsource: null,
        shiji: null,
        collegeid: null,
        collegename: null,
        major: null,
        supplynum: null,
        alreadynum: null,
        topiccontent: null,
        target: null,
        schedule: null,
        createtime: null
      }
    },
    openInfo(val) {
      this.topicInfoDialog = true
      this.selectdata = val
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/variables.scss';
.content {
  margin-top: 100px;
  padding: 10px 0;
  margin-bottom: 70px;
  .topicBox {
    width: 100%;
    margin-bottom: 10px;
    .header {
      padding: 0 10px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      line-height: 30px;
      color: #b8b9c7;
      background-color: #f6f7fa;
      justify-content: space-between;
      .type {
        padding-left: 20px;
      }
      .teacher {
        padding-left: 20px;
      }
    }
    .detail {
      min-height: 100px;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      .topicinfo {
        border-right: 1px solid #ddd;
        justify-content: center;
        flex-direction: column;
        padding: 12px 0;
        align-items: center;
      }
      .topiccontent {
        flex: 1;
      }
      .source {
        flex: 1;
      }
      .topicstate {
        width: 100px;
      }
      .studentNum {
        width: 150px;
        flex-direction: row;
        span {
          &:nth-of-type(1) {
            color: $fontblue;
          }
        }
      }
      .collage {
        width: 120px;
      }
      .watchinfo {
        width: 100px;
      }
      .handle {
        width: 240px;
        align-items: center;
      }
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
@import 'src/styles/variables.scss';
.topicList {
  .topiccontent {
    align-items: flex-start !important;
    padding-left: 24px !important;
  }
  .topicDia {
    .diabody {
      padding: 12px 24px;
      height: 450px;
    }
    .infobox {
      margin-bottom: 12px;
      .twoselect {
        flex: 1;
        .selectDown {
          width: 220px;
          .el-input {
            width: 220px;
          }
        }
        .twoinput {
          width: 220px;
        }
      }
      .el-radio-group {
        .el-radio-button__inner {
          width: 40px;
        }
      }
      .el-textarea {
        height: 110px;
        textarea {
          height: 110px;
          resize: none;
        }
      }
    }
  }
  .topicInfoDia {
    .diabody {
      height: 450px;
    }
    .topicInfoBox {
      padding: 12px 24px;
      .label {
        font-size: 13px;
        margin-right: 10px;
      }
      .info {
        color: $menuHover;
        font-size: 13px;
      }
    }
  }
}
</style>
