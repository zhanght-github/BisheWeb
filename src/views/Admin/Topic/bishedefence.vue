<!--  -->
<template>
  <div class="checkStudent">
    <div>
      <el-button type="primary" class="truebutton deepbluebtn"@click="closeDialog()">新建小组</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        property="groupid"
        label="分组序号"
        width="250">
      </el-table-column>
      <el-table-column
        label="小组成员">
        <template slot-scope="scope">
          <div class="flex">
            <div v-for="(item,index) in scope.row.grouplist">
              {{item}}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        property="major"
        label="答辩时间">
        <template slot-scope="scope">
          <div v-if="scope.row.time">
           {{scope.row.time}}
          </div>
          <div v-if="!scope.row.time">
            尚未设置时间
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="答辩地点">
        <template slot-scope="scope">
          <div v-if="scope.row.location">
            {{scope.row.location}}
          </div>
          <div v-if="!scope.row.location">
            尚未设置地点
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="240">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="handleOpen(scope.row)">修改组员</el-button>
          <el-button type="danger" size="small" @click="handleOpenDB(scope.row)">设置答辩</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" class='editdia' width="800px" :visible.sync="topicDialog" :close-on-press-escape='false' :close-on-click-modal='false'>

      <div class="flex diatop">
        <el-select v-model="value" placeholder="请选择学院" flex="fixed" align="left" style=" margin-right:30px;width: 200px" @change="getCollegeValue">
          <el-option
            v-for="item in options"
            :key="item.collegeid"
            :label="item.collegename"
            :value="item.collegeid">
          </el-option>
        </el-select>
        <el-select v-model="groupid" placeholder="请选择分组" style="width: 200px;display: block;" @change="groupIdValue">
          <el-option
            v-for="item in groupOptions"
            :key="item.groupid"
            :label="item.groupName"
            :value="item.groupid">
          </el-option>
        </el-select>
      </div>
      <div flex="fixed">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value3"
          filterable
          :render-content="renderFunc"
          :right-default-checked="[]"
          :titles="['教师', '组员']"
          :button-texts="['到左边', '到右边']"
          :format="{ noChecked: '${total}', hasChecked: '${checked}/${total}' }"
          @change="handleChange"
          :data="teacherList">
          <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button></el-transfer>
      </div>
      <div class="diafoot flex">
        <el-button type="primary" class="truebutton deepbluebtn" @click="submitData()">确定</el-button>
        <el-button type="info" class="cancelbtn" @click="closeDialog()">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog class="editdia timedia" title="设置答辩" width="670px" :visible.sync="setDialog" :close-on-click-modal='false' :close-on-press-escape='false'>
      <div class="diabody">
        <div class="flex timetitle">
          <div class="label">答辩时间</div>
          <el-date-picker
            v-model="setData.time"
            type="datetime"
            popper-class='setactivitytime'
            range-separator="-"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="设置答辩时间"
            align='left'
            @change="changedate">
          </el-date-picker>
        </div>
        <div class="flex timetitle">
          <div class="label">答辩地点</div>
          <el-input v-model="setData.address" class="inputname" placeholder="输入答辩地点"></el-input>
        </div>
      </div>
      <div class="diafoot flex">

        <el-button type="primary" class="truebutton"  @click="settimeAdd()">确定</el-button>
        <el-button type="info" class="cancelbtn" plain @click="canceltime()">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getteacher, getCollegeList, checkDefenceGroup, getsettime, defencegroup,setdefencetime } from '@/api/admin'

  export default {
    data() {
      return {
        dataList: [],
        value1: '',
        value3: [],
        settime: [],
        renderFunc(h, option) {
          return <span> { option.key } - { option.label } </span>
        },
        page: 1,
        size: 10,
        loading: false,
        topicDialog: false,
        title: '',
        showData: {},
        teacherDate: [],
        teacherList: [],
        groupid:'',
        selectValue:[],
        grouplist:[],
        data: [],
        collegeValue:'',
        groupOptions:[{
          groupid:1,
          groupName:'第一组'
        },{
          groupid:2,
          groupName:'第二组'
        },{
          groupid:3,
          groupName:'第三组'
        },{
          groupid:4,
          groupName:'第四组'
        },{
          groupid:5,
          groupName:'第五组'
        }],
        options: [],
        value: '',
        location: '工科',
        setDialog:false,
        setData: {
          time: null,
          address: null,
          id: null
        },
        tableData: []
      }
    },
    methods: {
      getData(){
        defencegroup().then(res =>{
          this.tableData = res.data.data
          console.log(this.tableData)
        })
      },
      handleOpenDB(val) {
        this.setDialog = true
        this.setData.id = val.groupid
      },
      canceltime(){
        this.setDialog = false
        this.setData= {
          time: null,
          address: null,
          id: null
        }
      },
      getteacherData() {
        getteacher(this.page-1, this.size, 1,this.collegeValue).then(res => {
          this.teacherList =[]
          this.teacherDate = res.data.data.content
          this.teacherList = this.show()
        })
      },
      groupIdValue(val){
        this.groupid = val
      },
      getCollegeList(){
        getCollegeList().then(res =>{
          this.options = res.data.data;
        })
      },
      closeDialog() {
        this.topicDialog = !this.topicDialog
        this.grouplist = []
        this.groupid = ''
//        this.setData = {
//              time: null,
//              address: null
//          }
//        this.value3 = []
      },
      getCollegeValue(val){
        this.collegeValue = val;
        this.getteacherData();
      },
      submitData() {
        this.topicDialog = !this.topicDialog
        console.log(this.setData)
        checkDefenceGroup({groupid:this.groupid, grouplist:this.grouplist}).then(res =>{
          this.grouplist = []
          this.groupid = ''
        })
      },
      show() {
        this.data = []
        for (let i = 0; i < this.teacherDate.length; i++) {
          this.data.push({
            key: this.teacherDate[i].userid,
            label: this.teacherDate[i].username,
          })
        }
        return this.data
      },
      handleChange(value, direction, movedKeys) {
        this.selectValue = value
        console.log(this.selectValue)
        this.selectValue.forEach(item =>{
          this.grouplist.push(item)
        })
        console.log(this.grouplist)
      },
      handleOpen(data) {
        this.topicDialog = !this.topicDialog
        if (data !== undefined) {
          this.showData = JSON.parse(JSON.stringify(data))
          this.showData.schedule = this.showData.schedule.replace(/<br>/g, '\n')
          this.showData.topiccontent = this.showData.topiccontent.replace(/<br>/g, '\n')
        }
      },
      changedate(){},
      settimeAdd(){
        setdefencetime(
          this.setData.id,
          this.setData.time,
//          this.get24Hours(),
          this.setData.address
        ).then(res =>{
          this.setDialog = false
          this.getData()
          this.setData= {
            time: null,
              address: null,
              id: null
          }
        })
      }
    },
    created() {
      this.getCollegeList();
//      this.getteacherData();
      this.getData()
    }
  }
</script>
<style  scoped rel="stylesheet/scss" lang="scss">
  .checkStudent {
    margin-top: 60px;
  }
</style>
<style  rel="stylesheet/scss" lang="scss">
  @import 'src/styles/variables.scss';
  .checkStudent {
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
    .el-dialog__body {
      padding: 10px 24px;
      .diatop {
        margin-bottom: 20px;
      }
    }
    .timedia {
      align-items: flex-start;
      .el-dialog {
        margin-top: 15vh !important;
      }
      .diabody {
        text-align: center;
        color: $fontcolor;
        padding: 10px 20px;
        // height: 510px;
        .label {
          line-height: 40px;
          margin-right: 25px;
        }
        .el-input {
          width: 224px;
        }
        .el-icon-time {
          display: none;
        }
        .el-range-input {
          padding: 0;
        }
        .timetitle {
          padding-right: 20px;
          margin-bottom: 20px;
          .titlespace {
            width: 15px;
            flex: none;
          }
        }
      }
    }
    .popper__arrow {
      display: none;
    }
  }
</style>
