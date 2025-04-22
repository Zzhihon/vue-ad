<template>
  <div class="home-view">
    <el-row :gutter="20">
      <el-col :span="12">
        <DoctorProfile :doctor="doctor" />
        <PatientCard />
      </el-col>
      <el-col :span="12">
        <PatientProfile :patients="patients" />
        <OTCForm />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DoctorProfile from "@/components/DoctorProfile.vue";
import PatientProfile from "@/components/PatientProfile.vue";
import PatientCard from "@/views/PatientCard.vue";
import OTCForm from "@/components/OTCForm.vue";
import { reactive, ref, onMounted } from "vue";
import { ElMessage } from 'element-plus';
import api from '@/api';

export default {
  components: {
    DoctorProfile,
    PatientProfile,
    PatientCard,
    OTCForm,
  },
  setup() {
    const doctor = reactive({
      name: "",
      address: "",
      contact: "",
      profession: "",
      description: "",
      email: "",
    });

    const patients = ref([]);
    const loading = ref(false);

    // 获取医生信息
    const fetchDoctorInfo = async () => {
      loading.value = true;
      try {
        const response = await api.doctor.getDoctor(1);
        
        // 处理不同的响应格式可能性
        const data = response.data || response;
        
        if (data) {
          doctor.name = data.name || '';
          doctor.address = data.address || '';
          doctor.contact = data.contact || '';
          doctor.profession = data.profession || '';
          doctor.description = data.description || '';
          doctor.email = data.email || '';
        }
      } catch (error) {
        ElMessage.error('获取医生信息失败');
        console.error('获取医生信息失败:', error);
      } finally {
        loading.value = false;
      }
    };

    // 获取患者列表
    const fetchPatients = async () => {
      loading.value = true;
      try {
        const response = await api.doctor.getPatients(1);
        
        // 处理不同的响应格式可能性
        patients.value = response.data || response || [];
      } catch (error) {
        ElMessage.error('获取患者列表失败');
        console.error('获取患者列表失败:', error);
      } finally {
        loading.value = false;
      }
    };

    // 在组件挂载时获取数据
    onMounted(() => {
      fetchDoctorInfo();
      fetchPatients();
    });

    return {
      doctor,
      patients,
      loading,
    };
  },
};
</script>

<style scoped>
.home-view {
  padding: 20px;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  padding: 10px;
}
</style>