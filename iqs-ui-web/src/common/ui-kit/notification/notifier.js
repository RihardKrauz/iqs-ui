import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export class Toaster {
    static notifySuccess = msg => {
        console.log(`Notifier: ${msg}`);
        toast.success(msg, {
            autoClose: 3000,
            transition: Flip
        });
    };

    static notifyError = msg => {
        console.error(`Notifier: ${msg}`);
        toast.error(msg, {
            autoClose: 5000,
            transition: Flip
        });
    };
}
