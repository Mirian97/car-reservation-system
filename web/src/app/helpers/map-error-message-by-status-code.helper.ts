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
        text: messageParsed || errorMessages.fillInCorrectly,
      };
    case 401:
      return {
        title: 'Não Autenticado',
        text: messageParsed || errorMessages.notAuthorized,
      };
    case 403:
      return {
        title: 'Acesso Proibido',
        text: messageParsed || errorMessages.notAuthenticated,
      };
    case 404:
      return {
        title: 'Não Encontrado',
        text: messageParsed || errorMessages.resourceNotFound,
      };
    case 500:
      return {
        title: 'Erro Interno do Servidor',
        text: messageParsed || errorMessages.tryAgainLater,
      };
    case 503:
      return {
        title: 'Serviço Indisponível',
        text: messageParsed || errorMessages.unavailableService,
      };
    default:
      return {
        title: 'Erro Inesperado',
        text: messageParsed || errorMessages.unexpectedError,
      };
  }
};
