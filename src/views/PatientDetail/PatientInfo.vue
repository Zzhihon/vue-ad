<template>
  <el-card class="patient-info">
    <h2>患者信息</h2>
    <p>姓名: {{ patient.name }}</p>
    <p>性别: {{ patient.gender }}</p>
    <p>年龄: {{ patient.age }}</p>
  </el-card>
</template>

<script>
export default {
  props: {
    patient: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.patient-info {
  margin-bottom: 20px;
}
</style>