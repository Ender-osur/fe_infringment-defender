<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  message: string;
  isUser: boolean;
  timestamp: Date;
  isRatingMessage?: boolean;
  ratingQualification?: number;
}>();

const { t } = useI18n();
</script>

<template>
  <div :class="['flex mb-4', isUser ? 'justify-end' : 'justify-start']">
    <div
      :class="[
        'max-w-full rounded-lg px-4 py-2',
        isUser
          ? 'dark:text-user-chat-light text-user-chat-dark dark:bg-black bg-white'
          : props.isRatingMessage
            ? 'bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200'
            : 'dark:text-bot-chat-light text-bot-chat-dark',
      ]"
    >
      <p class="text-sm md:text-base break-words">
        {{ props.isRatingMessage ? t(message) : message }}
      </p>
      
      <!-- Mostrar calificación con estrellas cuando es un mensaje de calificación -->
      <div v-if="props.isRatingMessage && props.ratingQualification" class="flex items-center mt-2 mb-1">
        <div class="flex space-x-1">
          <span 
            v-for="star in 5" 
            :key="star"
            class="text-xl"
            :class="star <= (props.ratingQualification || 0) ? 'text-yellow-400' : 'text-gray-300'"
          >
            ★
          </span>
        </div>
        <span class="ml-2 text-sm font-medium">{{ props.ratingQualification }}/5</span>
      </div>
      
      <span class="text-xs opacity-70">{{ new Date(timestamp).toLocaleTimeString() }}</span>
    </div>
  </div>
</template>
