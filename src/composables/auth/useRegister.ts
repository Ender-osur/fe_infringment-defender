import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import AuthService from '@/services/authService';

export function useRegister() {
    const isLoading = ref(false);
    const registerError = ref('');
    const router = useRouter();
    const { t } = useI18n();

    const register = async ({
        name,
        email,
        password,
    }) => {
        console.log("register controller :: ", name, email, password);
        registerError.value = '';
    
        try {
          isLoading.value = true;
      
          // Attempt registration
          const response = await AuthService.register({
            name: name,
            email: email,
            password: password,
          });

            if (response != null && response.token) {
                console.log("");
            }
            console.log('Registration successful:', response);
      
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
      return {
        isLoading,
        registerError,
        register,
      };
}
