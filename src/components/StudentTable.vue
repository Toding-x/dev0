<script setup>
defineProps({
  students: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="overflow-x-auto">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="flex items-center gap-3 text-muted-foreground">
        <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>加载中...</span>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else-if="students.length === 0" class="flex flex-col items-center justify-center py-12">
      <div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <p class="text-muted-foreground text-sm">暂无学生数据</p>
    </div>

    <!-- 表格 -->
    <table v-else class="w-full">
      <thead>
        <tr class="border-b border-border">
          <th class="text-left py-3 px-4 text-sm font-medium text-muted-foreground">姓名</th>
          <th class="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">年龄</th>
          <th class="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">性别</th>
          <th class="text-left py-3 px-4 text-sm font-medium text-muted-foreground">专业</th>
          <th class="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">邮箱</th>
          <th class="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden xl:table-cell">入学日期</th>
          <th class="text-right py-3 px-4 text-sm font-medium text-muted-foreground">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="student in students"
          :key="student.id"
          class="border-b border-border/50 hover:bg-muted/50 transition-colors"
        >
          <td class="py-4 px-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span class="text-sm font-medium text-primary">{{ student.name.charAt(0) }}</span>
              </div>
              <div>
                <p class="font-medium text-foreground">{{ student.name }}</p>
                <p class="text-xs text-muted-foreground sm:hidden">{{ student.age }}岁</p>
              </div>
            </div>
          </td>
          <td class="py-4 px-4 text-foreground hidden sm:table-cell">{{ student.age }}岁</td>
          <td class="py-4 px-4 hidden md:table-cell">
            <span
              class="badge"
              :class="student.gender === '男' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'"
            >
              {{ student.gender }}
            </span>
          </td>
          <td class="py-4 px-4 text-foreground">{{ student.major }}</td>
          <td class="py-4 px-4 text-muted-foreground hidden lg:table-cell">{{ student.email }}</td>
          <td class="py-4 px-4 text-muted-foreground hidden xl:table-cell">{{ student.enrollmentDate }}</td>
          <td class="py-4 px-4">
            <div class="flex items-center justify-end gap-2">
              <button
                @click="emit('edit', student)"
                class="btn btn-ghost p-2"
                title="编辑"
              >
                <svg class="w-4 h-4 text-muted-foreground hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click="emit('delete', student)"
                class="btn btn-ghost p-2"
                title="删除"
              >
                <svg class="w-4 h-4 text-muted-foreground hover:text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
