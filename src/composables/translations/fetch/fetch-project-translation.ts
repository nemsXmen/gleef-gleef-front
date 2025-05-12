import { axiosInstance } from "@/composables/axios.instance";
import { Translation } from "@/types/translation";

export const fetchProjectTranslation = async (
  projectId: number
): Promise<{
    translations: Translation[];
}> => {
  return axiosInstance
    .get(`/api/translations/project/${projectId}`)
    .then((response) => response.data);
};
