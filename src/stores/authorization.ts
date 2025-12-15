import api from "@services/api";
import { ILoginPayload, IUserProfile } from "@src/types/authorization";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { useEnvironmentStore } from "@src/stores/environment";

export const useAuthorizationStore = defineStore("authorization", () => {
  const environmentStore = useEnvironmentStore();
  let data = reactive({
    authorized: false,
    id: "",
    username: "",
  }) as IUserProfile;

  function setToken(token: string) {
    localStorage.setItem(environmentStore.data.localStorageToken, token);
  }

  function setProfileData(payload: IUserProfile | null) {
    data = {
      authorized: payload ? true : false,
      id: payload?.id || "",
      username: payload?.username || "",
    };
  }

  function logout() {
    api().post("api/auth/logout");
    setToken("");
    setProfileData(null);
  }

  async function getProfile(setToAuthorizationState = false) {
    try {
      const response = await api().get("api/auth/profile");
      if (setToAuthorizationState) {
        setProfileData(response.data.user);
      }
      return response;
    } catch (error) {
      if (setToAuthorizationState) {
        setProfileData(null);
      }
      throw error;
    }
  }
  async function login(payload: ILoginPayload) {
    try {
      const response = await api().post("api/auth/login", payload);
      setToken(response.data.data.token);
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  return { data, setToken, logout, getProfile, login };
});
