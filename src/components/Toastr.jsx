import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toastr = async ({ ToastId, Message, Error, LoadingPromise, IconString, Theme, PromiseMethod }) => {
    if(Error) {
        if(IconString) {
            if(Theme) {
                toast.error(Message, {
                    toastId: ToastId,
                    icon: IconString,
                    theme: Theme
                });
            } else {
                toast.error(Message, {
                    toastId: ToastId,
                    icon: IconString
                });
            }
        }

        if(Theme) {
            toast.error(Message, {
                toastId: ToastId,
                theme: Theme
            });
        } else {
            toast.error(Message, {
                toastId: ToastId
            });
        }
    } else if(LoadingPromise) {
        await toast.promise(
            PromiseMethod(),
            {
                pending: "Sending...",
                success: "Successfully sent",
                error: "An error occurred"
            }
        )
    }
}