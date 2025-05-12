import { UpsertTranslation } from "@/types/translation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertTranslation } from "../fetch/upsert-transation";



export default function useUpsertTranslation(
    onSuccessUpsert: (projectId: number) => void,
    onErrorUpsert: (error: string) => void,
  ) {
    const client = useQueryClient();
    return useMutation({
      mutationFn: ({ translations }: { translations: UpsertTranslation }) =>
        upsertTranslation(translations),
      onSuccess: (projectId) => {
        client.invalidateQueries({ queryKey: ["translations", "projectId" , projectId] });

        onSuccessUpsert(projectId);
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || "An unknown error occurred";
        if (onErrorUpsert) {
          onErrorUpsert(errorMessage);
        }
      },
    });
  }

