import Swal from "sweetalert2";
export const useToasts = () => {
  const setToast = (icon: any, title: string, timer: number = 3000) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    return Toast.fire({
      icon: icon,
      title: title,
    });
  };

  const setQueuedToast = async (icon: any, messages: string[], timer: number = 3000) => {
    for (const message of messages) {
      await setToast(icon, message, timer);
    }
  };

  return { setToast, setQueuedToast };
};
