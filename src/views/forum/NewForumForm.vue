<script setup lang="ts">
import { ref } from 'vue';
import api from '@/services/api/apiClient';

const emit = defineEmits(['forumCreated']);
const title = ref('');
const comment = ref('');


const clearForm = () => {
  title.value = '';
  comment.value = '';
};

const submitForum = async () => {
  try {
    await api.post('/forum', {
      title: title.value,
      comment: comment.value,
    });
    clearForm();
    emit('forumCreated');
  } catch (err) {
    console.error('Error al enviar la pregunta', err);
  }
};
</script>


<template>
  <form @submit.prevent="submitForum" class="space-y-4 bg-[var(--color-light)] dark:bg-[var(--color-dark-2)] p-4 rounded-lg shadow">
    <div>
      <label class="block text-[var(--color-pt)] dark:text-[var(--color-pt-light)] font-semibold">{{ $t('forum.title') }}</label>
      <input
        v-model="title"
        type="text"
        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
        required
      />
    </div>
    <div>
      <label class="block text-[var(--color-pt)] dark:text-[var(--color-pt-light)] font-semibold">{{ $t('forum.comment') }}</label>
      <textarea
        v-model="comment"
        class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
        required
      ></textarea>
    </div>
    <div class="flex justify-end gap-2">
      <button type="button" @click="clearForm" class="px-4 py-2 bg-[#888] dark:bg-[#555] text-light dark:text-light rounded hover:bg-[#777] hover:dark:bg-[#444] font-[400] tracking-[1px] cursor-pointer active:opacity-80">
        {{ $t('common.cancel') }}
      </button>
      <button type="submit" class="px-4 py-2 bg-osur-dark dark:bg-osur text-light dark:text-osur-dark rounded hover:bg-osur-2-dark hover:dark:bg-osur-2 font-[400] tracking-[1px] cursor-pointer active:opacity-80">
        {{ $t('common.send') }}
      </button>
    </div>
  </form>
</template>

