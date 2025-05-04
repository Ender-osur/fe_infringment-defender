import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    nav: {
      loguot: 'Logout',
      loguot: 'Logout',
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
      title: 'Our services',
      heroTitle: 'AI-Powered legal advice for drivers',
      heroDescription:
        'Get fast, reliable legal information related to traffic laws and violations.',
      list: [
        {
          title: 'Traffic law assistance',
          description:
            'Ask questions related to traffic laws, rights, and violations. Get immediate legal advice.',
          button: 'Get Advice',
          path: '/chat',
        },
        {
          title: 'Forum',
          description:
            'You will be able to ask different questions asked by different users that have already been answered.',
          button: 'Forum',
          path: '/foro',
        },
      ],
    },
    forum: {
      title: 'Title',
      comment: 'Commentary',
      noPosts: "There are no posts in the forum yet",
      create: "Create question"
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
    common: {
      send: 'Send',
      cancel: 'Cancel',
    },
    common: {
      send: 'Send',
      cancel: 'Cancel',
    },
  },
  es: {
    nav: {
      loguot: 'Salir',
      loguot: 'Salir',
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
      title: 'Nuestros servicios',
      heroTitle: 'Asesoría legal impulsada por IA para conductores',
      heroDescription:
        'Obtén información legal rápida y confiable relacionada con leyes de tránsito y violaciones.',
      list: [
        {
          title: 'Asistencia en ley de tránsito',
          description: 'Experimenta',
          description: 'Experimenta',
          path: '/chat',
        },
        {
          title: 'Foro',
          description:
            'Podrás diferentes preguntas hechas por diferentes usuarios que ya han sido respondidas',
          button: 'Foro',
          path: '/foro',
        },
      ],
    },
    forum: {
      title: 'Título',
      comment: 'Comentario',
      noPosts: "No hay publicaciones en el foro todavía",
      create: "Crear pregunta"
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
      resetLinkSent:
        'Se ha enviado un enlace para restablecer la contraseña a tu correo electrónico',
      resetLinkSent:
        'Se ha enviado un enlace para restablecer la contraseña a tu correo electrónico',
      fillRequiredFields: 'Por favor, rellena correctamente todos los campos obligatorios',
    },
    common: {
      send: 'Enviar',
      cancel: 'Cancelar',
    },
  },
};

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});
