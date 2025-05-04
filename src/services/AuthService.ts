import api from './api/apiClient';

interface LoginParams {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    fullName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

const AuthService = {
  async login({ email, password, rememberMe }: LoginParams): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    const { token } = response.data;

    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }

    return response.data;
  },

  async register(params: RegisterParams): Promise<AuthResponse> {
    console.log('register user servcice ...');
    const response = await api.post<AuthResponse>('/auth/register', {
      fullName: params.name,
      email: params.email,
      password: params.password,
    });
    return response.data;
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email });
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
      console.log('Logout exitoso en el servidor');
    } catch (error) {
      console.error('Error al hacer logout en el servidor:', error);
    } finally {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
};

export default AuthService;
