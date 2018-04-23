<template>
  <scroll-bar>
    <el-menu mode="vertical" :default-active="$route.path" height='100vh' :collapse="isCollapse" background-color="white" text-color="black" active-text-color="#409EFF">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  data() {
    return {}
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

