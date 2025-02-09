<template>
  <ContentBase>
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <span>Doctor Profile</span>
        </div>
      </template>
      <p :key="1" class="text item">{{doctor.id}}</p>
      <p :key="2" class="text item">{{doctor.name}}</p>
      <p :key="3" class="text item">{{doctor.info}}</p>


      <template #footer>Footer content</template>
    </el-card>
  </ContentBase>
</template>

<script>
import ContentBase from "./ContentBase.vue";
    export default {
      name: "DoctorProfile",
      components: {
        ContentBase,
      },
      props: {
        doctor: {
          type: Object,
          required: true,
        }
      }
    }
</script>

<style scoped>

</style>