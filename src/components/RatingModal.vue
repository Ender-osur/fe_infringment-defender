<script setup lang="ts">
import { ref } from 'vue';
import FormInput from './FormInput.vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  isOpen: boolean;
}>();
const emit = defineEmits(['close', 'submit']);
const qualification = ref(0);
const comment = ref('');
const handleSubmit = () => {
  console.log("log in rating modal");
  emit('submit', { qualification: qualification.value, comment: comment.value });
  qualification.value = 0;
  comment.value = '';
};
const handleClose = () => {
  emit('close');
};
</script>
<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-surface-dark rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4 text-dark dark:text-light">Rate your experience</h2>
        
        <!-- Rating Stars -->
        <div class="flex space-x-2 mb-4">
          <button
            v-for="i in 5"
            :key="i"
            @click="qualification = i"
            class="text-2xl"
            :class="i <= qualification ? 'text-yellow-400' : 'text-gray-300'"
          >
            ★
          </button>
        </div>
        <!-- Comment Input -->
        <FormInput
          v-model="comment"
          label="Comment"
          type="textarea"
          placeholder="Share your thoughts..."
        />
        <!-- Action Buttons -->
        <div class="flex justify-end space-x-2 mt-4">
          <button
            @click="handleClose"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Cancel
          </button>
          <button
            @click="handleSubmit"
            class="px-4 py-2 bg-osur-dark text-white rounded-lg hover:bg-osur-2-dark dark:bg-osur dark:text-black"
            :disabled="!qualification"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>