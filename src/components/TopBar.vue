<template>
  <el-menu
      :default-active="activeIndex"
      background-color="#545c64"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">
      <img
          style="width: 100px"
          src="/images/element-plus-logo.svg"
          alt="Element logo"
      />
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>用户</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
// import { ref } from 'vue'
//
// const activeIndex = ref('1')
// const handleSelect = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
export default{
  name: "TopBar",
}

</script>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}

/* 去掉 body 默认的 margin 和 padding */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* 让 el-menu 紧贴页面顶部，并填满顶部区域 */
.el-menu-demo {
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* 确保它在最上层 */
}
</style>

