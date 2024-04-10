import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep = (ms: number) => () =>
  new Promise<AxiosResponse>((resolve) => setTimeout(resolve, ms));

axios.defaults.baseURL = "http://localhost:5100/api/";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    await sleep(500);
    return response;
  },
  (error) => {
    const { data, status } = error.response;
    switch (status) {
      case 400:
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        router.navigate("/servererror", { state: { error: data } });
        break;
      default:
        toast.error(data.title);
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get("/products"),
  details: (id: string) => requests.get(`/products/${id}`),
};

const TestErrors = {
  get400Error: () => requests.get("errors/badrequest"),
  get401Error: () => requests.get("errors/unauthorized"),
  get404Error: () => requests.get("errors/notfound"),
  get500Error: () => requests.get("errors/servererror"),
  getValidationError: () => requests.get("errors/validationerror"),
};

const agent = {
  Catalog,
  TestErrors,
};

export default agent;
