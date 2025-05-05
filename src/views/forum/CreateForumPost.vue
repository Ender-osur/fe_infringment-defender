<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers, maxLength } from '@vuelidate/validators';
import { useForum } from '@/composables/forum/useForum';
import FormInput from '@/components/FormInput.vue';

defineProps<{
  isModal?: boolean; // Si es true, se muestra como modal
}>();

const { t } = useI18n();
const emit = defineEmits(['postCreated', 'cancel']);
const { createForum, error: forumError } = useForum();

// Estado del formulario
const formData = ref({
  title: '',
  description: ''
});

const isSubmitting = ref(false);
const formError = ref('');

// Reglas de validación
const rules = computed(() => ({
  title: {
    required: helpers.withMessage(t('validation.required'), required),
    maxLength: helpers.withMessage(
      t('validation.maxLength', { max: 100 }),
      maxLength(100)
    )
  },
  description: {
    required: helpers.withMessage(t('validation.required'), required),
    maxLength: helpers.withMessage(
      t('validation.maxLength', { max: 2000 }),
      maxLength(2000)
    )
  }
}));

const v$ = useVuelidate(rules, formData);

// Limpiar formulario
const clearForm = () => {
  formData.value.title = '';
  formData.value.description = '';
  formError.value = '';
  v$.value.$reset();
};

// Enviar formulario
const submitForm = async () => {
  formError.value = '';

  const isFormValid = await v$.value.$validate();
  if (!isFormValid) return;

  isSubmitting.value = true;

  try {
    // Enviamos título y descripción al backend
    await createForum(formData.value.title, formData.value.description);
    clearForm();
    emit('postCreated');
  } catch (err) {
    console.error('Error al crear post:', err);
    formError.value = forumError.value || 'Error al crear el post. Inténtalo de nuevo.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div
    class="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-light dark:bg-dark"
    :class="{ 'fixed inset-0 z-50': isModal }"
  >
    <div class="form-card bg-light-2 dark:bg-dark-2 p-8 rounded-lg shadow-md w-full max-w-md">
      <div>
        <h2
          class="form-title text-pt dark:text-light text-2xl font-bold mb-2"
          style="font-family: var(--font-sans)"
        >
          {{ t('forum.createPost') }}
        </h2>
        <p
          class="form-subtitle text-subtext dark:text-subtext-dark text-sm mb-6"
          style="font-family: var(--font-sans)"
        >
          {{ t('forum.createPostSubtitle') || t('forum.createPost') }}
        </p>
      </div>

      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Alert for error -->
        <transition name="fade">
          <div v-if="formError" class="p-3 text-sm bg-error text-white rounded-md">
            {{ formError }}
          </div>
        </transition>

        <!-- Título -->
        <FormInput
          v-model="formData.title"
          :label="t('forum.title')"
          type="text"
          :placeholder="t('forum.titlePlaceholder')"
          :touched="v$.title.$dirty"
          :error="v$.title.$errors[0]?.$message as string"
          @blur="v$.title.$touch()"
        />

        <!-- Descripción -->
        <div>
          <label
            class="block text-sm font-medium text-dark dark:text-light mb-1"
            style="font-family: var(--font-sans)"
          >
            {{ t('forum.description') }}
          </label>
          <textarea
            v-model="formData.description"
            class="form-input p-2 text-dark dark:text-light w-full border-1 border-dark dark:border-light rounded-sm"
            :class="v$.description.$error ? 'border-error focus:ring-error' : 'border-gray-300 dark:border-gray-600'"
            :placeholder="t('forum.descriptionPlaceholder')"
            rows="6"
            @blur="v$.description.$touch()"
          ></textarea>
          <transition name="fade">
            <p v-if="v$.description.$error" class="error-message dark:text-subtext-dark text-subtext-2">
              {{ (v$.description.$errors[0]?.$message as string) }}
            </p>
          </transition>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {{ formData.description.length }}/2000
          </p>
        </div>

        <!-- Botones -->
        <div class="flex justify-between gap-3">
          <button
            type="button"
            @click="emit('cancel')"
            class="py-2 px-4 border tracking-[2px] border-gray-300 rounded-md shadow-sm text-sm font-medium cursor-pointer text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            style="font-family: var(--font-sans)"
          >
            {{ t('common.cancel') }}
          </button>
          <button
            type="submit"
            class="w-full py-2 px-4 border tracking-[2px] border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white dark:text-black dark:bg-osur bg-osur-dark hover:bg-osur-2-dark hover:dark:bg-osur-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-osur-dark focus:dark:ring-osur disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isSubmitting"
            style="font-family: var(--font-sans)"
          >
            <span v-if="isSubmitting" class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ t('forum.publishing') }}
            </span>
            <span v-else>{{ t('forum.publish') }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
