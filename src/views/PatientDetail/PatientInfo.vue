<template>
  <el-card class="patient-info" shadow="hover">
    <div class="header">
      <el-icon><User /></el-icon>
      <h2>患者信息</h2>
    </div>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="姓名">{{ patient.name }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{ patient.gender }}</el-descriptions-item>
      <el-descriptions-item label="年龄">{{ patient.age }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
import { User } from '@element-plus/icons-vue';

export default {
  props: {
    patient: {
      type: Object,
      required: true,
    },
  },
  components: {
    User,
  },
};
</script>

<style scoped>
.patient-info {
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
  color: #409eff;
}

.el-descriptions {
  margin-top: 16px;
}
</style>