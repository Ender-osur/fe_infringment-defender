import { ref } from 'vue';
import { AuthService } from '@/services/AuthService';

export const useLogin = () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      await AuthService.login({ email, password });
    } catch (err) {
      error.value = 'Login failed. Please check your credentials.';
      console.error('Login error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    login,
  };
};
