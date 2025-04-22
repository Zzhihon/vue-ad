<template>
  <div class="patient-detail">
    <el-row :gutter="20">
      <el-col :span="12">
        <!-- 患者信息模块 -->
        <PatientInfo :patient="patient" />
        <!-- 报告图像模块 -->
        <ReportImage :imageName="imageName" />
      </el-col>
      <el-col :span="12">
        <!-- 报告信息模块 -->
        <ReportInfo :reports="reports" @select-report="handleSelectReport" />
        <!-- 预测信息模块 -->
        <PredictionInfo :prediction="predictionInfo" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import api from '@/api';
import PatientInfo from '@/views/PatientDetail/PatientInfo.vue';
import ReportInfo from '@/views/PatientDetail/ReportInfo.vue';
import ReportImage from '@/views/PatientDetail/ReportImage.vue';
import PredictionInfo from '@/views/PatientDetail/PredictionInfo.vue';

export default {
  components: {
    PatientInfo,
    ReportInfo,
    ReportImage,
    PredictionInfo,
  },
  setup() {
    const route = useRoute();
    const patientName = route.params.patientName;

    const patient = ref({});
    const reports = ref([]);
    const predictionInfo = ref({});
    const selectedReport = ref({});
    const imageName = ref('');
    const loading = ref(false);

    // 获取患者信息
    const fetchPatient = async () => {
      loading.value = true;
      try {
        const response = await api.patient.getPatient(1);
        
        // 处理不同的响应格式可能性
        if (response && response.data) {
          patient.value = response.data;
        } else if (response) {
          patient.value = response;
        } else {
          throw new Error('无效的患者数据响应');
        }
      } catch (error) {
        ElMessage.error('加载患者数据失败');
        console.error('加载患者数据失败:', error);
      } finally {
        loading.value = false;
      }
    };

    // 获取患者报告
    const fetchReports = async () => {
      loading.value = true;
      try {
        const response = await api.patient.findReportsByID(2);
        
        // 处理不同的响应格式可能性
        let reportsData = [];
        if (response && response.data) {
          reportsData = response.data;
        } else if (response && Array.isArray(response)) {
          reportsData = response;
        }
        
        reports.value = reportsData;
        
        if (reportsData.length > 0) {
          selectedReport.value = reportsData[0]; // 默认选择第一份报告
          predictionInfo.value = selectedReport.value.prediction || {};
          imageName.value = "ad-ill.png";
        }
      } catch (error) {
        ElMessage.error('加载报告数据失败');
        console.error('加载报告数据失败:', error);
      } finally {
        loading.value = false;
      }
    };

    // 处理报告选择
    const handleSelectReport = (report) => {
      selectedReport.value = report;
      predictionInfo.value = report.prediction || {};
    };

    onMounted(() => {
      fetchPatient();
      fetchReports();
    });

    return {
      imageName,
      patientName,
      patient,
      reports,
      selectedReport,
      predictionInfo,
      handleSelectReport,
      loading,
    };
  },
};
</script>

<style scoped>
.patient-detail {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  color: #303133;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  padding: 10px;
}
</style>