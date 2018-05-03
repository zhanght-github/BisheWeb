<!--  -->
<template>
  <div class="flex Addbox">
    <div>
      <el-select v-model="value1" class="selectDown" v-if="selectshow">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value2" class="selectDown" v-if="selectshow2">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value3" class="selectDown" v-if="selectshow3">
      <el-option
        v-for="item in options3"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="flex">
      <el-button type="primary" @click="edit()" class="fontnormal" v-if="editshow"><i class="iconfont icon-ico_edit"></i><span>编辑</span></el-button>
      <el-button type="primary" @click="add()" class="fontnormal" v-if="addshow"><slot class="left" name="iconleft"></slot><span>新增</span><slot name="iconright"></slot></el-button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '',
      value2: '',
      value3: ''
    }
  },
  props: {
    options: {
      type: Array
    },
    selectshow: Boolean,
    selectshow2: Boolean,
    selectshow3: Boolean,
    addshow: Boolean,
    editshow: Boolean,
    options2: Array,
    options3: Array,
    set2: String
  },
  mounted() {
    if (this.options) {
      this.value1 = this.options[0].value
    }
    if (this.options2) {
      this.value2 = this.options2[0].value
    }
    if (this.options3) {
      this.value3 = this.options3[0].value
    }
  },
  methods: {
    add() {
      this.$emit('handleAdd')
    },
    edit() {
      this.$emit('handleEdit')
    },
    changeused() {
      this.$emit('changeused', this.value1)
    },
    changeselect2() {
      this.$emit('changeselect2', this.value2)
    },
    changeselect3() {
      this.$emit('changeselect3', this.value3)
    }
  },
  watch: {
    value1(val) {
      if (val) {
        this.changeused()
      }
      if (!val) {
        this.changeused()
      }
    },
    value2(val) {
      if (val) {
        this.changeselect2()
      }
      if (!val) {
        this.changeselect2()
      }
    },
    value3(val) {
      if (val) {
        this.changeselect3()
      }
      if (!val) {
        this.changeselect3()
      }
    },
    set2(val) {
      this.value2 = val
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.Addbox {
  height: 50px;
  background-color: #fff;
  padding: 0px 15px 12px 20px;
  justify-content: space-between;
  .el-button {
    background-color: #4780fc;
    transition: 0.2s ease;
    padding: 0 20px;
    span {
      font-size: 12px;
      i {
        font-size: 12px;
      }
      span {
        margin: 0 4px;
      }
    }
    &:hover {
      background-color: #3866c9;
    }
  }
  .selectDown {
    .el-input__inner {
      &::-webkit-input-placeholder {
        color: #7a7b91;
      }
      &:-moz-placeholder {
        color: #7a7b91;
      }
      &::-moz-placeholder {
        color: #7a7b91;
      }
    }
  }
}
</style>
