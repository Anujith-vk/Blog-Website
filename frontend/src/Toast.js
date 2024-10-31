import { toast } from "react-toastify";

export const handlesuccess = (msg) => {
    toast.success(msg, {
        style: {
            backgroundColor: 'green',
            color: "white",
            textAlign: "center",
        },
        position: 'top-right',
        autoClose: 1000,
        pauseOnHover: false, 
        draggable: false, 
    });
};

export const handleerror = (msg) => {
    toast.error(msg, {
        style: {
            backgroundColor: "red",
            color: 'white',
            textAlign: "center",
        },
        position: 'top-right',
        autoClose: 1000, 
        pauseOnHover: false,
        draggable: false,
    });
};

