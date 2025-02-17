<template>
  <el-card class="report-info">
    <h2>报告信息</h2>
    <el-select v-model="selectedReport" placeholder="请选择报告" @change="handleChange">
      <el-option
          v-for="report in reports"
          :key="report.id"
          :label="`报告 ${report.id}`"
          :value="report"
      />
    </el-select>
    <p>报告上传日期: 2025-02-15</p>
    <p>图像上传状态: 已上传</p>
    <p>预测生成状态: 以生成</p>
  </el-card>
</template>

<script>
export default {
  props: {
    reports: {
      type: Array,
      required: true,
    },
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
}
</style>