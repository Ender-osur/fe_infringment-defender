// composables/useLogin.ts
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import AuthService from '@/services/AuthService';
import { useAuthStore } from '@/stores/user';
import { decodeToken } from '../useJWT';

export function useLogin() {
  const isLoading = ref(false);
  const loginError = ref('');
  const router = useRouter();
  const { t } = useI18n();
  const userStore = useAuthStore();

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

      // Guardar el token en localStorage
      localStorage.setItem('token', response.token);

      // Decodificar el token para obtener la información del usuario
      const decodedToken = decodeToken(response.token);

      if (decodedToken && decodedToken.userId) {
        // Guardar el ID del usuario directamente desde el token
        localStorage.setItem('userId', decodedToken.userId.toString());

        // Crear un objeto de usuario básico con la información del token
        const userInfo = {
          id: decodedToken.userId,
          email: decodedToken.email || email,
        };

        // Guardar la información del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(userInfo));

        // Actualizar el store de autenticación
        userStore.setUser(userInfo);
      } else {
        console.warn('No se pudo decodificar el token o no contiene ID de usuario');
        // Guardar un objeto de usuario básico como fallback
        const basicUserInfo = { id: 0, email };
        localStorage.setItem('user', JSON.stringify(basicUserInfo));
        localStorage.setItem('userId', '0');
        userStore.setUser(basicUserInfo);
      }

      router.push('/');
    } catch (error: unknown) {
      console.error('Login error:', error);
      
      // Determinar el tipo de error para mostrar un mensaje más específico
      if (error && typeof error === 'object' && 'response' in error) {
        const errorResponse = error.response as { status?: number };
        
        if (errorResponse && errorResponse.status === 401) {
          // Credenciales inválidas
          loginError.value = t('messages.credentialsInvalid');
        } else if (errorResponse && errorResponse.status && errorResponse.status >= 500) {
          // Error del servidor
          loginError.value = t('messages.serverError');
        } else {
          // Otro tipo de error de respuesta
          loginError.value = t('messages.loginFailed');
        }
      } else if (error && typeof error === 'object' && 'message' in error && 
                typeof error.message === 'string' && error.message.includes('Network')) {
        // Error de red
        loginError.value = t('messages.networkError');
      } else {
        // Error genérico
        loginError.value = t('messages.loginFailed');
      }
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
