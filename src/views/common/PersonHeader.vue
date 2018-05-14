<!--  -->
<template>
  <div class="headershow">
    <div class="flex searchbox">
      <el-menu :default-active="activeIndex" active-text-color='#409eff' class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="item in menuOptions" :key="item.key" :index="item.key">{{item.option}}</el-menu-item>
      </el-menu>
      <div class="flex searchroom">
        <el-select v-model="searchType" class="selectDown" placeholder="选择方式" @clear="clear()">
          <el-option
            v-for="item in searchOptions"
            :key="item.key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
           @keyup.enter.native="goSearch()"
           placeholder="搜索"
           v-model="value">
           <i slot="prefix" class="iconfont icon-ico_arrow_downcopy"></i>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      value: this.defaultValue,
      searchType: this.searchOptions[0].value,
      activeIndex: this.defaultselect.toString(),
      valueAll: ''
    }
  },
  props: {
    searchOptions: {
      type: Array
    },
    menuOptions: {
      type: Array
    },
    defaultselect: Number,
    defaultValue: String
  },
  created() {
    // this.activeIndex = this.defaultselect
  },
  mounted() {},
  methods: {
    handleSelect(val) {
      this.$emit('changeway', val)
    },
    goSearch() {
      let lagValue = this.value
      setTimeout(() => {
        if (lagValue === this.value) {
          this.$emit('gosearch', { type: this.searchType, value: this.value })
        }
      }, 1300)
    },
    changeicon() {
      var iclass = document.querySelector('.searchroom .el-input--prefix .el-input__prefix i')
      iclass.className = 'iconfont icon-ico_arrow_downcopy'
    },
    clear() {
      this.searchType = ''
    }
  },
  watch: {
    value(newdata, olddata) {
      if (this.searchType != '') {
        if (newdata) {
          this.goSearch()
        } else {
          this.goSearch()
        }
      } else {
        this.$message({
          message: '请选择搜索方式',
          type: 'warning'
        })
      }
    },
    searchType(newdata, olddata) {
      this.value = ''
      this.goSearch()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
$blue: #409eff;
.headershow {
  background-color: #fff;
  height: 60px;
  line-height: 60px;
  padding-left: 30px;
  .searchbox {
    justify-content: space-between;
    .searchroom {
      margin-right: 15px;
      .el-input--prefix {
        .el-input__prefix {
          display: inline-block;
          padding-left: 5px;
          i {
            font-size: 13px;
          }
        }
        input {
          padding-left: 28px;
          width: 290px;
          height: 40px;
          background-color: rgba(122, 123, 145, 0.08);
          font-family: CerebriSans-SemiBold;
          font-size: 12px;
          font-weight: 600;
          object-fit: contain;
          color: #7a7b91;
          border: none;
          transition: background-color 2s ease;
          &:hover {
            background-color: rgba(122, 123, 145, 0.14);
          }
          &::-webkit-input-placeholder {
            object-fit: contain;
            font-family: CerebriSans-SemiBold;
            font-size: 12px;
            font-weight: 600;
            color: rgba(158, 160, 181, 0.8);
          }
          &:focus {
            padding-left: 26px;
            background-color: rgba(122, 123, 145, 0.14);
            border: solid 2px #4780fc;
          }
        }
      }
    }
    .el-menu {
      .is-active {
        color: #4780fc !important;
        border-bottom-color: none !important;
      }
    }
  }
  .el-menu-demo {
    display: flex;
    flex-wrap: nowrap;
    border-color: #fff;
    .el-menu-item {
      color: #b8b9c7;
      padding: 0;
      margin-right: 20px;
      font-size: 13px;
      font-weight: 600;
      height: 58px;
      line-height: 58px;
      font-family: CerebriSans-SemiBold;
    }
    .is-active {
      margin-bottom: 0;
    }
  }
  .selectDown {
    margin-right: 15px;
    input {
      &:focus {
        padding-left: 14px;
        background-color: rgba(122, 123, 145, 0.14);
        border: none;
      }
    }
  }
}
</style>
