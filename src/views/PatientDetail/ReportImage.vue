<template>
  <el-card class="report-image">
    <!-- 图片展示区域 -->
    <div class="image-container">
      <img :src="imageUrl" alt="OTC Image" v-if="imageUrl" />
      <p v-else>加载中...</p>
    </div>
  </el-card>
</template>

<script>
import { ref, watch } from 'vue';
import axios from 'axios';

export default {
  props: {
    imageName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const imageUrl = ref('');

    // 获取图像
    const fetchImage = async () => {
      console.log(props.imageName);
      if (props.imageName) {
        try {
          const response = await axios.get(`http://localhost:8080/GetImage/${props.imageName}/`, {
            responseType: 'blob', // 获取二进制数据
          });
          imageUrl.value = URL.createObjectURL(response.data); // 使用 .value 赋值
          console.log(imageUrl.value);
        } catch (error) {
          console.error('加载图像失败:', error);
        }
      }
    };

    // 监听 imageName 的变化
    watch(() => props.imageName, fetchImage, { immediate: true });

    return {
      imageUrl,
    };
  },
};
</script>

<style scoped>
.report-image {
  margin-bottom: 20px;
}

.image-container {
  text-align: center;
}

img {
  max-width: 100%;
  height: auto;
}
</style>