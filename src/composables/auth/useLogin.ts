// composables/useLogin.ts
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '@/services/AuthService';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/user';

// Función para decodificar un token JWT
function decodeToken(token: string) {
  try {
    // El token JWT tiene tres partes separadas por puntos: header.payload.signature
    // Nos interesa el payload, que es la segunda parte
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error al decodificar el token JWT:', error);
    return null;
  }
}

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
          email: decodedToken.email || email
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
