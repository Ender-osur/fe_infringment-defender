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
    footer: {
      rights: 'Developed by Osur.dev',
    },
    services: {
      title: 'Our Legal Services',
      heroTitle: 'AI-Powered Legal Advice for Drivers',
      heroDescription: 'Get fast, reliable legal information related to traffic laws and violations.',
      list: [
        {
          title: 'Traffic Law Assistance',
          description: 'Ask questions related to traffic laws, rights, and violations. Get immediate legal advice.',
          button: 'Get Advice',
          path: '/chat',
        },
        {
          title: 'Coming Soon',
          description: 'We are working on new features for even better legal assistance. Stay tuned!',
          button: 'More Information',
          path: '/chat',
        },
      ],
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
    footer: {
      rights: 'Desarrollador por Osur.dev',
    },
    services: {
      title: 'Nuestros Servicios Legales',
      heroTitle: 'Asesoría Legal Impulsada por IA para Conductores',
      heroDescription: 'Obtén información legal rápida y confiable relacionada con leyes de tránsito y violaciones.',
      list: [
        {
          title: 'Asistencia en Ley de Tránsito',
          description: 'Haz preguntas relacionadas con las leyes de tránsito, tus derechos y violaciones. Recibe asesoría legal inmediata.',
          button: 'Obtener Asesoría',
          path: '/chat',
        },
        {
          title: 'Próximos Servicios',
          description: 'Estamos trabajando en nuevas características para ofrecerte una mejor asesoría legal. ¡Espéralos pronto!',
          button: 'Más Información',
          path: '/chat',
        },
      ],
    },
  },
};

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});
