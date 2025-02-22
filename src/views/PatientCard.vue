<template>
  <el-card class="patient-card" shadow="hover">
    <div class="header">
      <el-icon><User /></el-icon>
      <h2>患者信息</h2>
    </div>
    <div class="image-container">
      <img :src="imageUrl" alt="OTC Image" v-if="imageUrl" />
      <p v-else>加载中...</p>
    </div>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="姓名">{{ patient.name }}</el-descriptions-item>
      <el-descriptions-item label="年龄">{{ patient.age }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{ patient.gender }}</el-descriptions-item>
      <el-descriptions-item label="报告状态">{{ reportStatus }}</el-descriptions-item>
    </el-descriptions>
    <el-button type="primary" @click="loadRandomPatient" class="switch-button">切换病人</el-button>
  </el-card>
</template>

<script>
import {User} from '@element-plus/icons-vue';
import axios from 'axios';

export default {
  data() {
    return {
      patient: {
        id: null,
        name: '',
        age: null,
        gender: '',
      },
      report: {
        image_path: '',
        report_status: 0,
      },
      imageUrl: '',
      reportStatusMap: {
        0: '未开始',
        1: '生成中',
        2: '生成异常',
      },
      patientIds: [1, 2], // 病人 ID 数组
    };
  },
  computed: {
    reportStatus() {
      return this.reportStatusMap[this.report.report_status] || this.report.report_status;
    },
  },
  methods: {
    getRandomPatientId() {
      const randomIndex = Math.floor(Math.random() * this.patientIds.length);
      return this.patientIds[randomIndex];
    },
    async loadPatientData(patientId) {
      try {
        const patientResponse = await axios.get(`http://183.6.97.121:9088/ad/api/GetPatient/${patientId}/`);
        this.patient = patientResponse.data;

        const reportsResponse = await axios.get(`http://183.6.97.121:9088/ad/api/FindReportsByID/${patientId}/`);
        if (reportsResponse.data.length > 0) {
          this.report = reportsResponse.data[0];
          this.loadImage(this.report.image_path);
        }
      } catch (error) {
        console.error('加载数据失败:', error);
      }
    },
    async loadImage(imagePath) {
      imagePath = "ad-ill.png";
      if (imagePath) {
        try {
          const response = await axios.get(`http://183.6.97.121:9088/ad/api/GetImage/${imagePath}/`, {
            responseType: 'blob',
          });
          this.imageUrl = URL.createObjectURL(response.data);
        } catch (error) {
          console.error('加载图像失败:', error);
        }
      }
    },
    loadRandomPatient() {
      const patientId = this.getRandomPatientId();
      this.loadPatientData(patientId);
    },
  },
  mounted() {
    this.loadPatientData(1);
  },
  components: {
    User,
  },
};
</script>

<style scoped>
.patient-card {
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
  color: #67c23a;
}

.image-container {
  text-align: center;
  margin-bottom: 16px;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.switch-button {
  margin-top: 16px;
  width: 100%;
}
</style>