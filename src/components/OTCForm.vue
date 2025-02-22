<template>
  <el-card class="otc-form" shadow="hover">
    <div class="header">
      <el-icon><Edit /></el-icon>
      <h2>OCT 表单</h2>
    </div>
    <el-upload
        class="upload-demo"
        drag
        action="http://localhost:8080/UploadImage/"
        multiple
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖到此处或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">jpg/png 文件，大小不超过 500kb</div>
      </template>
    </el-upload>
    <el-form :model="form" :rules="rules" ref="formRef" class="demo-form">
      <el-form-item label="医生姓名" prop="doctor_name">
        <el-input v-model="form.doctor_name" placeholder="请输入医生姓名" />
      </el-form-item>
      <el-form-item label="患者姓名" prop="patient_name">
        <el-input v-model="form.patient_name" placeholder="请输入患者姓名" />
      </el-form-item>
      <el-form-item label="患者编号" prop="patient_id">
        <el-input v-model="form.patient_id" placeholder="请输入患者编号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { Edit, UploadFilled } from '@element-plus/icons-vue';
import {ref} from "vue";

export default {
  components: {
    Edit,
    'upload-filled': UploadFilled,
  },
  setup() {
    const formRef = ref(null);
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

    const handleUploadSuccess = (response, file, fileList) => {
      console.log('文件列表:',file, fileList);
    };

    const handleUploadError = (error, file, fileList) => {
      console.log('文件列表:',file, fileList);
    };

    const submitForm = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          fetch('http://183.6.97.121:9088/ad/api/AddReport/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form.value),
          })
              .then((response) => response.json())
              .then((data) => {
                console.log('提交成功:', data);
                alert('提交成功');
              })
              .catch((error) => {
                console.error('提交失败:', error);
                alert('提交失败，请稍后重试');
              });
        } else {
          console.log('表单验证失败');
        }
      });
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      formRef,
      form,
      rules,
      handleUploadSuccess,
      handleUploadError,
      submitForm,
      resetForm,
    };
  },
};
</script>

<style scoped>
.otc-form {
  margin-top: 50px;
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
  color: #f56c6c;
}

.upload-demo {
  margin-bottom: 20px;
}

.demo-form {
  max-width: 500px;
  margin: 0 auto;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  margin-right: 10px;
}
</style>