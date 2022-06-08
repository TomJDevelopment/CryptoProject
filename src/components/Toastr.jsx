import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toastr = ({ ToastId, Message, Error, Loading, IconString, Theme}) => {
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
    } else if(Loading) {

    }
}