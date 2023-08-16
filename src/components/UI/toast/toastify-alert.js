import { toast } from "react-toastify";

const TOAST_TYPE = {
  info: toast.info,
  success: toast.success,
  error: toast.error,
};

const alertToast = (toastObject) => {
  let { type, message } = toastObject;
  TOAST_TYPE[type](message, { position: toast.POSITION.TOP_CENTER });
};

export default alertToast;
