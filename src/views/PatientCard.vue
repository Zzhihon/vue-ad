<template>
  <el-card class="patient-card" shadow="hover">
    <div class="header">
      <el-icon><User /></el-icon>
      <h2>患者信息</h2>
    </div>
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="4" animated />
    </div>
    <template v-else>
      <div class="image-container">
        <img :src="imageUrl" alt="OTC Image" v-if="imageUrl" />
        <p v-else>加载中...</p>
      </div>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="姓名">{{ patient?.name || '未知' }}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{ patient?.age || '未知' }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ patient?.gender || '未知' }}</el-descriptions-item>
        <el-descriptions-item label="报告状态">{{ reportStatus }}</el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" @click="loadRandomPatient" class="switch-button">切换病人</el-button>
    </template>
  </el-card>
</template>

<script>
import { User } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import api from '@/api';

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
      imageUrl: 'https://ad.primedigitaltech.com:9308/ad/api/GetImage/ad-ill.png/',
      loading: false,
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
      return this.reportStatusMap[this.report?.report_status] || '未知';
    },
  },
  methods: {
    getRandomPatientId() {
      const randomIndex = Math.floor(Math.random() * this.patientIds.length);
      return this.patientIds[randomIndex];
    },
    async loadPatientData(patientId) {
      this.loading = true;
      try {
        const patientResponse = await api.patient.getPatient(patientId);
        
        // 检查响应结构，适应可能的不同API响应格式
        if (patientResponse && patientResponse.data) {
          this.patient = patientResponse.data;
        } else if (patientResponse) {
          // 如果响应直接就是数据对象
          this.patient = patientResponse;
        } else {
          throw new Error('无效的患者数据响应');
        }

        const reportsResponse = await api.patient.findReportsByID(patientId);
        
        // 安全地处理报告数据
        if (reportsResponse && reportsResponse.data && reportsResponse.data.length > 0) {
          this.report = reportsResponse.data[0];
          if (this.report && this.report.image_path) {
            this.loadImage(this.report.image_path);
          }
        } else if (reportsResponse && Array.isArray(reportsResponse) && reportsResponse.length > 0) {
          // 处理直接返回数组的情况
          this.report = reportsResponse[0];
          if (this.report && this.report.image_path) {
            this.loadImage(this.report.image_path);
          }
        }
      } catch (error) {
        // 确保在错误情况下也有默认值
        this.patient = { id: null, name: '', age: null, gender: '' };
        this.report = { image_path: '', report_status: 0 };
        ElMessage.error('加载患者数据失败');
        console.error('加载数据失败:', error);
      } finally {
        this.loading = false;
      }
    },
    async loadImage(imagePath) {
      // 固定使用特定图片名称
      imagePath = "ad-ill.png";
      
      if (imagePath) {
        try {
          console.log("正在加载图片:", imagePath);
          
          // 直接使用更明确的响应处理方式
          const response = await api.patient.getImage(imagePath);
          console.log("图片响应:", response);
          
          // 检查响应是否包含数据
          if (response && response.data) {
            // 确保响应数据是 Blob 类型
            const blob = response.data instanceof Blob ? 
                         response.data : 
                         new Blob([response.data], { type: 'image/png' });
                         
            // 创建对象URL并赋值
            this.imageUrl = URL.createObjectURL(blob);
            console.log("图片URL已创建:", this.imageUrl);
          } else {
            console.error("图片响应无效:", response);
            throw new Error('图片响应数据为空');
          }
        } catch (error) {
          ElMessage.error('加载图像失败');
          console.error('加载图像失败:', error);
          // 设置一个默认图片或者占位图
          // this.imageUrl = require('@/assets/default-image.png');
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

.loading-container {
  padding: 20px 0;
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