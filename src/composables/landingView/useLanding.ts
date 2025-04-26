import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export const useLanding = () => {
  const { t } = useI18n();
  const services = computed(() =>
    [0, 1].map((index) => ({
      title: t(`services.list[${index}].title`),
      description: t(`services.list[${index}].description`),
      button: t(`services.list[${index}].button`),
      path: t(`services.list[${index}].path`),
    })),
  );

  const handleClick = () => {
    console.log('Explorar Traductor');
  };

  return {
    services,
    handleClick,
  };
};
