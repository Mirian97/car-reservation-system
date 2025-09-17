import Swal, { SweetAlertOptions } from 'sweetalert2';

type ToastOptions = Omit<SweetAlertOptions, 'input' | 'inputValidator'>;

const commonOptions: ToastOptions = {
  toast: true,
  timer: 4000,
  iconColor: 'white',
  position: 'top-right',
  timerProgressBar: true,
  showConfirmButton: false,
  customClass: {
    popup: 'colored-toast',
  },
};

const showToast = (options: ToastOptions = {}) => {
  return Swal.fire({
    ...commonOptions,
    ...options,
  });
};

export const toast = {
  success: (options?: ToastOptions) =>
    showToast({ ...options, title: 'Sucesso!', icon: 'success' }),
  error: (options?: ToastOptions) =>
    showToast({ ...options, title: 'Erro', icon: 'error' }),
  warning: (options?: ToastOptions) =>
    showToast({ ...options, title: 'Atenção!', icon: 'warning' }),
  info: (options?: ToastOptions) =>
    showToast({ ...options, title: 'Info', icon: 'info' }),
};
