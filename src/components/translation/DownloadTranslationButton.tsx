import Link from "next/link";
import { Button } from "../common/button";

type DownloadTranslationButtonProps = {
  projectId: number;
  language: "en" | "fr";
};

export default function DownloadTranslationButton({
  projectId,
  language,
}: DownloadTranslationButtonProps) {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_API_URL}/api/translations/download/${projectId}/${language}`}>
      <Button type="button">Download {language} translation</Button>
    </Link>
  );
}
