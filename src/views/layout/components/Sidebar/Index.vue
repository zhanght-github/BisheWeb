<template>
  <scroll-bar>
     <div class="logobox">
      <img :src="imglogo" alt="">
      <div class="chanyikeji fontnormal">河南科技大学毕设管理系统</div>
      <!-- <i class="iconfont icon-ico_category"></i> -->
    </div>
    <el-menu mode="vertical" :default-active="$route.path" height='100vh' :collapse="isCollapse" background-color="white" text-color="black" active-text-color="#409EFF">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import imglogo from '@/assets/logo_images/logo.jpg'

export default {
  data() {
    return {
      imglogo
    }
  },
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

