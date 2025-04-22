<template>
  <el-card class="report-image" shadow="hover">
    <div class="header">
      <el-icon><Picture /></el-icon>
      <h2>OTC 图像</h2>
    </div>
    <div class="image-container">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <el-skeleton-item variant="image" style="width: 100%; height: 200px;" />
        </template>
        <template #default>
          <img :src="imageUrl" alt="OTC Image" v-if="imageUrl" />
          <p v-else>无法加载图像</p>
        </template>
      </el-skeleton>
    </div>
  </el-card>
</template>

<script>
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { Picture } from '@element-plus/icons-vue';
import api from '@/api';

export default {
  props: {
    imageName: {
      type: String,
      required: true,
    },
  },
  components: {
    Picture,
  },
  setup(props) {
    const imageUrl = ref('');
    const loading = ref(false);

    // 获取图像
    const fetchImage = async () => {
      if (props.imageName) {
        loading.value = true;
        try {
          const response = await api.patient.getImage(props.imageName);
          if (response && response.data) {
            imageUrl.value = URL.createObjectURL(response.data);
          } else {
            throw new Error('无效的图像响应');
          }
        } catch (error) {
          ElMessage.error('加载图像失败');
          console.error('加载图像失败:', error);
        } finally {
          loading.value = false;
        }
      }
    };

    // 监听 imageName 的变化
    watch(() => props.imageName, fetchImage, { immediate: true });

    return {
      imageUrl,
      loading,
    };
  },
};
</script>

<style scoped>
.report-image {
  margin-bottom: 20px;
  background-color: #f5f7fa;
  padding: 16px;
  border-radius: 8px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.header h2 {
  margin-left: 8px;
  margin-bottom: 0;
  color: #e6a23c;
}

.image-container {
  text-align: center;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>