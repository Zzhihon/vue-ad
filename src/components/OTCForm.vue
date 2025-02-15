<template>
  <ContentBase>
    <el-card class="box-card">
      <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8080/ImageUpload/"
          multiple
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
    </el-card>

    <el-form :model="form" :rules="rules" ref="formRef" class="demo-form">
      <el-form-item label="医生姓名" prop="doctor_name">
        <el-input v-model="form.doctor_name" placeholder="请输入医生姓名"></el-input>
      </el-form-item>

      <el-form-item label="患者姓名" prop="patient_name">
        <el-input v-model="form.patient_name" placeholder="请输入患者姓名"></el-input>
      </el-form-item>

      <el-form-item label="患者身份" prop="patient_name">
        <el-input v-model="form.patient_id" placeholder="请输入患者身份号"></el-input>
      </el-form-item>



      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </ContentBase>
</template>

<script>
import { UploadFilled } from '@element-plus/icons-vue';
import ContentBase from './ContentBase.vue';
import { ref } from 'vue';

export default {
  components: {
    ContentBase,
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
      doctor_name: [
        { required: true, message: '请输入医生姓名', trigger: 'blur' },
      ],
      patient_name: [
        { required: true, message: '请输入患者姓名', trigger: 'blur' },
      ],
      patient_id: [
        { required: true, message: '请输入患者身份号', trigger: 'blur' },
      ],
    };

    // 文件上传成功回调
    const handleUploadSuccess = (response, file, fileList) => {
      console.log('文件上传成功:', file);
      console.log('服务器返回的响应:', response);
      console.log('当前文件列表:', fileList);
    };

    // 文件上传失败回调
    const handleUploadError = (error, file, fileList) => {
      console.error('文件上传失败:', error);
      console.log('上传失败的文件:', file);
      console.log('当前文件列表:', fileList);
    };
    console.log('表单数据:', form.value);

    // 提交表单
    const submitForm = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          // 打印表单数据，确保接收到了表单信息
          console.log('表单数据:', form.value);

          // 使用 fetch 发送 AJAX 请求
          fetch('http://localhost:8080/AddReport/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form.value),
          })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error('请求失败');
                }
              })
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
          return false;
        }
      });
    };

    // 重置表单
    const resetForm = () => {
      formRef.value.resetFields();
      console.log('表单已重置');
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
.box-card {
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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