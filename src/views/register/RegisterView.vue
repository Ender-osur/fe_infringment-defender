<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers, sameAs } from '@vuelidate/validators';
import AuthService from '../../services/AuthService';
import FormInput from '../../components/FormInput.vue'
import { useNotification } from '../../composables/useNotification';

const { t } = useI18n();
const router = useRouter();
const { showNotification } = useNotification();

// Form data
const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

// Loading and error states
const isLoading = ref(false);
const registerError = ref('');

// Password strength validation
const hasUppercase = (value) => /[A-Z]/.test(value);
const hasLowercase = (value) => /[a-z]/.test(value);
const hasNumber = (value) => /[0-9]/.test(value);

const passwordRequirements = helpers.withMessage(
  t('validation.passwordRequirements'),
  (value) => hasUppercase(value) && hasLowercase(value) && hasNumber(value),
);

// Form validation rules
const rules = computed(() => ({
  name: {
    required: helpers.withMessage(t('validation.required'), required),
  },
  email: {
    required: helpers.withMessage(t('validation.required'), required),
    email: helpers.withMessage(t('validation.email'), email),
  },
  password: {
    required: helpers.withMessage(t('validation.required'), required),
    minLength: helpers.withMessage(t('validation.minLength', { min: 8 }), minLength(8)),
    passwordRequirements,
  },
  confirmPassword: {
    required: helpers.withMessage(t('validation.required'), required),
    sameAsPassword: helpers.withMessage(
      t('validation.passwordsMatch'),
      sameAs(computed(() => formData.value.password)),
    ),
  },
}));

const v$ = useVuelidate(rules, formData);

// Form submission
const handleSubmit = async () => {
  registerError.value = '';

  // Validate form
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) return;

  try {
    isLoading.value = true;

    // Attempt registration
    await AuthService.register({
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password,
    });

    // Show success notification
    showNotification(t('messages.registerSuccess'), 'success');

    // Redirect to login
    router.push('/login');
  } catch (error) {
    console.error('Registration error:', error);

    // Handle specific error for existing email
    if (error.response?.status === 409) {
      registerError.value = t('messages.emailExists');
    } else {
      registerError.value = t('messages.registerFailed');
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="form-card">
      <div>
        <h2 class="form-title">{{ t('form.register') }}</h2>
        <p class="form-subtitle">
          {{ t('form.alreadyHaveAccount') }}
          <router-link to="/login" class="text-black hover:text-primary">
            {{ t('form.signIn') }}
          </router-link>
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Alert for error -->
        <transition name="fade">
          <div v-if="registerError" class="p-3 text-sm bg-error-100 text-error-600 rounded-md">
            {{ registerError }}
          </div>
        </transition>

        <!-- Name input -->
        <FormInput
          v-model="formData.name"
          :label="t('form.name')"
          type="text"
          :error="v$.name.$errors[0]?.$message"
          :touched="v$.name.$dirty"
          @blur="v$.name.$touch()"
        />

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

        <!-- Confirm Password input -->
        <FormInput
          v-model="formData.confirmPassword"
          :label="t('form.confirmPassword')"
          type="password"
          :error="v$.confirmPassword.$errors[0]?.$message"
          :touched="v$.confirmPassword.$dirty"
          @blur="v$.confirmPassword.$touch()"
        />

        <!-- Register button -->
        <button type="submit" class="btn-primary w-full" :disabled="isLoading">
          <span v-if="isLoading" class="flex items-center justify-center">
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
            {{ t('form.register') }}...
          </span>
          <span v-else>{{ t('form.register') }}</span>
        </button>
      </form>
    </div>
  </div>
</template>
