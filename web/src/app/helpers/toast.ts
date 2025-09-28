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
    showToast({ title: 'Sucesso!', icon: 'success', ...options }),
  error: (options?: ToastOptions) =>
    showToast({ title: 'Erro', icon: 'error', ...options }),
  warning: (options?: ToastOptions) =>
    showToast({ title: 'Atenção!', icon: 'warning', ...options }),
  info: (options?: ToastOptions) =>
    showToast({ title: 'Info', icon: 'info', ...options }),
};
