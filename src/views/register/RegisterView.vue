<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers, sameAs } from '@vuelidate/validators';
import { useRegister } from '@/composables/auth/useRegister';

import FormInput from '../../components/FormInput.vue';

const {isLoading, register, registerError} = useRegister();

const { t } = useI18n();
const router = useRouter();

// Form data
const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});



// Password strength validation
const hasUppercase = (value: string) => /[A-Z]/.test(value);
const hasLowercase = (value: string) => /[a-z]/.test(value);
const hasNumber = (value: string) => /[0-9]/.test(value);

const passwordRequirements = helpers.withMessage(
  t('validation.passwordRequirements'),
  (value: string) => hasUppercase(value) && hasLowercase(value) && hasNumber(value),
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
  console.log("name :: ", formData.value.name);

  // Validate form
  const isFormValid = await v$.value.$validate();
  if (!isFormValid) return;
  try{
  await register({
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password,
    });
    router.push('/home');
  } catch (error) {
    console.error('Registration error:', error);
    registerError.value = t('messages.registerFailed');
  } finally {
    isLoading.value = false;
  }
};

</script>

<template>
  <div class="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="form-card bg-light-2 dark:bg-dark-2 p-8 rounded-lg shadow-md w-full max-w-md">
      <div>
        <h2 class="form-title text-pt dark:text-light text-2xl font-bold mb-2">
          {{ t('form.register') }}
        </h2>
        <p class="form-subtitle text-subtext dark:text-subtext-dark text-sm mb-6">
          {{ t('form.alreadyHaveAccount') }}
          <router-link to="/login">
            <span class="text-osur-dark dark:text-osur hover:text-osur-hover">
              {{ t('form.signIn') }}
            </span>
          </router-link>
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Alert for error -->
        <transition name="fade">
          <div v-if="registerError" class="p-3 text-sm bg-error text-white rounded-md">
            {{ registerError }}
          </div>
        </transition>

        <!-- Name input -->
        <FormInput
          v-model="formData.name"
          :label="t('form.name')"
          type="text"
          :error="v$.name.$errors[0]?.$message?.toString() || ''"
          :touched="v$.name.$dirty"
          @blur="v$.name.$touch()"
        />

        <!-- Email input -->
        <FormInput
          v-model="formData.email"
          :label="t('form.email')"
          type="email"
          :error="v$.email.$errors[0]?.$message?.toString() || ''"
          :touched="v$.email.$dirty"
          @blur="v$.email.$touch()"
        />

        <!-- Password input -->
        <FormInput
          v-model="formData.password"
          :label="t('form.password')"
          type="password"
          :error="v$.password.$errors[0]?.$message?.toString() || ''"
          :touched="v$.password.$dirty"
          @blur="v$.password.$touch()"
        />

        <!-- Confirm Password input -->
        <FormInput
          v-model="formData.confirmPassword"
          :label="t('form.confirmPassword')"
          type="password"
          :error="v$.confirmPassword.$errors[0]?.$message?.toString() || ''"
          :touched="v$.confirmPassword.$dirty"
          @blur="v$.confirmPassword.$touch()"
        />

        <!-- Register button -->
        <button
          type="submit"
          class="w-full py-2 px-4 border tracking-[2px] border-transparent rounded-md shadow-sm text-sm font-medium cursor-pointer text-white dark:text-black dark:bg-osur bg-osur-dark hover:bg-osur-2-dark hover:dark:bg-osur-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-osur-dark focus:dark:ring-osur disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isLoading"
        >
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
