<script setup lang="ts">
import { useNotification } from '../composables/useNotification'

const { notifications, removeNotification } = useNotification()
</script>

<template>
  <div class="fixed top-4 right-4 z-50 w-full max-w-sm space-y-2 pointer-events-none">
    <transition-group name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'rounded-lg shadow-md p-4 pointer-events-auto flex items-start justify-between',
          {
            'bg-success-100 text-success-800': notification.type === 'success',
            'bg-error-100 text-error-800': notification.type === 'error',
            'bg-primary-100 text-primary-800': notification.type === 'info',
            'bg-warning-100 text-warning-800': notification.type === 'warning'
          }
        ]"
      >
        <div class="flex items-center">
          <!-- Success icon -->
          <svg v-if="notification.type === 'success'" class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>

          <!-- Error icon -->
          <svg v-if="notification.type === 'error'" class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          <!-- Info icon -->
          <svg v-if="notification.type === 'info'" class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          <!-- Warning icon -->
          <svg v-if="notification.type === 'warning'" class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>

          <span>{{ notification.message }}</span>
        </div>

        <button
          @click="removeNotification(notification.id)"
          class="text-gray-500 hover:text-gray-800 transition-colors ml-2"
        >
          <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
