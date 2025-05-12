import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem } from "../common/form/form";
import { TableCell, TableRow } from "../ui/table";
import { UpsertTranslationForm } from "./schema";
import { Input } from "../ui/input";
import { Button } from "../common/button";

type TranslationTableItemProps = {
  index: number;
  remove: (index: number) => void;
};

export default function TranslationTableItem({
  index,
  remove,
}: TranslationTableItemProps) {
  const { control } = useFormContext<Partial<UpsertTranslationForm>>();

  return (
    <TableRow>
      <TableCell className="font-medium">
        <FormField
          control={control}
          name={`translations.${index}.key`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <FormField
          control={control}
          name={`translations.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <FormField
          control={control}
          name={`translations.${index}.translations.en`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="text-right">
        <FormField
          control={control}
          name={`translations.${index}.translations.fr`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <Button type="button" onClick={() => remove(index)}>
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
}
