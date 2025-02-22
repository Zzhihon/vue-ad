<template>
  <el-card class="doctor-profile" shadow="hover">
    <div class="header">
      <el-icon><User /></el-icon>
      <h2>医生信息</h2>
    </div>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="姓名">{{ doctor.name }}</el-descriptions-item>
      <el-descriptions-item label="诊室">{{ doctor.address }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ doctor.email }}</el-descriptions-item>
      <el-descriptions-item label="联系">{{ doctor.contact }}</el-descriptions-item>
      <el-descriptions-item label="科室">{{ doctor.profession }}</el-descriptions-item>
      <el-descriptions-item label="简介">{{ doctor.description }}</el-descriptions-item>

    </el-descriptions>
  </el-card>
</template>

<script>
import { User } from '@element-plus/icons-vue';

export default {
  props: {
    doctor: {
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
.doctor-profile {
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