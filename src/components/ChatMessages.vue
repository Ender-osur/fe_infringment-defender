<script setup lang="ts">
defineProps<{
  message: string;
  isUser: boolean;
  timestamp: Date;
}>();
</script>

<template>
  <div :class="['flex mb-4', isUser ? 'justify-end' : 'justify-start']">
    <div
      :class="[
        'max-w-full rounded-lg px-4 py-2',
        isUser
          ? 'dark:text-user-chat-light text-user-chat-dark dark:bg-black bg-white'
          : 'dark:text-bot-chat-light text-bot-chat-dark',
      ]"
    >
      <p class="text-sm md:text-base break-words">{{ message }}</p>
      <span class="text-xs opacity-70">{{ new Date(timestamp).toLocaleTimeString() }}</span>
    </div>
  </div>
</template>
