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
        type="index"
        label="分组号"
        width="250">
      </el-table-column>
      <el-table-column
        property="name"
        label="组长"
        width="100">
      </el-table-column>
      <el-table-column
        property="subject"
        label="副组长"
        width="100">
      </el-table-column>
      <el-table-column
        property="process"
        label="组长联系电话">
      </el-table-column>
      <el-table-column
        property="phone"
        label="操作">
        <template slot-scope="scope" >
          <el-button type="success" size="small" @click="handleOpen(scope.row)">修改组员</el-button>
          <el-button type="danger" size="small" @click="handleOpen(scope.row)">查看组员</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" class='editdia' width="800px" :visible.sync="topicDialog" :close-on-press-escape='false' :close-on-click-modal='false'>
      <el-select v-model="value" placeholder="请选择学院" flex="fixed" align="left" style="width: 200px" @change="getCollegeValue">
        <el-option
          v-for="item in options"
          :key="item.collegeid"
          :label="item.collegename"
          :value="item.collegeid">
        </el-option>
      </el-select>
      <el-select v-model="groupid" placeholder="请选择分组" style="width: 200px;display: block;margin-top: 150px" @change="groupIdValue">
        <el-option
          v-for="item in groupOptions"
          :key="item.groupid"
          :label="item.groupName"
          :value="item.groupid">
        </el-option>
      </el-select>
      <div flex="fixed" align="right">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value3"
          filterable
          :render-content="renderFunc"
          :titles="['教师', '组员']"
          :button-texts="['到左边', '到右边']"
          :format="{ noChecked: '${total}', hasChecked: '${checked}/${total}' }"
          @change="handleChange"
          :data="teacherList">
          <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button></el-transfer>
      </div>
      <div class="diafoot flex">
        <el-button type="primary" class="truebutton deepbluebtn" @click="submitData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getteacher, getCollegeList, checkMiddleGroup } from '@/api/admin'

  export default {
    data() {
      return {
        dataList: [],
        value3: [1],
        renderFunc(h, option) {
          return <span> { option.key } - { option.label } </span>
        },
        page: 1,
        size: 10,
        loading: false,
        topicDialog: false,
        tableData: [],
        title: '',
        showData: {},
        teacherDate: [],
        teacherList: [],
        groupid:'',
        tableData:[],
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
        options: [{
          collegeid: '选项1',
          collegename: '黄金糕'
        }, {
          collegeid: '选项2',
          collegename: '双皮奶'
        }, {
          collegeid: '选项3',
          collegename: '蚵仔煎'
        }, {
          collegeid: '选项4',
          collegename: '龙须面'
        }, {
          collegeid: '选项5',
          collegename: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods: {
      getteacherData() {
        getteacher(0, 10, 1,this.collegeValue).then(res => {
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
      },
      getCollegeValue(val){
        this.collegeValue = val;
        this.getteacherData();
      },
      submitData() {
       this.closeDialog();
        checkMiddleGroup(this.groupid,this.grouplist).then(res =>{
          console.log('2222')
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
        this.selectValue = value.filter(item => {
          return item[1]
        })
        this.grouplist.push(this.selectValue)
      },
      handleOpen(data) {
        this.topicDialog = !this.topicDialog
        if (data !== undefined) {
          this.showData = JSON.parse(JSON.stringify(data))
          this.showData.schedule = this.showData.schedule.replace(/<br>/g, '\n')
          this.showData.topiccontent = this.showData.topiccontent.replace(/<br>/g, '\n')
        }
      },
    },
    created() {
      this.getCollegeList();
    }
  }
</script>
<style  scoped rel="stylesheet/scss" lang="scss">
  .checkStudent {
    margin-top: 60px;
  }
</style>
<style  rel="stylesheet/scss" lang="scss">
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
  }
</style>
