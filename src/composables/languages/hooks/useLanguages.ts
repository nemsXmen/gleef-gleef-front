import { useQuery } from "@tanstack/react-query";
import { fetchAllLanguage } from "../fetch/fetch-all-language";

export default function useLanguages() {
  return useQuery({
    queryKey: ["languages"],
    queryFn: () => fetchAllLanguage(),
  });
}
