import { useQuery } from "@tanstack/react-query";
import { fetchAllProject } from "../fetch/fetch-all-project";

export default function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchAllProject(),
  });
}