import axios from "axios";
import { toast } from "react-hot-toast";

class HttpService {
  constructor() {
    const service = axios.create({
      baseURL: "http://localhost:8001",
    });

    service.interceptors.response.use(this.handleSuccess, this.handleError);

    this.service = service;
  }

  handleSuccess(response) {
    return (
     response.data.message ? ( toast.success(response.data.message, {
      style: {
        border: "1px solid #713200",
        padding: "20px",
        color: "#713200",
        fontSize:"22px"
      },
    }),
    response.data
  ): response.data)
  }

  handleError(error) {
    switch (error.response.status) {
      case 401:
        window.location.href = "/login";
        break;
      case 404:
        // Not found

        break;
      default:
        // Internal server error
        toast.error(error.response.data.message,{
          style:{
            border: "1px solid #713200",
            padding: "10px",
            color: "#fff",
            fontSize:"22px"
          }
        });
        break;
    }
    return Promise.reject(error);
  }

  get(...args) {
    return this.service.get(...args);
  }

  post(...args) {
    return this.service.post(...args);
  }

  put(...args) {
    return this.service.put(...args);
  }

  patch(...args) {
    return this.service.patch(...args);
  }

  delete(...args) {
    return this.service.delete(...args);
  }
}

export default new HttpService();
