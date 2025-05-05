<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  currentConversationId: number | null;
  isRated?: boolean;
}>();

const { t } = useI18n();

const message = ref<string>('');
const messageInput = ref<HTMLTextAreaElement | null>(null);
const showScrollbar = ref(false);
const textareaHeight = ref('40px');

const autoResize = () => {
  const el = messageInput.value;
  if (!el) return;

  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;

  showScrollbar.value = el.scrollHeight > 256;
};

watch(message, () => {
  autoResize();
});

const emit = defineEmits<{
  (e: 'send', message: string): void;
  (e: 'endChat', conversationId: number): void;
}>();

const sendMessage = () => {
  // No permitir enviar mensajes si la conversación ha sido calificada
  if (props.isRated) return;
  
  const trimmed = message.value.trim();
  if (!trimmed) {
    messageInput.value?.focus();
    return;
  }
  emit('send', trimmed);
  message.value = '';
  textareaHeight.value = '40px';
};

const handleEndChat = () => {
  if (props.currentConversationId !== null) {
    emit('endChat', props.currentConversationId);
  }
};
</script>

<template>
  <div class="flex w-full h-full items-center px-8 py-2 gap-2 bg-white dark:bg-surface-dark">
    <!-- Textarea -->
    <div class="flex-1 h-full items-center flex">
      <textarea
        v-model="message"
        ref="messageInput"
        rows="1"
        :placeholder="t('chat.placeholder')"
        @keyup.enter.exact.prevent="sendMessage"
        :autoresize="true"
        @input="autoResize"
        :maxlength="250"
        :disabled="props.isRated"
        :class="[
          'w-full resize-none max-h-[16rem] px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-osur-dark focus:dark:border-osur dark:bg-hover-dark dark:text-pti-light text-pti-dark',
          showScrollbar ? 'overflow-y-auto' : 'overflow-hidden',
          props.isRated ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800' : ''
        ]"
        :style="{ height: textareaHeight }"
      />
    </div>

    <!-- Botones -->
    <div class="flex items-center gap-2 h-full">
      <!-- Botón enviar -->
      <button
        @click="sendMessage"
        class="transition-color active:opacity-80 duration-50 h-full max-h-12 px-6 rounded-lg font-bold tracking-wide cursor-pointer bg-osur-dark text-osur dark:bg-osur dark:text-osur-dark hover:opacity-70"
        :disabled="props.isRated"
        :class="{'opacity-50 cursor-not-allowed': props.isRated}"
      >
        {{ t('chat.send') }}
      </button>

      <button
        @click="handleEndChat"
        class="transition-color active:opacity-80 duration-50 h-full max-h-12 px-6 rounded-lg font-bold tracking-wide cursor-pointer bg-osur-dark text-osur dark:bg-osur dark:text-osur-dark hover:opacity-70"
        :disabled="props.isRated"
        :class="{'opacity-50 cursor-not-allowed': props.isRated}"
      >
        {{ t('chat.endChat') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
