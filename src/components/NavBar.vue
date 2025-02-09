<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      style="height: 100vh"
      @select="handleClick"
  >
    <el-sub-menu index="1">
      <template #title>
        <span>Navigator</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/">home</el-menu-item>
        <el-menu-item index="/search">search</el-menu-item>
        <el-menu-item index="/settings">setting</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>


  </el-menu>
</template>

<script>


export default{
  name: "NavBar",
  methods:{
    handleClick(key){
      console.log('点击了侧边',this.$route.path );
      this.$router.push(key);
    }
  }
}

</script>


<style scoped>
/* 侧边栏 */
.el-menu-vertical-demo {
  position: fixed;
  top: 60px; /* 让侧边栏紧贴导航栏下方 */
  left: 0;
  width: 200px; /* 侧边栏宽度 */
  height: calc(100vh - 60px); /* 填充整个页面高度，减去导航栏高度 */
  background-color: #545c64;
  z-index: 999;
}
</style>