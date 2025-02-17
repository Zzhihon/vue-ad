<template>
  <el-card class="prediction-info">
    <h2>预测信息</h2>
    <p>LR值: {{prediction.lr}}</p>
    <p>SVM值: {{prediction.svm}}</p>
    <p>DT值: {{prediction.dt}}</p>
    <p>Final: {{prediction.final}}</p>
    <p>概率: {{ prediction.probability }}</p>
    <p>建议: {{ prediction.advice }}</p>
  </el-card>
</template>

<script>
export default {
  props: {
    prediction: {
      type: Object,
      required: true,
    },
  },


};
</script>

<style scoped>
.prediction-info {
  margin-bottom: 20px;
}
</style>