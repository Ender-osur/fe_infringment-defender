// composables/useLogin.ts
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '@/services/authService';
import { useI18n } from 'vue-i18n';

export function useLogin() {
  const isLoading = ref(false);
  const loginError = ref('');
  const router = useRouter();
  const { t } = useI18n();

  const login = async ({
    email,
    password,
    rememberMe,
  }: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }) => {
    loginError.value = '';
    try {
      isLoading.value = true;
      const response = await AuthService.login({ email, password, rememberMe });

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      loginError.value = t('messages.loginFailed');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    loginError,
    login,
  };
}
