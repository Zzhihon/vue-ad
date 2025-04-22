<template>
  <div class="ad-card bg-white dark:bg-gray-800 rounded-xl shadow-card p-4 mb-6">
    <div class="ad-card-header flex items-center mb-4 space-x-2">
      <el-icon class="text-primary-600 mr-2 text-lg"><Edit /></el-icon>
      <h2 class="text-lg font-medium text-gray-900 dark:text-white m-0 text-error">OCT 表单</h2>
    </div>
    
    <el-upload
        class="w-full mb-6"
        drag
        :http-request="customUpload"
        multiple
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
    >
      <div class="p-6 flex flex-col items-center">
        <el-icon class="text-3xl mb-3 text-gray-500"><upload-filled /></el-icon>
        <div class="text-gray-600 dark:text-gray-300">将文件拖到此处或<em class="text-primary-600 font-medium">点击上传</em></div>
        <p class="text-xs text-gray-500 mt-2">jpg/png 文件，大小不超过 500kb</p>
      </div>
    </el-upload>
    
    <el-form :model="form" :rules="rules" ref="formRef" class="max-w-lg mx-auto">
      <el-form-item label="医生姓名" prop="doctor_name">
        <el-input v-model="form.doctor_name" placeholder="请输入医生姓名" />
      </el-form-item>
      <el-form-item label="患者姓名" prop="patient_name">
        <el-input v-model="form.patient_name" placeholder="请输入患者姓名" />
      </el-form-item>
      <el-form-item label="患者编号" prop="patient_id">
        <el-input v-model="form.patient_id" placeholder="请输入患者编号" />
      </el-form-item>
      <el-form-item class="flex justify-center space-x-4 mt-8">
        <el-button type="primary" @click="submitForm" :loading="loading" class="ad-btn-primary">提交</el-button>
        <el-button @click="resetForm" class="border-gray-300 hover:border-gray-400">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Edit, UploadFilled } from '@element-plus/icons-vue';
import { ref } from "vue";
import { ElMessage } from 'element-plus';
import api from '@/api';

export default {
  components: {
    Edit,
    'upload-filled': UploadFilled,
  },
  setup() {
    const formRef = ref(null);
    const loading = ref(false);
    const form = ref({
      doctor_name: '',
      patient_name: '',
      patient_id: '',
    });

    const rules = {
      doctor_name: [{ required: true, message: '请输入医生姓名', trigger: 'blur' }],
      patient_name: [{ required: true, message: '请输入患者姓名', trigger: 'blur' }],
      patient_id: [{ required: true, message: '请输入患者编号', trigger: 'blur' }],
    };

    // 自定义上传函数，替换action属性
    const customUpload = async (options) => {
      const { file, onSuccess, onError } = options;
      
      // 创建FormData对象
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        // 使用我们的API模块发送请求
        const response = await api.report.uploadImage(formData);
        
        // 成功回调
        onSuccess(response);
        handleUploadSuccess(response, file);
      } catch (error) {
        // 错误回调
        onError(error);
        handleUploadError(error, file);
      }
    };

    const handleUploadSuccess = (response, file) => {
      ElMessage.success('文件上传成功');
      console.log('文件上传成功:', response, file);
    };

    const handleUploadError = (error, file) => {
      ElMessage.error('文件上传失败');
      console.error('文件上传失败:', error, file);
    };

    const submitForm = async () => {
      if (!formRef.value) return;
      
      formRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true;
          try {
            const response = await api.report.addReport(form.value);
            console.log('提交成功:', response);
            ElMessage.success('提交成功');
            resetForm();
          } catch (error) {
            console.error('提交失败:', error);
            ElMessage.error('提交失败，请稍后重试');
          } finally {
            loading.value = false;
          }
        } else {
          console.log('表单验证失败');
          ElMessage.warning('请完成表单填写');
        }
      });
    };

    const resetForm = () => {
      if (formRef.value) {
        formRef.value.resetFields();
      }
    };

    return {
      formRef,
      form,
      rules,
      loading,
      customUpload,
      handleUploadSuccess,
      handleUploadError,
      submitForm,
      resetForm,
    };
  },
};
</script>

<style>
/* 添加Tailwind风格的样式 */
.ad-btn-primary {
  @apply bg-primary-600 hover:bg-primary-700 border-primary-600 text-white;
}

@media (max-width: 768px) {
  .ad-card {
    @apply p-3 mb-4;
  }
}
</style>