import { errorMessages } from '../constants/error-messages.constant';

export const mapErrorMessageByStatusCode = (
  status: number,
  message?: string | string[],
): { title: string; text: string } => {
  const messageParsed = Array.isArray(message) ? message?.join('; ') : message;

  switch (status) {
    case 0:
      return {
        title: 'Falha na rede',
        text: errorMessages.networkError,
      };
    case 400:
      return {
        title: 'Requisição Inválida',
        text:
          messageParsed ||
          'Por favor, verifique os dados inseridos e tente novamente.',
      };
    case 401:
      return {
        title: 'Não Autorizado',
        text: messageParsed || 'Faça login para acessar este recurso.',
      };
    case 403:
      return {
        title: 'Acesso Proibido',
        text:
          messageParsed || 'Você não tem permissão para acessar este recurso.',
      };
    case 404:
      return {
        title: 'Não Encontrado',
        text: messageParsed || 'O recurso solicitado não foi encontrado.',
      };
    case 500:
      return {
        title: 'Erro Interno do Servidor',
        text: messageParsed || 'Tente novamente mais tarde.',
      };
    case 503:
      return {
        title: 'Serviço Indisponível',
        text:
          messageParsed ||
          'O serviço está temporariamente indisponível. Tente novamente mais tarde.',
      };
    default:
      return {
        title: 'Erro Inesperado',
        text:
          messageParsed ||
          'Ocorreu um erro inesperado. Por favor, tente novamente.',
      };
  }
};
