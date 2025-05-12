import { skipToken, useQuery } from "@tanstack/react-query";
import { fetchProjectTranslation } from "../fetch/fetch-project-translation";

export default function useGetProjectTranslations(projectId?: number) {
  return useQuery({
    queryKey: ["translations", "projectId", projectId],
    queryFn: projectId ? () => fetchProjectTranslation(projectId) : skipToken,
    enabled: !!projectId,
  });
}
