<template>
    <div
      class="min-h-screen flex flex-col bg-gradient-to-br from-[#2F54EB] to-[#1D39C4] dark:from-gray-800 dark:to-gray-900"
    >
      <!-- 顶部栏 -->
      <TheTopBar />
  
      <!-- 用户信息区 -->
      <div class="flex-none px-6 pb-6">
        <div class="text-white">
          <div class="flex items-center space-x-3 mb-2">
            <div class="size-12 rounded-full bg-white/20 flex items-center justify-center">
              <UserCircleIcon class="size-10 text-white" />
            </div>
            <div>
              <h2 class="text-xl font-medium">Hi, {{ displayName }}</h2>
              <p class="text-sm text-white/80">{{ $t('欢迎使用考勤系统') }}</p>
            </div>
          </div>
          <div class="flex items-center text-sm text-white/80 pl-1">
            <AcademicCapIcon class="size-4 mr-1.5" />
            <span class="truncate">{{ displayGrade }} · {{ displayClass }}</span>
          </div>
        </div>
      </div>
  
      <!-- 主要内容区 -->
      <main class="flex-1 mt-6 flex flex-col">
        <div class="bg-[#F5F5F5] dark:bg-gray-900 rounded-t-[2rem] flex-1 px-6 pt-8 pb-24">
          <!-- 快捷操作区 -->
          <div class="grid grid-cols-4 gap-x-4 gap-y-6 mb-8">
            <router-link
              v-for="action in actions"
              :key="action.title"
              :to="action.route"
              class="flex flex-col items-center"
            >
              <div
                :class="[
                  'size-14 rounded-full flex items-center justify-center shadow-sm',
                  action.color
                ]"
              >
                <component :is="action.icon" class="size-7 text-white" />
              </div>
              <span class="mt-2 text-sm text-gray-900 dark:text-white text-center">{{
                action.title
              }}</span>
            </router-link>
          </div>
  
          <!-- 通知公告区 -->
          <section>
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-[15px] font-medium text-gray-900 dark:text-white">
                {{ $t('通知公告') }}
              </h2>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm space-y-4">
              <!-- 版本更新通知 -->
              <template v-if="hasUpdate && updateInfo">
                <router-link
                  to="/settings/about"
                  class="group flex items-center text-gray-500 dark:text-gray-400 hover:text-[#2F54EB] dark:hover:text-blue-400"
                >
                  <ArrowDownTrayIcon class="size-5 mr-2 text-[#2F54EB]" />
                  <span>{{ $t('发现新版本 {slot1}，点击更新', { slot1: updateInfo.version }) }}</span>
                  <ChevronRightIcon
                    class="size-4 ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </router-link>
              </template>
  
              <!-- 进行中考勤通知 -->
              <template
                v-if="
                  (roleService.isTeacher() || roleService.isAdmin() || roleService.isSuperAdmin()) &&
                  activeAttendanceCount > 0
                "
              >
                <router-link
                  to="/attendance/class"
                  class="group flex items-center text-gray-500 dark:text-gray-400 hover:text-[#2F54EB] dark:hover:text-blue-400"
                >
                  <ClockIcon class="size-5 mr-2 text-[#2F54EB]" />
                  <span>{{
                    $t('当前有 {slot1} 个考勤正在进行中', { slot1: activeAttendanceCount })
                  }}</span>
                  <ChevronRightIcon
                    class="size-4 ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </router-link>
              </template>
  
              <!-- 缺勤通知 -->
              <template
                v-if="
                  roleService.isStudent() && featureStore.isLeaveFeatureEnabled && absentCount > 0
                "
              >
                <router-link
                  to="/leave"
                  class="group flex items-center text-gray-500 dark:text-gray-400 hover:text-[#2F54EB] dark:hover:text-blue-400"
                >
                  <ExclamationCircleIcon class="size-5 mr-2 text-[#FF7373]" />
                  <span>{{ $t('当前有 {slot1} 次缺勤，去销假', { slot1: absentCount }) }}</span>
                  <ChevronRightIcon
                    class="size-4 ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </router-link>
              </template>
  
              <!-- 请假审批通知 -->
              <template
                v-if="
                  roleService.isSuperAdmin() &&
                  featureStore.isLeaveFeatureEnabled &&
                  pendingLeaveCount > 0
                "
              >
                <router-link
                  to="/admin/leave-approval"
                  class="group flex items-center text-gray-500 dark:text-gray-400 hover:text-[#2F54EB] dark:hover:text-blue-400"
                >
                  <DocumentTextIcon class="size-5 mr-2 text-[#2F54EB]" />
                  <span>{{
                    $t('当前有 {slot1} 条请假申请，去处理', { slot1: pendingLeaveCount })
                  }}</span>
                  <ChevronRightIcon
                    class="size-4 ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </router-link>
              </template>
  
              <!-- 无通知提示 -->
              <template
                v-if="
                  !hasUpdate &&
                  (!roleService.isStudent() ||
                    !featureStore.isLeaveFeatureEnabled ||
                    absentCount === 0) &&
                  (!roleService.isSuperAdmin() ||
                    !featureStore.isLeaveFeatureEnabled ||
                    pendingLeaveCount === 0) &&
                  (!(
                    roleService.isTeacher() ||
                    roleService.isAdmin() ||
                    roleService.isSuperAdmin()
                  ) ||
                    activeAttendanceCount === 0)
                "
              >
                <p class="text-gray-500 dark:text-gray-400 text-sm">
                  {{ $t('暂无通知') }}
                </p>
              </template>
            </div>
          </section>
        </div>
      </main>
  
      <!-- 底部导航栏 -->
      <TheBottomBar />
    </div>
  </template>
  <script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import TheBottomBar from '@/components/TheBottomBar.vue'
  import TheTopBar from '@/components/TheTopBar.vue'
  import { BaseRole } from '@/types/role'
  import {
    BellIcon,
    AcademicCapIcon,
    ClipboardIcon,
    PencilSquareIcon
  } from '@heroicons/vue/24/outline'
  import {
    UserCircleIcon,
    DocumentTextIcon,
    CalendarIcon,
    Cog6ToothIcon,
    ChevronRightIcon,
    ClockIcon,
    ArrowDownTrayIcon,
    ClipboardDocumentCheckIcon,
    UserGroupIcon,
    ExclamationCircleIcon,
    InformationCircleIcon
  } from '@heroicons/vue/24/solid'
  import { useUserInfo } from '@/composables/useUserInfo'
  import { roleService } from '@/services/roleService'
  import { useVersion } from '@/services/versionService'
  import { useRouter } from 'vue-router'
  import { attendanceApi } from '@/api/attendance'
  import { useFeatureStore } from '@/stores/featureFlags'
  import { logger } from '@/utils/logger'
  import { leaveApi } from '@/api/leave'
  import type { LeaveRequestDetail } from '@/types'
  
  const { t, locale } = useI18n()
  const { userInfo, isAdmin, isSuperAdmin } = useUserInfo()
  const router = useRouter()
  const featureStore = useFeatureStore()
  
  // 添加版本检查相关
  const { updateInfo, hasUpdate, checkForUpdates } = useVersion()
  
  // 状态定义
  const absentCount = ref(0)
  const pendingLeaveCount = ref(0)
  const leaveRequests = ref<LeaveRequestDetail[]>([])
  const activeAttendanceCount = ref(0)
  
  // 切换语言
  const toggleLocale = () => {
    locale.value = locale.value === 'zh' ? 'en' : 'zh'
  }
  
  // 在组件挂载时获取数据
  onMounted(async () => {
    await checkVersion()
  
    // 获取进行中的考勤任务数量
    if (roleService.isTeacher() || roleService.isAdmin() || roleService.isSuperAdmin()) {
      try {
        const response = await attendanceApi.getAllTasks({
          page: 1
        })
        if (response.tasks) {
          activeAttendanceCount.value = response.tasks.filter((task) => {
            const now = new Date()
            const endTime = new Date(task.endTime)
            return now < endTime
          }).length
        }
      } catch (error) {
        logger.error('获取考勤任务列表失败:', error)
      }
    }
  
    // 如果是学生，获取缺勤记录和请假申请
    if (roleService.isStudent() && userInfo.value?.username) {
      try {
        // 获取缺勤记录
        const attendanceResponse = await attendanceApi.getPersonalAttendance({
          username: userInfo.value.username,
          startDate: '',
          endDate: ''
        })
  
        // 获取请假申请
        const leaveResponse = await leaveApi.getMyLeaveRequests({
          userID: userInfo.value.username,
          startDate: '',
          endDate: ''
        })
  
        if (attendanceResponse && leaveResponse.code === 0) {
          const absentRecords = attendanceResponse.allRecords
            .filter((record) => record.attendanceStatus.toUpperCase() === 'NOTSI')
            .map((record) => ({
              ...record,
              recordID: parseInt(record.recordID),
              taskID: parseInt(record.taskID)
            }))
  
          leaveRequests.value = leaveResponse.data
  
          // 计算未申请请假的缺勤数量
          absentCount.value = absentRecords.filter((record) => {
            return !leaveRequests.value.some(
              (leave) => leave.taskID?.toString() === record.taskID.toString()
            )
          }).length
        }
      } catch (error) {
        logger.error('获取考勤记录失败:', error)
      }
    }
  
    // 如果是超级管理员，获取待审批的请假申请数量
    if (roleService.isSuperAdmin() && featureStore.isLeaveFeatureEnabled) {
      try {
        const response = await leaveApi.getPendingLeaveRequests()
        pendingLeaveCount.value = response.pendingLeave.length
      } catch (error) {
        logger.error('获取待审批请假数量失败:', error)
      }
    }
  })
  
  // 用户显示信息（带兜底）
  const displayName = computed(() => {
    if (!userInfo.value?.name) return t('未登录用户')
    const suffix = userInfo.value.role !== '学生' ? t('老师') : t('同学')
    return `${userInfo.value.name}${suffix}`
  })
  const displayGrade = computed(() =>
    userInfo.value?.grade ? t('{slot1}级', { slot1: userInfo.value.grade }) : t('未知年级')
  )
  const displayClass = computed(() => userInfo.value?.major_class || t('未知班级'))
  
  // 功能按钮数据
  const actions = computed(() => {
    const items = []
  
    // 学生功能
    if (roleService.isStudent()) {
      items.push({
        title: t('我的考勤'),
        icon: ClipboardIcon,
        route: '/attendance/my',
        color: 'bg-[#2F54EB]'
      })
  
      if (featureStore.isLeaveFeatureEnabled) {
        items.push({
          title: t('请假申请'),
          icon: DocumentTextIcon,
          route: '/leave',
          color: 'bg-[#52C41A]'
        })
      }
  
      // 为学生添加个人信息和系统设置
      items.push({
        title: t('个人信息'),
        icon: UserCircleIcon,
        route: '/settings/profile',
        color: 'bg-[#8C8C8C]'
      })
  
      items.push({
        title: t('系统设置'),
        icon: Cog6ToothIcon,
        route: '/settings/system',
        color: 'bg-[#595959]'
      })
  
      return items.slice(0, 4)
    }
  
    // 教师功能（包括教师管理员和超级管理员）
    if (roleService.isTeacher() || roleService.isAdmin() || roleService.isSuperAdmin()) {
      items.push(
        {
          title: t('发布考勤'),
          icon: PencilSquareIcon,
          route: '/attendance/publish',
          color: 'bg-[#1890FF]'
        },
        {
          title: t('班级考勤'),
          icon: UserGroupIcon,
          route: '/attendance/class',
          color: 'bg-[#096DD9]'
        }
      )
    }
  
    // 管理员功能
    if (roleService.isAdmin() || roleService.isSuperAdmin()) {
      items.push({
        title: t('教学班管理'),
        icon: UserGroupIcon,
        route: '/admin/class',
        color: 'bg-[#722ED1]'
      })
    }
  
    // 对于管理员用户，添加管理功能入口作为第4个图标
    if ((roleService.isAdmin() || roleService.isSuperAdmin()) && items.length >= 3) {
      items.push({
        title: t('管理功能'),
        icon: Cog6ToothIcon,
        route: '/admin',
        color: 'bg-[#722ED1]'
      })
    }
  
    // 如果不足4个，补充通用功能
    if (items.length < 4) {
      const remainingItems = [
        {
          title: t('个人信息'),
          icon: UserCircleIcon,
          route: '/settings/profile',
          color: 'bg-[#8C8C8C]'
        },
        {
          title: t('系统设置'),
          icon: Cog6ToothIcon,
          route: '/settings/system',
          color: 'bg-[#595959]'
        }
      ]
  
      for (const item of remainingItems) {
        if (items.length < 4 && !items.some((existing) => existing.route === item.route)) {
          items.push(item)
        }
      }
    }
  
    // 确保只返回前4个图标
    return items.slice(0, 4)
  })
  
  const checkVersion = async () => {
    await checkForUpdates(true)
  }
  </script>
  