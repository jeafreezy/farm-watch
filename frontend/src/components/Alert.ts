import { ToastOptions, toast } from 'react-toastify';

const Alert = (
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

        case 'error':
            return toast.error(`${message}`, { ...options });

        case 'info':
            return toast.info(`${message}`, { ...options });

        case 'warning':
            return toast.warning(`${message}`, { ...options });

        default:
            return;
    }
};

export default Alert;
