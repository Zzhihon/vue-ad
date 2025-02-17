<template>
  <div class="patient-card">
    <!-- 图片展示区域 -->
    <div class="image-container">
      <img :src="imageUrl" alt="OTC Image" v-if="imageUrl" />
      <p v-else>加载中...</p>
    </div>

    <!-- 病人信息和报告状态 -->
    <div class="info-container">
      <h2>{{ patient.name }}</h2>
      <p>年龄: {{ patient.age }}</p>
      <p>性别: {{ patient.gender }}</p>
      <p>报告状态: {{ reportStatus }}</p>
    </div>

    <!-- 随机选择病人按钮 -->
    <button @click="loadRandomPatient">切换病人</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "PatientCard",
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
    // 计算属性：将 report_status 转换为状态码
    reportStatus() {
      return this.reportStatusMap[this.report.report_status] || this.report.report_status;
    },
  },
  methods: {
    // 随机选择一个病人 ID
    getRandomPatientId() {
      const randomIndex = Math.floor(Math.random() * this.patientIds.length);
      return this.patientIds[randomIndex];
    },
    // 加载病人信息和报告
    async loadPatientData(patientId) {
      try {
        // 获取病人信息
        const patientResponse = await axios.get(`http://localhost:8080/GetPatient/${patientId}/`);
        this.patient = patientResponse.data;

        // 获取病人的报告列表
        const reportsResponse = await axios.get(`http://localhost:8080/FindReportsByID/${patientId}/`);
        if (reportsResponse.data.length > 0) {
          // 默认使用第一份报告
          this.report = reportsResponse.data[0];
          // 获取 OTC 图像
          this.loadImage(this.report.image_path);
        }
      } catch (error) {
        console.error('加载数据失败:', error);
      }
    },
    // 加载 OTC 图像
    async loadImage(imagePath) {
      imagePath = "ad-ill.png"
      if (imagePath) {
        try {
          const response = await axios.get(`http://localhost:8080/GetImage/${imagePath}/`, {
            responseType: 'blob', // 获取二进制数据
          });
          this.imageUrl = URL.createObjectURL(response.data);
        } catch (error) {
          console.error('加载图像失败:', error);
        }
      }
    },
    // 随机选择病人并加载数据
    loadRandomPatient() {
      const patientId = this.getRandomPatientId();
      this.loadPatientData(patientId);
    },
  },
  mounted() {
    // 默认加载 1 号病人的数据
    this.loadPatientData(1);
  },
};
</script>

<style scoped>
.patient-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  max-width: 300px;
  margin: 16px;
}

.image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.info-container {
  margin-top: 16px;
}

button {
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>