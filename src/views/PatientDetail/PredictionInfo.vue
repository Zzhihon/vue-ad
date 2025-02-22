<template>
  <el-card class="prediction-info" shadow="hover">
    <div class="header">
      <el-icon><DataAnalysis /></el-icon>
      <h2>预测信息</h2>
    </div>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="LR值">{{ prediction.lr }}</el-descriptions-item>
      <el-descriptions-item label="SVM值">{{ prediction.svm }}</el-descriptions-item>
      <el-descriptions-item label="DT值">{{ prediction.dt }}</el-descriptions-item>
      <el-descriptions-item label="Final值">{{ prediction.final }}</el-descriptions-item>
      <el-descriptions-item label="概率">{{ prediction.probability }}</el-descriptions-item>
      <el-descriptions-item label="建议">{{ prediction.advice }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
import { DataAnalysis } from '@element-plus/icons-vue';

export default {
  props: {
    prediction: {
      type: Object,
      required: true,
    },
  },
  components: {
    DataAnalysis,
  },
};
</script>

<style scoped>
.prediction-info {
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
  color: #67c23a;
}

.el-descriptions {
  margin-top: 16px;
}
</style>