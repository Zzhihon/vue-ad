<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" ><div class="grid-content ep-bg-purple" />
        <div><DoctorProfile :doctor="doctor"/></div>
        <el-row :gutter="20">
          <el-col :span="12" ><div class="grid-content ep-bg-purple" />
            <ImageShow/>
          </el-col>
        </el-row>
        <el-row :gutter="20">
        <el-col :span="12" ><div class="grid-content ep-bg-purple" />
            <ImageShow/>
          </el-col>
        </el-row>
      </el-col>


      <el-col :span="12" >
        <div class="grid-content ep-bg-purple" />
        <div class="patientProfile">
          <PatientProfile :patients="patients"/>
        </div>
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
import $ from "jquery";
import {reactive, ref, toRaw} from "vue";


export default {
  name: 'HomeView',

  components: {PatientProfile, DoctorProfile, OTCForm, ImageShow},

  setup() {
    const doctor = reactive({
      name: "",
      id: "",
      address: "",
    })
    // let user = ref({});
    $.ajax({
      url: 'http://localhost:8080/GetDoctor/1/',
      type: 'GET',
      success(res) {
        doctor.name = res.name;
        doctor.id = res.ID;
        doctor.address = res.address;
        console.log(toRaw(doctor));  // 使用 toRaw 打印原始对象
      }

    });

    const patients = ref([])

    $.ajax({
      url: 'http://localhost:8080/GetPatients/1/',
      type: 'GET',
      success(res) {
        patients.value = res
        console.log("父组件： " + JSON.stringify((patients.value)));  // 使用 toRaw 打印原始对象
      }

    });


    return {
      doctor,
      patients
    }
  }
}

</script>

<style scoped>
.otcForm {
  margin-top: 50px;
}
</style>