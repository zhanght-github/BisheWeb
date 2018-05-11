<!--  -->
<template>
  <div class="MyReply">
    <el-table
        :data="list"
        style="width: 100%">
         <el-table-column
          property="keti"
          label="课题名称"
          width="250">
          </el-table-column>
          <el-table-column
          property="name"
          label="选题学生"
          width="100">
          </el-table-column>
          <el-table-column
          property="ID"
          label="学生学号">
          </el-table-column>
          <el-table-column
          property="time"
          label="答辩时间">
          </el-table-column>
           <el-table-column
           property="address"
          label="答辩地点">
          </el-table-column>
    </el-table>
  </div>
</template>

<script>
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
      ]
    }
  }
}
</script>
<style>

</style>
