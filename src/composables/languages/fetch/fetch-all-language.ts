import { axiosInstance } from "@/composables/axios.instance";
import { Language } from "@/types/language";

export const fetchAllLanguage = async (): Promise<Language[]> => {
  return axiosInstance.get("/api/languages").then((response) => response.data);
};
