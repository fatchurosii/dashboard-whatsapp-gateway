import axios from "axios";
import { useEnvironmentStore } from "@src/stores/environment";
export default () => {
  const environmentStore = useEnvironmentStore();
  const _token = localStorage.getItem(environmentStore.data.localStorageToken);
  return axios.create({
    baseURL: environmentStore.data.apiURL,
    withCredentials: false,
    headers: {
      Authorization: _token ? "Bearer " + _token : "",
    },
  });
};
