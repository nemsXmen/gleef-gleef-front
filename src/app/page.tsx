import TranslationForm from "@/components/translation/TranslationForm";
import { getQueryClient } from "@/composables/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default function Home() {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <TranslationForm  />
      </div>
    </HydrationBoundary>
  );
}
