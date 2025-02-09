<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" ><div class="grid-content ep-bg-purple" />
        <div><DoctorProfile :doctor="doctor"/></div>
        <el-row :gutter="20">
          <el-col :span="12" ><div class="grid-content ep-bg-purple" />
            <ImageShow/>
          </el-col>

          <el-col :span="12" ><div class="grid-content ep-bg-purple" />
            <ImageShow/>
          </el-col>
        </el-row>>
      </el-col>


      <el-col :span="12" >
        <div class="grid-content ep-bg-purple" />
        <div class="patientProfile"><PatientProfile/></div>
        <div class="otcForm">
          <OTCForm/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>



<script>
import DoctorProfile from "@/components/DoctorProfile.vue";
import PatientProfile from "@/components/PatientProfile.vue";
import OTCForm from "@/components/OTCForm.vue";
import ImageShow from "@/components/ImageShow.vue";
import {reactive} from "vue";

export default {
  name: 'HomeView',
  components: {PatientProfile, DoctorProfile, OTCForm, ImageShow},
  setup() {
    const info = "张文宏主要研究疑难感染性疾病与肝病的诊断与治疗，包括发热待查、疑难感染性疾病的病因诊断、疑难肝病的病因诊断、慢性病毒性肝炎的长期治疗与临床治愈，以及结核性脑膜炎与耐药结核等疑难结核病的诊治等"
    const doctor = reactive({
      id: 1,
      name: "张文宏",
      info: info,
    });

    return {
      doctor,
    }
  }
}

</script>

<style scoped>
.otcForm {
  margin-top: 50px;
}
</style>