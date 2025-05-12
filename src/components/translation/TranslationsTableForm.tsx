import {
  FieldArrayWithId,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { UpsertTranslationForm } from "./schema";
import { Button } from "../common/button";
import TranslationTableItem from "./TranslationTableItem";
import useGetProjectTranslations from "@/composables/translations/hooks/useGetProjectTranslation";
import { useEffect } from "react";

export default function TranslationsTableForm() {
  const { control, watch } =
    useFormContext<Partial<UpsertTranslationForm>>();
  const projectId = watch("projectId");
  const { data: translations } = useGetProjectTranslations(projectId);

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "translations",
  });

  useEffect(() => {
    if (translations) {
      replace(translations.translations);
    }
  }, [translations]);

  return (
    <div className="flex flex-col max-h-[calc(100vh-400px)] border rounded overflow-hidden">
      <Table>
        <TableCaption>A list of translation keys.</TableCaption>
        <TableHeader className="sticky top-0 z-10 bg-white">
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>En</TableHead>
            <TableHead>Fr</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-auto flex-1">
          {fields?.map((item, index) => (
            <TranslationTableItem key={index} index={index} remove={remove} />
          ))}
        </TableBody>
        <TableFooter className="bg-white sticky bottom-0 z-10 border-t">
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              <Button type="button" onClick={() => append({} as any)}>
                Add
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
