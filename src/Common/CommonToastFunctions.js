import { Slide, toast } from "react-toastify";

const CommonToastFunctions = (type, message) => { 
    const position = 'top-right';  // Fallback string position
    
    if (type === "success") {
      toast.success(message, {
        position: position,
        hideProgressBar: false,
        transition: Slide,
        autoClose: 2000,
        theme: "colored",
      });
    } else if (type === "warning") { 
      toast.warn(message, {
        position: position,
        hideProgressBar: false,
        transition: Slide,
        autoClose: 2000,
        theme: "colored",
      });
    } else if (type === "error") {
      toast.error(message, {
        position: position,
        hideProgressBar: false,
        transition: Slide,
        autoClose: 2000,
        theme: "colored",
      });
    } else if (type === "info") {
      toast.info(message, {
        position: position,
        hideProgressBar: false,
        transition: Slide,
        autoClose: 2000,
        theme: "colored",
      });
    }
  };
  export default CommonToastFunctions;