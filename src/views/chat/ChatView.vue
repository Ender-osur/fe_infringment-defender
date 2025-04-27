<script setup lang="ts">
import { useChat } from '@/composables/chatView/useChat';

import ChatMessages from '@/components/ChatMessages.vue';
import ChatInput from '@/components/ChatInput.vue';

const { messages, handleSend } = useChat();
</script>

<template>
  <div class="flex flex-col h-screen bg-light dark:bg-dark overflow-hidden items-center">
    <!-- Header -->
    <header class="chat-header shrink-0 bg-white dark:bg-surface-dark flex items-center w-full justify-center">
      <div class="cabecera h-15 flex gap-4 items-center px-4 py-2 w-full max-w-screen-sm">
        <div class="avatar w-11 h-11 overflow-hidden bg-white rounded-full">
          <img class="w-full h-full object-cover" src="/bot.png" alt="Esta imagen es el avatar" />
        </div>
        <div class="dark:text-pt-light text-pt text-center">
          <span>{{ $t('chat.header') }}</span>
        </div>
      </div>
    </header>

    <!-- Chat Messages -->
    <main class="flex-1 overflow-y-auto px-4 py-2 w-full max-w-screen-sm mx-auto">
      <div class="space-y-2 w-full">
        <ChatMessages
          v-for="message in messages"
          :key="message.id"
          :message="message.text"
          :is-user="message.isUser"
          :timestamp="message.timestamp"
        />
      </div>
    </main>

    <!-- Chat Input -->
    <div class="chat-input w-full max-w-screen-sm shrink-0 px-4 py-3 bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700">
      <ChatInput @send="handleSend" />
    </div>
  </div>
</template>



<style scoped>

.cabecera {
  padding-left: 8px;
}

.chat-body {
  padding: 0.5rem 1rem 0 1rem;
}

.cabecera .avatar {
  padding: 2px;
}

.chat-header.dark {
  box-shadow: 10px 10px 40px -28px #000;
}
.chat-header {
  box-shadow: 10px 10px 40px -28px #aaa;
}
.chat-input.dark {
  box-shadow: 0px -10px 15px -20px #000;
}
.chat-input {
  box-shadow: 0px -10px 15px -20px #aaa;
}
</style>
