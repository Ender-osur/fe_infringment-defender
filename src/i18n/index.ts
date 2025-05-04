import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    nav: {
      chat: 'Chat',
      imagesGeneration: 'Images Generation',
      github: 'GitHub',
      aboutUs: 'About Us',
    },
    chat: {
      header: 'Translater',
      placeholder: 'Type a message...',
      send: 'Send',
      userMessage: 'You',
      botMessage: 'Bot',
      lang: 'Language',
    },
    history: {
      header: 'Traductor',
      record: 'see history',
      userMessage: 'Tú',
      botMessage: 'Bot',
      lang: 'Idioma',
    },
    footer: {
      rights: 'Developed by Osur.dev',
    },
    services: {
      title: 'Our Legal Services',
      heroTitle: 'AI-Powered Legal Advice for Drivers',
      heroDescription:
        'Get fast, reliable legal information related to traffic laws and violations.',
      list: [
        {
          title: 'Traffic Law Assistance',
          description:
            'Ask questions related to traffic laws, rights, and violations. Get immediate legal advice.',
          button: 'Get Advice',
          path: '/chat',
        },
        {
          title: 'lOGIN',
          description:
            'Prove it',
          button: 'Login',
          path: '/login',
        },
      ],
    },
    form: {
      name: 'Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      rememberMe: 'Remember me',
      login: 'Login',
      register: 'Register',
      forgotPassword: 'Forgot Password',
      sendResetLink: 'Send Reset Link',
      dontHaveAccount: "Don't have an account?",
      createAccount: 'Create account',
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign in',
      backToLogin: 'Back to login',
    },
    validation: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      minLength: 'Must be at least {min} characters',
      passwordRequirements:
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      passwordsMatch: 'Passwords must match',
    },
    messages: {
      loginSuccess: 'Login successful!',
      loginFailed: 'Login failed. Please check your credentials.',
      registerSuccess: 'Registration successful! Please check your email to verify your account.',
      registerFailed: 'Registration failed. Please try again.',
      emailExists: 'This email is already registered',
      resetLinkSent: 'Password reset link has been sent to your email',
      fillRequiredFields: 'Please fill in all required fields correctly',
    },
  },
  es: {
    nav: {
      chat: 'Chat',
      imagesGeneration: 'Generación de Imágenes',
      github: 'GitHub',
      aboutUs: 'Sobre Nosotros',
    },
    chat: {
      header: 'Traductor',
      placeholder: 'Escribe un mensaje...',
      send: 'Enviar',
      userMessage: 'Tú',
      botMessage: 'Bot',
      lang: 'Idioma',
    },
    history: {
      header: 'Traductor',
      placeholder: 'Escribe un mensaje...',
      record: 'Ver historial',
      userMessage: 'Tú',
      botMessage: 'Bot',
      lang: 'Idioma',
    },
    footer: {
      rights: 'Desarrollador por Osur.dev',
    },
    services: {
      title: 'Nuestros Servicios Legales',
      heroTitle: 'Asesoría Legal Impulsada por IA para Conductores',
      heroDescription:
        'Obtén información legal rápida y confiable relacionada con leyes de tránsito y violaciones.',
      list: [
        {
          title: 'Asistencia en Ley de Tránsito',
          description:
            'Experimenta',
          path: '/chat',
        },
        {
          title: 'LOGIN',
          description:
            'Estamos trabajando en nuevas características para ofrecerte una mejor asesoría legal. ¡Espéralos pronto!',
          button: 'Iniciar sesión',
          path: '/login',
        },
      ],
    },
  },
  form: {
    name: 'Nombre',
    email: 'Correo electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    rememberMe: 'Recordarme',
    login: 'Iniciar sesión',
    register: 'Registrarse',
    forgotPassword: '¿Olvidaste tu contraseña?',
    sendResetLink: 'Enviar enlace de reinicio',
    dontHaveAccount: '¿No tienes una cuenta?',
    createAccount: 'Crear cuenta',
    alreadyHaveAccount: '¿Ya tienes una cuenta?',
    signIn: 'Iniciar sesión',
    backToLogin: 'Volver a iniciar sesión',
  },
  validation: {
    required: 'Este campo es obligatorio',
    email: 'Por favor, introduce un correo electrónico válido',
    minLength: 'Debe tener al menos {min} caracteres',
    passwordRequirements:
      'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número',
    passwordsMatch: 'Las contraseñas deben coincidir',
  },
  messages: {
    loginSuccess: '¡Inicio de sesión exitoso!',
    loginFailed: 'Error al iniciar sesión. Por favor, verifica tus credenciales.',
    registerSuccess:
      '¡Registro exitoso! Por favor, revisa tu correo electrónico para verificar tu cuenta.',
    registerFailed: 'Error al registrarse. Por favor, inténtalo de nuevo.',
    emailExists: 'Este correo electrónico ya está registrado',
    resetLinkSent: 'Se ha enviado un enlace para restablecer la contraseña a tu correo electrónico',
    fillRequiredFields: 'Por favor, rellena correctamente todos los campos obligatorios',
  },
};

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});
