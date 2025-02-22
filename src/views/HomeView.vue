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
import $ from "jquery";
import { reactive, ref } from "vue";

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
      contact:"",
      profession:"",
      description:"",
      email:"",
    });

    const patients = ref([]);

    $.ajax({
      url: 'http://183.6.97.121:9088/ad/api//GetDoctor/1/',
      type: 'GET',
      success(res) {
        doctor.name = res.name;
        doctor.address = res.address;
        doctor.contact = res.contact;
        doctor.profession = res.profession;
        doctor.description = res.description;
        doctor.email = res.email;
      },
    });

    $.ajax({
      url: 'http://183.6.97.121:9088/ad/api//GetPatients/1/',
      type: 'GET',
      success(res) {
        patients.value = res;
      },
    });

    return {
      doctor,
      patients,
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