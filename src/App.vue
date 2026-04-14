<script setup>
import { ref, onMounted, computed } from 'vue'
import HeaderSection from './components/HeaderSection.vue'
import StatsCards from './components/StatsCards.vue'
import StudentTable from './components/StudentTable.vue'
import StudentModal from './components/StudentModal.vue'
import SearchBar from './components/SearchBar.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'

const students = ref([])
const isLoading = ref(false)
const showModal = ref(false)
const showConfirmDialog = ref(false)
const editingStudent = ref(null)
const studentToDelete = ref(null)
const searchQuery = ref('')
const notification = ref({ show: false, message: '', type: 'success' })

// 模拟数据存储
let studentData = [
  { id: 1, name: '张三', age: 20, gender: '男', major: '计算机科学', email: 'zhangsan@edu.cn', phone: '13800138001', enrollmentDate: '2023-09-01' },
  { id: 2, name: '李四', age: 21, gender: '女', major: '软件工程', email: 'lisi@edu.cn', phone: '13800138002', enrollmentDate: '2022-09-01' },
  { id: 3, name: '王五', age: 19, gender: '男', major: '数据科学', email: 'wangwu@edu.cn', phone: '13800138003', enrollmentDate: '2024-09-01' },
  { id: 4, name: '赵六', age: 22, gender: '女', major: '人工智能', email: 'zhaoliu@edu.cn', phone: '13800138004', enrollmentDate: '2021-09-01' },
  { id: 5, name: '孙七', age: 20, gender: '男', major: '网络安全', email: 'sunqi@edu.cn', phone: '13800138005', enrollmentDate: '2023-09-01' },
]
let nextId = 6

// 过滤后的学生列表
const filteredStudents = computed(() => {
  if (!searchQuery.value) return students.value
  const query = searchQuery.value.toLowerCase()
  return students.value.filter(student =>
    student.name.toLowerCase().includes(query) ||
    student.major.toLowerCase().includes(query) ||
    student.email.toLowerCase().includes(query)
  )
})

// 统计数据
const stats = computed(() => ({
  total: students.value.length,
  male: students.value.filter(s => s.gender === '男').length,
  female: students.value.filter(s => s.gender === '女').length,
  newThisYear: students.value.filter(s => s.enrollmentDate?.startsWith('2024')).length
}))

// 显示通知
const showNotification = (message, type = 'success') => {
  notification.value = { show: true, message, type }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

// 获取所有学生
const fetchStudents = async () => {
  isLoading.value = true
  try {
    // 模拟 API 调用: GET /api/students
    await new Promise(resolve => setTimeout(resolve, 300))
    students.value = [...studentData]
  } catch (error) {
    showNotification('获取学生列表失败', 'error')
  } finally {
    isLoading.value = false
  }
}

// 添加学生
const addStudent = async (student) => {
  try {
    // 模拟 API 调用: POST /api/students
    await new Promise(resolve => setTimeout(resolve, 300))
    const newStudent = { ...student, id: nextId++ }
    studentData.push(newStudent)
    await fetchStudents()
    showNotification('学生添加成功')
    showModal.value = false
  } catch (error) {
    showNotification('添加学生失败', 'error')
  }
}

// 更新学生
const updateStudent = async (student) => {
  try {
    // 模拟 API 调用: PUT /api/students/{id}
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = studentData.findIndex(s => s.id === student.id)
    if (index !== -1) {
      studentData[index] = { ...student }
    }
    await fetchStudents()
    showNotification('学生信息更新成功')
    showModal.value = false
    editingStudent.value = null
  } catch (error) {
    showNotification('更新学生信息失败', 'error')
  }
}

// 删除学生
const deleteStudent = async () => {
  if (!studentToDelete.value) return
  try {
    // 模拟 API 调用: DELETE /api/students/{id}
    await new Promise(resolve => setTimeout(resolve, 300))
    studentData = studentData.filter(s => s.id !== studentToDelete.value.id)
    await fetchStudents()
    showNotification('学生删除成功')
  } catch (error) {
    showNotification('删除学生失败', 'error')
  } finally {
    showConfirmDialog.value = false
    studentToDelete.value = null
  }
}

// 打开编辑模态框
const openEditModal = (student) => {
  editingStudent.value = { ...student }
  showModal.value = true
}

// 打开添加模态框
const openAddModal = () => {
  editingStudent.value = null
  showModal.value = true
}

// 打开删除确认对话框
const openDeleteDialog = (student) => {
  studentToDelete.value = student
  showConfirmDialog.value = true
}

// 提交表单
const handleSubmit = (student) => {
  if (editingStudent.value) {
    updateStudent(student)
  } else {
    addStudent(student)
  }
}

onMounted(() => {
  fetchStudents()
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- 通知提示 -->
    <Transition name="slide">
      <div
        v-if="notification.show"
        class="fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg"
        :class="notification.type === 'success' ? 'bg-accent text-accent-foreground' : 'bg-destructive text-destructive-foreground'"
      >
        {{ notification.message }}
      </div>
    </Transition>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 头部 -->
      <HeaderSection />

      <!-- 统计卡片 -->
      <StatsCards :stats="stats" />

      <!-- 主内容区域 -->
      <div class="card p-6">
        <!-- 搜索和操作栏 -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <SearchBar v-model="searchQuery" />
          <button
            @click="openAddModal"
            class="btn btn-primary"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            添加学生
          </button>
        </div>

        <!-- 学生表格 -->
        <StudentTable
          :students="filteredStudents"
          :is-loading="isLoading"
          @edit="openEditModal"
          @delete="openDeleteDialog"
        />
      </div>
    </div>

    <!-- 添加/编辑模态框 -->
    <StudentModal
      :show="showModal"
      :student="editingStudent"
      @close="showModal = false; editingStudent = null"
      @submit="handleSubmit"
    />

    <!-- 删除确认对话框 -->
    <ConfirmDialog
      :show="showConfirmDialog"
      title="确认删除"
      :message="`确定要删除学生「${studentToDelete?.name}」吗？此操作无法撤销。`"
      @confirm="deleteStudent"
      @cancel="showConfirmDialog = false; studentToDelete = null"
    />
  </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
