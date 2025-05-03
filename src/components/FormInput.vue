<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  error: {
    type: String,
    default: ''
  },
  touched: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'blur'])

const focused = ref(false)
const passwordVisible = ref(false)

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleBlur = (event) => {
  focused.value = false
  emit('blur', event)
}

const inputType = computed(() => {
  if (props.type !== 'password') return props.type
  return passwordVisible.value ? 'text' : 'password'
})

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

const hasError = computed(() => props.touched && props.error)

const inputClasses = computed(() => [
  'form-input p-2 text-dark dark:text-light w-full border-1 border-dark dark:border-light rounded-sm',
  hasError.value ? 'border-error focus:ring-error' : 'border-gray-300 dark:border-gray-600'
])
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-dark dark:text-light mb-1">
      {{ label }}
    </label>

    <div class="relative">
      <input
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :class="inputClasses"
        @input="updateValue"
        @focus="focused = true"
        @blur="handleBlur"
      />

      <!-- Password toggle button -->
      <button
        v-if="type === 'password'"
        type="button"
        @click="togglePasswordVisibility"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <svg v-if="passwordVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>
    </div>

    <!-- Error message -->
    <transition name="fade">
      <p v-if="hasError" class="error-message dark:text-subtext-dark text-subtext-2">
        {{ error }}
      </p>
    </transition>
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
