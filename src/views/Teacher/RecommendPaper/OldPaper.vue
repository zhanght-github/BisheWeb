<!--  -->
<template>
  <div class="oldpaper">
    <div class="content bor4">
      <div v-for='(item, index) in paperList' :key="index" class="paperbox flex">
        <div>
          <a href="">基于vue的毕业设计管理系统</a>
        </div>
        <div class="right">
          <span>张三</span>
          <span>2018-05-06  08:08:05</span>
        </div>
      </div>
    </div>
    <Pagging :total='total' :PageNum='pageNum' :pageSize='pageSize' @handlePageSize='handlePageSize' @handlePageNum='handlePageNum'></Pagging>
  </div>
</template>

<script>
import Pagging from '../../common/Pagging'
import { greatPaper } from '@/api/teacher'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: null,
      paperList: []
    }
  },
  components: { Pagging },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      greatPaper(this.pageNum - 1, this.pageSize, 2).then(res => {
        this.paperList = res.data.data.content
        this.total = res.data.data.total
      })
    },

    handlePageSize(val) {
      this.pageSize = val
    },
    handlePageNum(val) {
      this.pageNum = val
    }
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
@import 'src/styles/variables.scss';
.oldpaper {
  .content {
    margin-top: 60px;
    background-color: white;
    .paperbox {
      justify-content: space-between;
      height: 60px;
      line-height: 60px;
      padding: 0 24px;
      a {
        text-decoration: underline;
        &:hover {
          cursor: pointer;
          color: $fontblue;
        }
      }
      .right {
        span {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
