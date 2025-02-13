<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="id" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="gender" label="Gender" width="120" />
    <el-table-column prop="age" label="Age" width="120" />
<!--    <el-table-column prop="address" label="Address" width="600" />-->
<!--    <el-table-column prop="zip" label="Zip" width="120" />-->
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick">
          Detail
        </el-button>
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>

import {computed} from "vue";

export default {
  props: {
    patients: {
      type: Array,
      required: true,
    }
  },


  setup(props) {


    const handleClick = () => {
      console.log('click');
    }

    const tableData = computed(() => props.patients);

    console.log("表单组件输出: " + JSON.stringify(props.patients));


    return {
      handleClick,
      tableData
    };
  }
}
</script>

