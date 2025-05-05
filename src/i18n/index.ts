import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    nav: {
      loguot: 'Logout',
    },
    chat: {
      header: 'Infringment Defeder Assitant',
      placeholder: 'Type a message...',
      send: 'Send',
      userMessage: 'You',
      botMessage: 'Bot',
      lang: 'Language',
      endChat: 'End Chat',
      chatEnded: 'This conversation has been ended and rated. Thank you for your feedback!',
    },
    rating: {
      title: 'Rate your experience',
      comment: 'Comment',
      placeholder: 'Share your thoughts...',
      cancel: 'Cancel',
      submit: 'Submit',
      ratingRequired: 'Please select a rating before continuing',
    },
    conversation:{
      title: "Coversation List",
    },
    footer: {
      rights: 'Developed by Infringment Defender developers team',
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
            'Chat with an AI-powered legal assistant to get fast, reliable legal information related to traffic laws and violations.',
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
      description: 'Description',
      noPosts: "There are no posts in the forum yet",
      create: "Create question",
      postedBy: "Posted by",
      showComments: "Show comments",
      hideComments: "Hide comments",
      noComments: "No comments yet",
      writeComment: "Write a comment...",
      addComment: "Add comment",
      sendingComment: "Sending...",
      loginToComment: "Login to add a comment",
      createPost: "Create new post",
      createPostSubtitle: "Share your thoughts with the community",
      category: "Category",
      titlePlaceholder: "Enter a descriptive title",
      descriptionPlaceholder: "Provide details about your post",
      publish: "Publish",
      publishing: "Publishing...",
      categoryNote: "The category will be added as a prefix to the title"
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
  },
  es: {
    nav: {
      loguot: 'Salir',
    },
    chat: {
      header: 'Asistente Defensor de infracciones',
      placeholder: 'Escribe un mensaje...',
      send: 'Enviar',
      userMessage: 'Tú',
      botMessage: 'Bot',
      lang: 'Idioma',
      endChat: 'Finalizar Chat',
      chatEnded: 'Esta conversación ha sido finalizada y calificada. ¡Gracias por tu retroalimentación!',
    },
    rating: {
      title: 'Califica tu experiencia',
      comment: 'Comentario',
      placeholder: 'Comparte tus pensamientos...',
      cancel: 'Cancelar',
      submit: 'Enviar',
      ratingRequired: 'Por favor selecciona una calificación antes de continuar',
    },
    conversation:{
      title: "Lista de conversaciones",
    },
    footer: {
      rights: 'Desarrollador por el equipo de desarrollo de Infringment Defender',
    },
    services: {
      title: 'Nuestros servicios',
      heroTitle: 'Asesoría legal impulsada por IA para conductores',
      heroDescription:
        'Obtén información legal rápida y confiable relacionada con leyes de tránsito y violaciones.',
      list: [
        {
          title: 'Asistencia en ley de tránsito',
          description: 'Chatea con un asistente legal impulsado por IA para obtener información legal rápida y confiable relacionada con leyes de tránsito y violaciones.',
          button: 'Obtener Asesoría',
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
      description: 'Descripción',
      noPosts: "No hay publicaciones en el foro todavía",
      create: "Crear pregunta",
      postedBy: "Publicado por",
      showComments: "Mostrar comentarios",
      hideComments: "Ocultar comentarios",
      noComments: "No hay comentarios todavía",
      writeComment: "Escribe un comentario...",
      addComment: "Agregar comentario",
      sendingComment: "Enviando...",
      loginToComment: "Inicia sesión para comentar",
      createPost: "Crear nueva publicación",
      createPostSubtitle: "Comparte tus ideas con la comunidad",
      category: "Categoría",
      titlePlaceholder: "Ingresa un título descriptivo",
      descriptionPlaceholder: "Proporciona detalles sobre tu publicación",
      publish: "Publicar",
      publishing: "Publicando...",
      categoryNote: "La categoría se añadirá como prefijo al título"
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
  locale: 'es',
  fallbackLocale: 'es',
  messages,
});
