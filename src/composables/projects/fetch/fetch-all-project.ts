import { axiosInstance } from "@/composables/axios.instance";
import { Project } from "@/types/porject";

export const fetchAllProject = async (): Promise<Project[]> => {
  return axiosInstance.get("/api/projects").then((response) => response.data);
};
