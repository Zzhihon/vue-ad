<template>
  <div class="mb-4">
    <el-button
        v-for="button in buttons"
        :key="button.text"
        :type="button.type"
        text
        bg
    >
      {{ button.text }}
    </el-button>
  </div>

</template>

<script>
export default {
  name: "ButtonBase",
  data() {
    return {
      buttons: [

        { type: 'info', text: 'submit' },
      ]
    }
  }
}
</script>

<style scoped>
.mb-4 {
  margin-top: 15px;
}
</style>
