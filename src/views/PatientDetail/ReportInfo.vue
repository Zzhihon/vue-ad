<template>
  <el-card class="report-info" shadow="hover">
    <div class="header">
      <el-icon><Document /></el-icon>
      <h2>报告信息</h2>
    </div>
    <el-select v-model="selectedReport" placeholder="请选择报告" @change="handleChange">
      <el-option
          v-for="report in reports"
          :key="report.id"
          :label="`报告 ${report.id}`"
          :value="report"
      />
    </el-select>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="报告上传日期">2025-02-15</el-descriptions-item>
      <el-descriptions-item label="图像上传状态">已上传</el-descriptions-item>
      <el-descriptions-item label="预测生成状态">已生成</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
import { Document } from '@element-plus/icons-vue';

export default {
  props: {
    reports: {
      type: Array,
      required: true,
    },
  },
  components: {
    Document,
  },
  data() {
    return {
      selectedReport: this.reports[0], // 默认选择第一份报告
    };
  },
  methods: {
    handleChange(report) {
      this.$emit('select-report', report);
    },
  },
};
</script>

<style scoped>
.report-info {
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
  color: #f56c6c;
}

.el-select {
  width: 100%;
  margin-bottom: 16px;
}

.el-descriptions {
  margin-top: 16px;
}
</style>