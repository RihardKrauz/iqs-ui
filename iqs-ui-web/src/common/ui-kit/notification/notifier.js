import React, { useEffect } from 'react';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default props => {
    const notifySuccess = msg => {
        toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            transition: Flip
        });
    };

    const notifyError = msg => {
        toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            transition: Flip
        });
    };

    useEffect(() => {
        if (props['events']) {
            let notifier = {};
            notifier.success = msg => {
                notifySuccess(msg);
            };
            notifier.error = msg => {
                notifyError(msg);
            };
            props['events'](notifier);
        }
    }, []);

    return <ToastContainer />;
};
