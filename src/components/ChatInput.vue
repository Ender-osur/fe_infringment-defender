<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const message = ref<string>('');
const messageInput = ref<HTMLTextAreaElement | null>(null);
const showScrollbar = ref(false);
const textareaHeight = ref('40px');

const languages = [
  'English', // Inglés
  'Español', // Español
  'Français', // Francés
  'Deutsch', // Alemán
  'Italiano', // Italiano
  'Português', // Portugués
  'Русский', // Ruso
  '中文', // Chino (chino simplificado)
  '日本語', // Japonés
  'العربية', // Árabe
  '한국어', // Coreano
];

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
}>();

const sendMessage = () => {
  const trimmed = message.value.trim();
  if (!trimmed) {
    messageInput.value?.focus();
    return;
  }
  emit('send', trimmed);
  message.value = '';
  textareaHeight.value = '40px';
};

const verHistorial = () => {
  console.log('Ver historial');
};

const open = ref(false);
const selected = ref<string | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  open.value = !open.value;
};

const select = (lang: string) => {
  selected.value = lang;
  open.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
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
        :class="[
          'w-full resize-none max-h-[16rem] px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-osur-dark focus:dark:border-osur dark:bg-hover-dark dark:text-pti-light text-pti-dark',
          showScrollbar ? 'overflow-y-auto' : 'overflow-hidden',
        ]"
        :style="{ height: textareaHeight }"
      />
    </div>

    <!-- Dropdown + Botón -->
    <div class="flex items-center gap-0 h-full">
      <!-- Dropdown -->
      <div
        ref="dropdownRef"
        class="relative w-36 h-full max-h-12 transition-color active:opacity-80 duration-50"
      >
        <button
          @click="toggleDropdown"
          class="border-2 border-r-0 border-osur-dark relative w-full font-bold justify-center items-center flex h-full text-left bg-osur text-osur-dark dark:bg-osur-dark dark:text-osur rounded-l-lg cursor-pointer"
        >
          {{ selected || $t('chat.lang') }}
        </button>

        <ul
          v-if="open"
          class="absolute bottom-full mb-2 w-full bg-osur text-osur-dark dark:bg-osur-dark dark:text-osur rounded-xl shadow-lg max-h-60 overflow-y-auto z-10"
        >
          <li
            v-for="lang in languages"
            :key="lang"
            @click="select(lang)"
            class="px-4 py-2 cursor-pointer hover:bg-osur-hover dark:hover:bg-osur-dark-hover"
          >
            {{ lang }}
          </li>
        </ul>
      </div>

      <!-- Botón enviar -->
      <button
        @click="sendMessage"
        class="border-2 border-l-0 border-osur transition-color active:opacity-80 duration-50 w-20 h-full max-h-12 px-3 rounded-r-lg font-bold tracking-wide cursor-pointer bg-osur-dark text-osur dark:bg-osur dark:text-osur-dark hover:opacity-70"
      >
        {{ t('chat.send') }}
      </button>
      <!-- Botón enviar -->
      <button
        @click="verHistorial"
        class="border-2 border-l-0 border-osur transition-color active:opacity-80 duration-50 w-20 h-full max-h-12 px-3 rounded-r-lg font-bold tracking-wide cursor-pointer bg-osur-dark text-osur dark:bg-osur dark:text-osur-dark hover:opacity-70"
      >
        {{ t('history.record') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
