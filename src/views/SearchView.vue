<template>
  <el-card class="search-card">
    <!-- 搜索条件表单 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <!-- 关键词输入 -->
      <el-form-item label="关键词">
        <el-input v-model="searchForm.keyword" placeholder="请输入患者姓名"></el-input>
      </el-form-item>

      <!-- 性别选择 -->
      <el-form-item label="性别">
        <el-select v-model="searchForm.gender" placeholder="请选择性别">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
        </el-select>
      </el-form-item>

      <!-- 年龄选择 -->
      <el-form-item label="年龄">
        <el-select v-model="searchForm.age" placeholder="请选择年龄">
          <el-option label="56-60" value="56-60"></el-option>
          <el-option label="61-65" value="61-65"></el-option>
          <el-option label="66-70" value="66-70"></el-option>
          <el-option label="71及以上" value="71+"></el-option>
        </el-select>
      </el-form-item>

      <!-- OCT图像状态选择 -->
      <el-form-item label="OCT图像">
        <el-select v-model="searchForm.octImage" placeholder="请选择OCT图像状态">
          <el-option label="已上传" value="uploaded"></el-option>
          <el-option label="未上传" value="not-uploaded"></el-option>
        </el-select>
      </el-form-item>

      <!-- 报告状态选择 -->
      <el-form-item label="报告状态">
        <el-select v-model="searchForm.reportStatus" placeholder="请选择报告状态">
          <el-option label="未开始" value="not-started"></el-option>
          <el-option label="生成中" value="generating"></el-option>
          <el-option label="生成异常" value="error"></el-option>
          <el-option label="待生成" value="pending"></el-option>
        </el-select>
      </el-form-item>

      <!-- 日期选择 -->
      <el-form-item label="日期">
        <el-date-picker
            v-model="searchForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <!-- 搜索和重置按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 展示用户选择的条件 -->
    <el-card class="selected-conditions-card" v-if="hasSelectedConditions">
      <div class="selected-conditions">
        <span class="condition-label">已选条件：</span>
        <el-tag v-if="searchForm.keyword" closable @close="clearCondition('keyword')">
          关键词：{{ searchForm.keyword }}
        </el-tag>
        <el-tag v-if="searchForm.gender" closable @close="clearCondition('gender')">
          性别：{{ searchForm.gender === 'male' ? '男' : '女' }}
        </el-tag>
        <el-tag v-if="searchForm.age" closable @close="clearCondition('age')">
          年龄：{{ searchForm.age }}
        </el-tag>
        <el-tag v-if="searchForm.octImage" closable @close="clearCondition('octImage')">
          OCT图像：{{ searchForm.octImage === 'uploaded' ? '已上传' : '未上传' }}
        </el-tag>
        <el-tag v-if="searchForm.reportStatus" closable @close="clearCondition('reportStatus')">
          报告状态：{{ formatReportStatus(searchForm.reportStatus) }}
        </el-tag>
        <el-tag v-if="searchForm.date" closable @close="clearCondition('date')">
          日期：{{ formatDateRange(searchForm.date) }}
        </el-tag>
      </div>
    </el-card>

    <!-- 搜索结果表格 -->
    <el-table :data="searchResults" class="result-table" v-if="searchResults.length > 0">
      <el-table-column prop="patientName" label="患者姓名"></el-table-column>
      <el-table-column prop="doctorName" label="医生姓名"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="octImageStatus" label="OCT图像状态"></el-table-column>
      <el-table-column prop="reportStatus" label="报告状态"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'SearchView',
  setup() {
    // 搜索表单数据
    const searchForm = ref({
      keyword: '',
      gender: '',
      age: '',
      octImage: '',
      reportStatus: '',
      date: '',
    });

    // 搜索结果数据
    const searchResults = ref([]);

    // 判断是否有选中的条件
    const hasSelectedConditions = computed(() => {
      return (
          searchForm.value.keyword ||
          searchForm.value.gender ||
          searchForm.value.age ||
          searchForm.value.octImage ||
          searchForm.value.reportStatus ||
          searchForm.value.date
      );
    });

    // 搜索逻辑
    const onSearch = () => {
      console.log('搜索条件:', searchForm.value);
      // 模拟搜索结果
      searchResults.value = [
        {
          patientName: '张三',
          doctorName: '李医生',
          gender: '男',
          age: '58',
          octImageStatus: '已上传',
          reportStatus: '生成中',
          date: '2023-10-01',
        },
        {
          patientName: '李四',
          doctorName: '王医生',
          gender: '女',
          age: '62',
          octImageStatus: '未上传',
          reportStatus: '未开始',
          date: '2023-10-02',
        },
      ];
    };

    // 重置逻辑
    const onReset = () => {
      searchForm.value = {
        keyword: '',
        gender: '',
        age: '',
        octImage: '',
        reportStatus: '',
        date: '',
      };
      searchResults.value = [];
    };

    // 清除单个条件
    const clearCondition = (field) => {
      searchForm.value[field] = '';
    };

    // 格式化报告状态
    const formatReportStatus = (status) => {
      const statusMap = {
        'not-started': '未开始',
        generating: '生成中',
        error: '生成异常',
        pending: '待生成',
      };
      return statusMap[status] || status;
    };

    // 格式化日期范围
    const formatDateRange = (dateRange) => {
      if (!dateRange || dateRange.length !== 2) return '';
      const [start, end] = dateRange;
      return `${start.toLocaleDateString()} 至 ${end.toLocaleDateString()}`;
    };

    return {
      searchForm,
      searchResults,
      hasSelectedConditions,
      onSearch,
      onReset,
      clearCondition,
      formatReportStatus,
      formatDateRange,
    };
  },
};
</script>

<style scoped>
.search-card {
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.demo-form-inline {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.selected-conditions-card {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.selected-conditions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.condition-label {
  font-weight: bold;
  margin-right: 10px;
}

.result-table {
  margin-top: 20px;
}
</style>