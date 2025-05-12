import { axiosInstance } from "@/composables/axios.instance";
import { UpsertTranslation } from "@/types/translation";

export const upsertTranslation = async (data: UpsertTranslation) => {
  return axiosInstance.post("/api/translations/upsert", data).then(() => data.projectId);
};
