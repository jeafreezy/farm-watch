import { ToastOptions, toast } from 'react-toastify';

export const Toast = (
    reason: string,
    message: string,
    position: any = 'bottom-left',
    theme: any = 'dark',
    autoClose: number = 5000
) => {
    const options: ToastOptions = {
        theme: theme,
        position: position,
        autoClose: autoClose,
    };

    switch (reason) {
        case 'success':
            return toast.success(`${message}`, { ...options });
            break;
        case 'error':
            return toast.error(`${message}`, { ...options });
            break;
        case 'info':
            return toast.info(`${message}`, { ...options });
            break;
        case 'warning':
            return toast.warning(`${message}`, { ...options });
            break;
        default:
            return;
    }
};
