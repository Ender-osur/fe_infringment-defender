<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useChat } from '@/composables/chatView/useChat';
import { useRating } from '@/composables/rating/useRating';
import ChatMessages from '@/components/ChatMessages.vue';
import ChatInput from '@/components/ChatInput.vue';
import RatingModal from '@/components/RatingModal.vue';

const { isModalOpen, openModal, closeModal, submitRating, setConversationId } = useRating();

const { messages, conversationsData, handleSend, handleHistory, handleMessage, selectedConversationId} = useChat();
const responseConversation = ref();

// Crear una propiedad computada para el ID de conversación
const currentConversationId = computed(() => selectedConversationId.value);

const selectConversation = async (id: string | number) => {
  localStorage.removeItem('currentPage');
  //.getItem('currentPage');
  selectedConversationId.value = Number(id);
  console.log("selectedConversationId.value :: ", selectedConversationId.value);
  messages.value = [];
  handleMessage(Number(id));
  console.log("conversation id: ", id);
};

onMounted(async () => {
  console.log("monta el componente ...");
  // Cargar historial de conversaciones
  responseConversation.value = handleHistory();
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
          v-for="conversation in conversationsData"
          :key="conversation.id"
          class="p-2 bg-white dark:bg-gray-700 rounded shadow cursor-pointer"
          @click="selectConversation(conversation.id)"
        >
          {{ conversation.text }}
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
        @scroll="(e: Event) => {
          const target = e.target as HTMLElement;
          if (target && target.scrollTop === 0) {
            handleMessage(currentConversationId);
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
        <button
        @click="() => {
            if (currentConversationId !== null) {
              setConversationId(currentConversationId);
            }
            openModal();
          }"
          class="ml-2 px-4 py-2 bg-osur-dark text-white rounded-lg hover:bg-osur-2-dark dark:bg-osur dark:text-black"
        >
          End Chat
        </button>
        <ChatInput @send="handleSend" />
     
      </div>
    </div>
  </div>

    
    <!-- Rating Modal -->
    <RatingModal
      :is-open="isModalOpen"
      :conversation-id="currentConversationId"
      @close="closeModal"
      @submit="submitRating"
    />
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