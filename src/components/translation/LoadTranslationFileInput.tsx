import { enqueueSnackbar } from "notistack";
import { Label } from "../common/label";
import { Input } from "../ui/input";
import { flattenTranslations } from "./utils";
import { useFormContext } from "react-hook-form";
import { UpsertTranslationForm } from "./schema";

export type LoadTranslationFileInputProps = {
  lang: "en" | "fr";
};

export default function LoadTranslationFileInput({
  lang,
}: LoadTranslationFileInputProps) {
 const {watch, setValue, trigger } = useFormContext<Partial<UpsertTranslationForm>>();
 const currentTranslations = watch("translations");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        try{
            const data = JSON.parse(e.target?.result as string);
           
            const flattenJson = flattenTranslations(data);

            const updated = Object.entries(flattenJson).reduce((acc, [key, value]) => {
                const existing = acc.find((t) => t.key === key);
                if (existing) {
                  existing.translations[lang] = value;
                } else {
                  acc.push({
                    key,
                    description: undefined,
                    translations: { [lang]: value }
                  });
                }
                return acc;
              }, [...(currentTranslations || [])]);

              updated.forEach((entry, index) => {
                setValue(`translations.${index}.key`, entry.key);
                trigger(`translations.${index}.key`);
        
                if (entry.description) {
                  setValue(`translations.${index}.description`, entry.description);
                  trigger(`translations.${index}.description`);
                }
        
                Object.entries(entry.translations).forEach(([languageCode, translation]) => {
                  setValue(`translations.${index}.translations.${languageCode}`, translation);
                  trigger(`translations.${index}.translations.${languageCode}`);
                });
              });

              // setValue("translations", updated, { shouldValidate: false });

              // trigger("translations");


      
            enqueueSnackbar("File loaded successfully", {
              variant: "success",
            });
        }catch(e){
            console.log(e);
            enqueueSnackbar("Invalid file format", {
              variant: "error",
            });
        }
     
    };
    reader.readAsText(file);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Load {lang} translation file</Label>
      <Input
        id="picture"
        type="file"
        accept="application/json"
        onChange={onChange}
      />
    </div>
  );
}
