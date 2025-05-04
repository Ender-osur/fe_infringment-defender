// composables/useLogin.ts
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import AuthService from '@/services/authService';
import { useUserStore } from '@/stores/user';

export function useLogin() {
  const isLoading = ref(false);
  const loginError = ref('');
  const router = useRouter();
  const { t } = useI18n();
  const userStore = useUserStore();

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
      userStore.setUser({ id: response.user.id });

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
