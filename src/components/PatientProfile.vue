<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="id" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="gender" label="Gender" width="120" />
    <el-table-column prop="age" label="Age" width="120" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleClick(scope.row)">
          Detail
        </el-button>
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {computed, onMounted} from 'vue';
import {useRouter} from 'vue-router';

export default {
  props: {
    patients: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const tableData = computed(() => props.patients);

    // 点击 Detail 按钮的处理函数
    const handleClick = (row) => {
      // 跳转到患者档案页面
      router.push({name: 'PatientDetail', params: {patientName: row.name}});
    };

    // 模拟从 API 获取数据
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:8080/GetPatient/1/');
        const data = await response.json();
        console.log('从 API 获取的患者数据:', data);
      } catch (error) {
        console.error('获取患者数据失败:', error);
      }
    };

    // 组件挂载时调用 API
    onMounted(() => {
      fetchPatients();
    });

    return {
      tableData,
      handleClick,
    };
  },
};
</script>