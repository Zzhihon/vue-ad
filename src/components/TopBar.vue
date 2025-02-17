<template>
  <el-menu
      :default-active="activeIndex"
      background-color="#545c64"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <!-- Logo 区域 -->
    <el-menu-item index="0">
      <img
          v-if="logoUrl"
          style="width: 100px"
          :src="logoUrl"
          alt="Element logo"
      />
      <span v-else>加载中...</span>
    </el-menu-item>

    <!-- 用户菜单 -->
    <el-sub-menu index="2">
      <template #title>用户</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'TopBar',
  setup() {
    const logoUrl = ref(''); // 用于存储图片的 URL

    // 获取图片
    const fetchLogo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/GetImage/ad-logo.png/', {
          responseType: 'blob', // 获取二进制数据
        });
        logoUrl.value = URL.createObjectURL(response.data); // 将二进制数据转换为 URL
        console.log('Logo URL:', logoUrl.value);
      } catch (error) {
        console.error('加载 Logo 失败:', error);
      }
    };

    // 组件挂载时调用 API 获取图片
    onMounted(() => {
      fetchLogo();
    });

    return {
      logoUrl,
    };
  },
};
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