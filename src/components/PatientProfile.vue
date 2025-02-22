<template>
  <el-card class="patient-profile" shadow="hover">
    <div class="header">
      <el-icon><List /></el-icon>
      <h2>患者列表</h2>
    </div>
    <el-table :data="patients" style="width: 100%">
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="gender" label="性别" width="120" :formatter="formatGender" />
      <el-table-column prop="age" label="年龄" width="120" />
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleClick(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { List } from '@element-plus/icons-vue';

export default {
  props: {
    patients: {
      type: Array,
      required: true,
    },
  },
  components: {
    List,
  },
  methods: {
    // 格式化性别字段
    formatGender(row, column, cellValue) {
      const genderMap = {
        male: '男',
        female: '女',
      };
      return genderMap[cellValue] || cellValue; // 如果未匹配到，返回原值
    },
    // 处理详情按钮点击
    handleClick(row) {
      this.$router.push({name: 'PatientDetail', params: {patientName: row.name}});
    },
  },
};
</script>

<style scoped>
.patient-profile {
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
</style>