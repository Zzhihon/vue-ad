<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" ><div class="grid-content ep-bg-purple" />
        <h1>患者档案: {{ patientName }}</h1>

        <!-- 患者信息模块 -->
        <PatientInfo :patient="patient" />        <el-row :gutter="20">
          <el-col :span="30" ><div class="grid-content ep-bg-purple" />

            <!-- 报告图像模块 -->
            <ReportImage :imageName="imageName" />
          </el-col>
        </el-row>
      </el-col>


      <el-col :span="12" >
        <div class="grid-content ep-bg-purple" />
        <div class="patientProfile">
          <!-- 报告信息模块 -->
          <ReportInfo :reports="reports" @select-report="handleSelectReport" />
        </div>
        <div class="otcForm">
          <!-- 预测信息模块 -->
          <PredictionInfo :prediction="predictionInfo" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
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

    // 获取患者信息
    const fetchPatient = async () => {
      const response = await fetch(`http://localhost:8080/GetPatient/1/`);
      const data = await response.json();
      patient.value = data;
    };

    // 获取患者报告
    const fetchReports = async () => {
      const response = await fetch(`http://localhost:8080/FindReportsByID/2/`);
      const data = await response.json();
      reports.value = data;
      selectedReport.value = data[0]; // 默认选择第一份报告
      predictionInfo.value = selectedReport.value.prediction
      imageName.value = "ad-ill.png"
    };

    // 处理报告选择
    const handleSelectReport = (report) => {
      selectedReport.value = report;
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
    };
  },
};
</script>