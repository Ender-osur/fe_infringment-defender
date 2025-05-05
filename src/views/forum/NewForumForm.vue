<script setup lang="ts">
import { ref } from 'vue';
import { useForum } from '@/composables/forum/useForum';

const emit = defineEmits(['forumCreated', 'cancel']);
const { createForum } = useForum();

const title = ref('');
const description = ref('');

const clearForm = () => {
  title.value = '';
  description.value = '';
};

const submitForum = async () => {
  try {
    await createForum(title.value, description.value);
    clearForm();
    emit('forumCreated');
  } catch (err) {
    console.error('Error al crear formulario', err);
  }
};
</script>

<template>
  <form
    @submit.prevent="submitForum"
    class="space-y-4 bg-light dark:bg-dark-2 p-4 rounded-lg shadow min-w-[35dvw]"
  >
    <div>
      <label class="block font-semibold text-pt dark:text-pt-light">{{ $t('forum.title') }}</label>
      <input
        v-model="title"
        type="text"
        class="w-full px-3 py-2 border rounded dark:border-light border-dark"
        required
      />
    </div>

    <div>
      <label class="block font-semibold text-pt dark:text-pt-light">{{ $t('forum.description') }}</label>
      <textarea
        v-model="description"
        class="w-full px-3 py-2 border rounded dark:border-light border-dark"
        required
      ></textarea>
    </div>

    <div class="flex justify-end gap-2">
      <button
        type="button"
        @click="emit('cancel')"
        class="px-4 py-2 bg-[#888] dark:bg-[#555] text-light rounded cursor-pointer"
      >
        {{ $t('common.cancel') }}
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-osur-dark dark:bg-osur text-light dark:text-dark rounded cursor-pointer"
      >
        {{ $t('common.send') }}
      </button>
    </div>
  </form>
</template>
