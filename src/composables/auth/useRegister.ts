import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import AuthService from '@/services/AuthService';

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

export function useRegister() {
  const isLoading = ref(false);
  const registerError = ref('');
  const router = useRouter();
  const { t } = useI18n();

  const register = async ({
    name,
    email,
    password,
  }: { name: string; email: string; password: string }) => {
    console.log("register controller :: ", name, email, password);
    registerError.value = '';

    try {
      isLoading.value = true;

      // Attempt registration
      const result = await AuthService.register({
        name,
        email,
        password
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
            fullName: name
          };

          // Guardar la información del usuario en localStorage
          localStorage.setItem('user', JSON.stringify(userInfo));
        }
      }

      // Redirect to login or dashboard
      router.push('/login');
    } catch (error: unknown) {
      console.error('Registration error:', error);

      // Handle specific error for existing email
      if (error && typeof error === 'object' && 'response' in error &&
        error.response && typeof error.response === 'object' &&
        'status' in error.response && error.response.status === 409) {
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
