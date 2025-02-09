<template>
  <ContentBase>

    <el-card class="box-card">
      <el-upload
          class="upload-demo"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
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

    <el-input class="input" v-model="input" style="width: 480px" placeholder="医生姓名" />
    <el-input class="input" v-model="input" style="width: 480px" placeholder="患者姓名" />

    <div class="demo-datetime-picker">
      <div class="block">
        <span class="demonstration">报告上传日期</span>
        <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="Select date and time"
        />
      </div>
    </div>
    <ButtonBase/>

  </ContentBase>
</template>

<script>
import { UploadFilled } from '@element-plus/icons-vue'
import ContentBase from './ContentBase.vue'
import ButtonBase from './ButtonBase.vue'
import {ref} from "vue";

export default {
  components: {
    ButtonBase,
    ContentBase,
    'upload-filled': UploadFilled
  },
  setup(){
    const input = ref('')
    return {
      input
    }
  }
}
</script>

<style scoped>
.input {
  align-items: start;
  margin-top: 16px;

}

.demo-datetime-picker {
  margin-top: 10px;
}


</style>