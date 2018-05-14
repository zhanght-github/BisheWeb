<!--  -->
<template>
  <div class="MyReply">
    <el-table
        :data="dataList"
        style="width: 100%">
         <el-table-column
          property="topicname"
          label="课题名称"
          width="250">
          </el-table-column>
          <el-table-column
          property="studentname"
          label="选题学生"
          width="100">
          </el-table-column>
          <el-table-column
          property="studentid"
          label="学生学号">
          </el-table-column>
          <el-table-column
          label="答辩时间">
           <template slot-scope="scope">
                <div class="handle">
                  <span v-if='!scope.row.defenceTime' class="notAllowed result">未设置答辩时间</span>
                  <span v-if='scope.row.defenceTime' class="allowed result">{{scope.row.defenceTime}}</span>
                </div>
            </template>
          </el-table-column>
           <el-table-column
          label="答辩地点">
           <template slot-scope="scope">
                <div class="handle">
                  <div class="handle">
                  <span v-if='!scope.row.defenceLocation' >未设置答辩地点</span>
                  <span v-if='scope.row.defenceLocation'>{{scope.row.defenceLocation}}</span>
                </div>
                </div>
            </template>
          </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getMyStudent } from '@/api/teacher'
export default {
  data() {
    return {
      list: [
        {
          name: 'zhangsan',
          keti: '基于vue的毕业设计管理系统',
          topicID: '110',
          ID: '141404050126',
          zhuanye: '物联网工程',
          phone: '15670372860',
          status: 0,
          time: '2018-06-06 09:00',
          address: '工科二号楼602'
        },
        {
          name: 'zhangsan',
          keti: '基于vue的毕业设计管理系统',
          topicID: '110',
          ID: '141404050126',
          zhuanye: '物联网工程',
          phone: '15670372860',
          status: 1,
          time: '2018-06-06 09:00',
          address: '工科二号楼602'
        },
        {
          name: 'zhangsan',
          keti: '基于vue的毕业设计管理系统',
          topicID: '110',
          ID: '141404050126',
          zhuanye: '物联网工程',
          phone: '15670372860',
          status: -1,
          time: '2018-06-06 09:00',
          address: '工科二号楼602'
        }
      ],
      setDialog: false,
      days: null,
      setData: {
        time: '',
        address: ''
      },
      pageNum: 1,
      pageSize: 10,
      total: null,
      dataList: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getMyStudent(this.pageNum - 1, this.pageSize, this.getUserId()).then(res => {
        this.dataList = res.data.data.content
        this.total = res.data.data.total
      })
    }
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.MyReply {
  position: relative;
  margin-top: 50px;
  .header {
    height: 50px;
    line-height: 50px;
    position: fixed;
    top: 50px;
    left: 240px;
    right: 0px;
    background-color: #fff;
    z-index: 100;
    text-align: right;
    padding-right: 40px;
  }
  .el-table {
    margin-top: 110px;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
@import 'src/styles/variables.scss';
.MyReply {
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
      .watchSuggest {
        text-decoration: underline;
        &:hover {
          cursor: pointer;
          color: $fontblue;
        }
      }
    }
  }
}
</style>
