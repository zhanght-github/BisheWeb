<!--  -->
<template>
  <div class="paging flex">
    <div class="total">共 {{total}} 条</div>
    <ul class="flex">
      <li class="notallow" v-if='currentPage==1'><i class="iconfont icon-ico_arrow_left"></i></li>
      <li @click="prev()" v-if='currentPage!=1' disabled><i class="iconfont icon-ico_arrow_left"></i></li>
      <li @click="changecurrentPage(currentPage-4)" v-if='currentPage-4>0&&currentPage+1>pageCount'>{{currentPage-4}}</li>
      <li @click="changecurrentPage(currentPage-3)" v-if='currentPage-3>0&&currentPage+1>=pageCount'>{{currentPage-3}}</li>
      <li @click="changecurrentPage(currentPage-2)" v-if='currentPage-2>0'>{{currentPage-2}}</li>
      <li @click="changecurrentPage(currentPage-1)" v-if='currentPage-1>0'>{{currentPage-1}}</li>
      <li @click="changecurrentPage(currentPage)" class="is-active">{{currentPage}}</li>
      <li @click="changecurrentPage(currentPage+1)" v-if='currentPage+1<=pageCount'>{{currentPage+1}}</li>
      <li @click="changecurrentPage(currentPage+2)" v-if='currentPage+2<=pageCount'>{{currentPage+2}}</li>
      <li @click="changecurrentPage(currentPage+3)" v-if='currentPage+3<=pageCount&&currentPage<3&&pageCount>=4'>{{currentPage+3}}</li>
      <li @click="changecurrentPage(currentPage+4)" v-if='currentPage+4<=pageCount&&currentPage<2&&pageCount>4'>{{currentPage+4}}</li>
      <li @click="next()" v-if='currentPage!=pageCount'><i class="iconfont icon-ico_arrow_right"></i></li>
      <li class="notallow"  v-if='currentPage==pageCount'><i class="iconfont icon-ico_arrow_right"></i></li>
    </ul>
    <div class="flex right fontnormal">
      <el-select class="selectDown pageS" v-model="pageSizes">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="jump">
        跳至
        <input @keyup.enter="jumpTo()" type="text" v-model="jumpPage">
        |&nbsp;  {{pageCount}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageCount: 0,
      options: [
        {
          value: 10,
          label: '10条/页'
        },
        {
          value: 50,
          label: '50条/页'
        },
        {
          value: 100,
          label: '100条/页'
        }
      ],
      jumpPage: '',
      allowEmit: true,
      currentPage: this.PageNum,
      pageSizes: this.pageSize
    }
  },
  props: {
    total: {
      type: Number
    },
    PageNum: {
      type: Number
    },
    pageSize: {
      type: Number
    }
  },
  mounted() {
    this.pageCount = Math.ceil(this.total / this.pageSizes)
    this.jumpPage = this.currentPage
  },
  methods: {
    prev() {
      if (this.currentPage - 1 > 0) {
        this.currentPage = this.currentPage - 1
      }
    },
    next() {
      if (this.currentPage + 1 <= this.pageCount) {
        this.currentPage = this.currentPage + 1
      }
    },
    changecurrentPage(val) {
      this.currentPage = val
    },
    jumpTo() {
      if (/^[1-9]\d*$/.test(this.jumpPage) && this.jumpPage > 0 && this.jumpPage <= this.pageCount) {
        this.allowEmit = false
        if (this.jumpPage > this.currentPage) {
          do {
            this.currentPage++
          } while (this.currentPage < this.jumpPage)
        } else if (this.jumpPage < this.currentPage) {
          do {
            this.currentPage--
          } while (this.currentPage > this.jumpPage)
        }
        this.allowEmit = true
      } else {
        this.$message({
          message: '输入不合法',
          type: 'warning'
        })
      }
    }
  },
  watch: {
    currentPage(val) {
      if (this.allowEmit) {
        this.jumpPage = this.currentPage
        this.$emit('handlePageNum', val)
      }
    },
    total(val) {
      this.pageCount = Math.ceil(this.total / this.pageSizes)
      if (this.pageCount < this.currentPage && this.pageCount !== 0) {
        this.currentPage = this.pageCount
      }
    },
    pageSizes(val) {
      this.$emit('handlePageSize', val)
      this.pageCount = Math.ceil(this.total / val)
      this.currentPage = 1
      this.jumpPage = 1
    },
    pageSize(val) {
      this.currentPage = 1
      this.jumpPage = 1
      this.pageCount = Math.ceil(this.total / val)
    },
    PageNum(val) {
      this.currentPage = val
      window.scrollTo(0, 0)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.paging {
  z-index: 20;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 240px;
  right: 0;
  height: 60px;
  line-height: 60px;
  background: white;
  border-top: 1px solid rgba(242, 242, 242, 0.8);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  ul {
    align-items: center;
    flex: none;
    li {
      width: 30px;
      height: 30px;
      object-fit: contain;
      border-radius: 4px;
      background-color: rgba(122, 123, 145, 0.08);
      text-align: center;
      line-height: 30px;
      margin-right: 10px;
      color: #7a7b91;
      font-family: CerebriSans-SemiBold;
      font-size: 13px;
      font-weight: 600;
      transition: background-color 0.2s ease;
      &:hover {
        cursor: pointer;
        background-color: rgba(122, 123, 145, 0.14);
      }
    }
    .notallow {
      color: #b8b9c7;
      &:hover {
        cursor: not-allowed;
        background-color: rgba(122, 123, 145, 0.08);
      }
    }
    .is-active {
      background-color: #4780fc;
      color: white;
      transition: background-color 0.2s ease;
      &:hover {
        background-color: #3866c9;
      }
    }
  }
  .total {
    flex: none;
    margin-left: 30px;
    font-family: CerebriSans-SemiBold;
    font-size: 13px;
    font-weight: 500;
    color: #b8b9c7;
    width: 200px;
    span {
      margin-right: 10px;
    }
  }
  .right {
    margin-right: 30px;
    flex: none;
    color: #b8b9c7;
    .selectDown {
      width: 88px;
      height: 30px;
    }
    .jump {
      input {
        margin: 0 4px;
        width: 30px;
        height: 30px;
        border-radius: 4px;
        background-color: rgba(122, 123, 145, 0.08);
        outline: none;
        border: none;
        text-align: center;
        font-family: CerebriSans-SemiBold;
        font-size: 12px;
        font-weight: 600;
        color: #7a7b91;
        transition: background-color 0.2s ease;
        &:hover {
          background-color: rgba(122, 123, 145, 0.14);
        }
        &:focus {
          background-color: rgba(122, 123, 145, 0.14);
          border: solid 2px #4780fc;
        }
      }
    }
  }
}
</style>
<style>
.paging .pageS .el-input {
  width: 88px;
  height: 30px;
}
.paging .selectDown {
  margin-right: 22px;
}
.paging .pageS .el-input input {
  width: 88px;
  height: 30px;
  font-family: CerebriSans-SemiBold;
  font-size: 12px;
  font-weight: 600;
  color: #7a7b91;
}
</style>
