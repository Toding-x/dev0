<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '确认操作'
  },
  message: {
    type: String,
    default: '确定要执行此操作吗？'
  }
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Transition name="dialog">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <!-- 背景遮罩 -->
      <div
        class="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        @click="emit('cancel')"
      ></div>

      <!-- 对话框内容 -->
      <div class="relative bg-card rounded-xl shadow-xl w-full max-w-md p-6">
        <div class="flex items-start gap-4">
          <!-- 警告图标 -->
          <div class="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-foreground mb-2">{{ title }}</h3>
            <p class="text-muted-foreground text-sm">{{ message }}</p>
          </div>
        </div>

        <!-- 按钮 -->
        <div class="flex items-center justify-end gap-3 mt-6">
          <button
            @click="emit('cancel')"
            class="btn btn-outline"
          >
            取消
          </button>
          <button
            @click="emit('confirm')"
            class="btn btn-destructive"
          >
            确认删除
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.2s ease;
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
.dialog-enter-from .relative,
.dialog-leave-to .relative {
  transform: scale(0.95);
}
</style>
