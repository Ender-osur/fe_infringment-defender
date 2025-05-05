import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import AuthService from '@/services/AuthService';
import { decodeToken } from '../useJWT';

export function useRegister() {
  const isLoading = ref(false);
  const registerError = ref('');
  const router = useRouter();
  const { t } = useI18n();

  const register = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    console.log('register controller :: ', name, email, password);
    registerError.value = '';

    try {
      isLoading.value = true;

      // Attempt registration
      const result = await AuthService.register({
        name,
        email,
        password,
      });

      console.log('Registration successful:', result);

      // Guardar el token en localStorage
      if (result && result.token) {
        localStorage.setItem('token', result.token);

        // Decodificar el token para obtener la información del usuario
        const decodedToken = decodeToken(result.token);

        if (decodedToken && decodedToken.userId) {
          // Guardar el ID del usuario directamente desde el token
          localStorage.setItem('userId', decodedToken.userId.toString());

          // Crear un objeto de usuario básico con la información del token
          const userInfo = {
            id: decodedToken.userId,
            email: decodedToken.email || email,
            fullName: name,
          };

          // Guardar la información del usuario en localStorage
          localStorage.setItem('user', JSON.stringify(userInfo));
        }
      }

      // Redirigir a la página de inicio
      router.push('/home');
    } catch (error: unknown) {
      console.error('Registration error:', error);

      // Determinar el tipo de error para mostrar un mensaje más específico
      if (error && typeof error === 'object' && 'response' in error) {
        const errorResponse = error.response as { status?: number; data?: any };
        
        if (errorResponse && errorResponse.status === 409) {
          // Email ya existe
          registerError.value = t('messages.emailExists');
        } else if (errorResponse && errorResponse.status && errorResponse.status >= 500) {
          // Error del servidor
          registerError.value = t('messages.registrationServerError');
        } else {
          registerError.value = t('messages.registerFailed');
        }
      } else if (error && typeof error === 'object' && 'message' in error && 
                typeof error.message === 'string' && error.message.includes('Network')) {
        // Error de red
        registerError.value = t('messages.registrationNetworkError');
      } else {
        // Error genérico
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
