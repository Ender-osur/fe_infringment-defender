<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import AuthService from '../../services/AuthService'
import FormInput from '../../components/FormInput.vue'
import { useNotification } from '../../composables/useNotification';

const { t } = useI18n()
const router = useRouter()
const { showNotification } = useNotification()

// Form data
const formData = ref({
  email: '',
  password: '',
  rememberMe: false
})

// Loading state
const isLoading = ref(false)
const loginError = ref('')

// Form validation rules
const rules = computed(() => ({
  email: {
    required: helpers.withMessage(t('validation.required'), required),
    email: helpers.withMessage(t('validation.email'), email)
  },
  password: {
    required: helpers.withMessage(t('validation.required'), required)
  }
}))

const v$ = useVuelidate(rules, formData)

// Form submission
const handleSubmit = async () => {
  loginError.value = ''

  // Validate form
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) return

  try {
    isLoading.value = true

    // Attempt login
    const response = await AuthService.login({
      email: formData.value.email,
      password: formData.value.password,
      rememberMe: formData.value.rememberMe
    })

    // Store authentication token
    localStorage.setItem('token', response.token)

    // Show success notification
    showNotification(t('messages.loginSuccess'), 'success')

    // Redirect to dashboard
    router.push('/')
  } catch (error) {
    console.error('Login error:', error)
    loginError.value = t('messages.loginFailed')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-light dark:bg-dark">
    <div class="form-card bg-light-2 dark:bg-dark-2 p-8 rounded-lg shadow-md w-full max-w-md">
      <div>
        <h2 class="form-title text-pt dark:text-light text-2xl font-bold mb-2" style="font-family: var(--font-sans);">
          {{ t('form.login') }}
        </h2>
        <p class="form-subtitle text-subtext dark:text-subtext-dark text-sm mb-6" style="font-family: var(--font-sans);">
          {{ t('form.dontHaveAccount') }}
          <router-link to="/register" >
            <span  class="text-osur-dark dark:text-osur hover:text-osur-hover">
              {{ t('form.createAccount') }}
            </span>
          </router-link>
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Alert for error -->
        <transition name="fade">
          <div v-if="loginError" class="p-3 text-sm bg-error text-white rounded-md">
            {{ loginError }}
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

        <!-- Password input -->
        <FormInput
          v-model="formData.password"
          :label="t('form.password')"
          type="password"
          :error="v$.password.$errors[0]?.$message"
          :touched="v$.password.$dirty"
          @blur="v$.password.$touch()"
        />

        <!-- Remember me & Forgot password -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="formData.rememberMe"
              type="checkbox"
              class="h-4 w-4 text-osur focus:ring-osur-hover border-light-2 rounded dark:border-dark-3"
            >
            <label for="remember-me" class="ml-2 block text-sm text-pt dark:text-pt-light" style="font-family: var(--font-sans);">
              {{ t('form.rememberMe') }}
            </label>
          </div>

          <router-link to="/forgot-password" class="text-sm text-osur hover:text-osur-hover">
            {{ t('form.forgotPassword') }}
          </router-link>
        </div>

        <!-- Login button -->
        <button
          type="submit"
          class="w-full py-2 px-4 border tracking-[2px] border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white dark:text-black dark:bg-osur bg-osur-dark hover:bg-osur-2-dark hover:dark:bg-osur-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-osur-dark focus:dark:ring-osur disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isLoading"
          style="font-family: var(--font-sans);"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ t('form.login') }}...
          </span>
          <span v-else>{{ t('form.login') }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

