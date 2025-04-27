<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import AuthService from '../../services/AuthService'
import FormInput from '../../components/FormInput.vue'
import { useNotification } from '../../composables/useNotification'

const { t } = useI18n()
const router = useRouter()
const { showNotification } = useNotification()

// Form data
const formData = ref({
  email: ''
})

// Loading and success states
const isLoading = ref(false)
const resetError = ref('')
const resetSent = ref(false)

// Form validation rules
const rules = computed(() => ({
  email: {
    required: helpers.withMessage(t('validation.required'), required),
    email: helpers.withMessage(t('validation.email'), email)
  }
}))

const v$ = useVuelidate(rules, formData)

// Form submission
const handleSubmit = async () => {
  resetError.value = ''

  // Validate form
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) return

  try {
    isLoading.value = true

    // Send password reset request
    await AuthService.forgotPassword(formData.value.email)

    // Show success state
    resetSent.value = true
    showNotification(t('messages.resetLinkSent'), 'success')
  } catch (error) {
    console.error('Password reset error:', error)
    resetError.value = t('messages.resetLinkSent') // Show same message for security
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="form-card">
      <div>
        <h2 class="form-title">{{ t('form.forgotPassword') }}</h2>
        <p class="form-subtitle">
          <router-link to="/login" class="text-primary-600 hover:text-primary-500">
            {{ t('form.backToLogin') }}
          </router-link>
        </p>
      </div>

      <template v-if="!resetSent">
        <form @submit.prevent="handleSubmit" class="space-y-6 mt-6">
          <!-- Alert for error -->
          <transition name="fade">
            <div v-if="resetError" class="p-3 text-sm bg-error-100 text-error-600 rounded-md">
              {{ resetError }}
            </div>
          </transition>

          <!-- Email input -->
          <FormInput
            v-model="formData.email"
            :label="t('form.email')"
            type="email"
            :error="v$.email.$errors[0]?.$message"
            :touched="v$.email.$dirty"
            @blur="v$.email.$touch()"
          />

          <!-- Send reset link button -->
          <button
            type="submit"
            class="btn-primary w-full"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ t('form.sendResetLink') }}...
            </span>
            <span v-else>{{ t('form.sendResetLink') }}</span>
          </button>
        </form>
      </template>

      <!-- Success message -->
      <div v-else class="mt-6 text-center">
        <div class="rounded-full bg-success-100 p-3 mx-auto w-16 h-16 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p class="mt-4 text-gray-700 dark:text-gray-300">{{ t('messages.resetLinkSent') }}</p>
        <button @click="router.push('/login')" class="btn-secondary mt-6 w-full">
          {{ t('form.backToLogin') }}
        </button>
      </div>
    </div>
  </div>
</template>
