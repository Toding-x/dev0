<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  student: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'submit'])

const formData = ref({
  name: '',
  age: '',
  gender: '男',
  major: '',
  email: '',
  phone: '',
  enrollmentDate: ''
})

const errors = ref({})

watch(() => props.show, (newVal) => {
  if (newVal) {
    if (props.student) {
      formData.value = { ...props.student }
    } else {
      formData.value = {
        name: '',
        age: '',
        gender: '男',
        major: '',
        email: '',
        phone: '',
        enrollmentDate: ''
      }
    }
    errors.value = {}
  }
})

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.name?.trim()) {
    errors.value.name = '请输入学生姓名'
  }
  
  if (!formData.value.age || formData.value.age < 1 || formData.value.age > 100) {
    errors.value.age = '请输入有效年龄 (1-100)'
  }
  
  if (!formData.value.major?.trim()) {
    errors.value.major = '请输入专业'
  }
  
  if (!formData.value.email?.trim()) {
    errors.value.email = '请输入邮箱'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = '请输入有效的邮箱格式'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', { ...formData.value, age: Number(formData.value.age) })
  }
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <!-- 背景遮罩 -->
      <div
        class="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        @click="handleClose"
      ></div>

      <!-- 模态框内容 -->
      <div class="relative bg-card rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <!-- 头部 -->
        <div class="flex items-center justify-between p-6 border-b border-border">
          <h2 class="text-xl font-semibold text-foreground">
            {{ student ? '编辑学生' : '添加学生' }}
          </h2>
          <button
            @click="handleClose"
            class="btn btn-ghost p-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 表单 -->
        <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
          <!-- 姓名 -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">
              姓名 <span class="text-destructive">*</span>
            </label>
            <input
              v-model="formData.name"
              type="text"
              placeholder="请输入学生姓名"
              class="input"
              :class="{ 'border-destructive focus:ring-destructive': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-destructive">{{ errors.name }}</p>
          </div>

          <!-- 年龄和性别 -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-foreground mb-1.5">
                年龄 <span class="text-destructive">*</span>
              </label>
              <input
                v-model="formData.age"
                type="number"
                min="1"
                max="100"
                placeholder="请输入年龄"
                class="input"
                :class="{ 'border-destructive focus:ring-destructive': errors.age }"
              />
              <p v-if="errors.age" class="mt-1 text-sm text-destructive">{{ errors.age }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-foreground mb-1.5">
                性别 <span class="text-destructive">*</span>
              </label>
              <select v-model="formData.gender" class="input">
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
          </div>

          <!-- 专业 -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">
              专业 <span class="text-destructive">*</span>
            </label>
            <input
              v-model="formData.major"
              type="text"
              placeholder="请输入专业"
              class="input"
              :class="{ 'border-destructive focus:ring-destructive': errors.major }"
            />
            <p v-if="errors.major" class="mt-1 text-sm text-destructive">{{ errors.major }}</p>
          </div>

          <!-- 邮箱 -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">
              邮箱 <span class="text-destructive">*</span>
            </label>
            <input
              v-model="formData.email"
              type="email"
              placeholder="请输入邮箱地址"
              class="input"
              :class="{ 'border-destructive focus:ring-destructive': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-destructive">{{ errors.email }}</p>
          </div>

          <!-- 电话 -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">电话</label>
            <input
              v-model="formData.phone"
              type="tel"
              placeholder="请输入电话号码"
              class="input"
            />
          </div>

          <!-- 入学日期 -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">入学日期</label>
            <input
              v-model="formData.enrollmentDate"
              type="date"
              class="input"
            />
          </div>

          <!-- 按钮 -->
          <div class="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              @click="handleClose"
              class="btn btn-outline"
            >
              取消
            </button>
            <button
              type="submit"
              class="btn btn-primary"
            >
              {{ student ? '保存更改' : '添加学生' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>
