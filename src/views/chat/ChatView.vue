<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useChat } from '@/composables/chatView/useChat';

import ChatMessages from '@/components/ChatMessages.vue';
import ChatInput from '@/components/ChatInput.vue';

const { messages, handleSend, handleHistory} = useChat();
const selectedConversationId = ref<string | null>(null);
const responseConversation = ref();

const selectConversation = async (id: string) => {
  selectedConversationId.value = id;
};
/*/ Array de prueba para simular conversaciones
const responseConversation = ref([
  {
    id: '1',
    title: 'Conversación 1',
    messages: [
      { id: 'm1', text: 'Hola, ¿cómo estás?', isUser: true, timestamp: new Date() },
      { id: 'm2', text: '¡Hola! Estoy bien, gracias. ¿Y tú?', isUser: false, timestamp: new Date() },
    ],
  },
  {
    id: '2',
    title: 'Conversación 2',
    messages: [
      { id: 'm3', text: '¿Qué tal el proyecto?', isUser: true, timestamp: new Date() },
      { id: 'm4', text: 'Va muy bien, gracias por preguntar.', isUser: false, timestamp: new Date() },
    ],
  },
]);*/

onMounted(() => {
  responseConversation.value = handleHistory(); // Load initial conversations
});
</script>

<template>
  <div class="flex flex-row h-screen bg-light dark:bg-dark overflow-hidden">
    <!-- Sidebar: Conversation List -->
    <aside class="w-1/2 bg-gray-100 dark:bg-gray-800 overflow-y-auto">
      <header class="p-4 bg-white dark:bg-gray-900 shadow">
        <h2 class="text-lg font-bold">{{ $t('conversation.list') }}</h2>
      </header>
      <div class="p-4 space-y-2">
        <div
          v-for="conversation in responseConversation.value"
          :key="conversation.id"
          class="p-2 bg-white dark:bg-gray-700 rounded shadow cursor-pointer"
          @click="selectConversation(conversation.id)"
        >
          {{ conversation.title }}
        </div>
      </div>
    </aside>

    <!-- Main Chat Area -->
    <div class="flex flex-col w-1/2">
      <!-- Chat Header -->
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
      <main
        class="flex-1 overflow-y-auto px-4 py-2 w-full max-w-screen-sm mx-auto"
        @scroll="(e) => {
          if (e.target.scrollTop === 0) {
            handleHistory();
          }
        }"
      >
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
  </div>
</template>

<style scoped>
.chat-header {
  box-shadow: 10px 10px 40px -28px #aaa;
}
.chat-header.dark {
  box-shadow: 10px 10px 40px -28px #000;
}
.chat-input {
  box-shadow: 0px -10px 15px -20px #aaa;
}
.chat-input.dark {
  box-shadow: 0px -10px 15px -20px #000;
}
</style>