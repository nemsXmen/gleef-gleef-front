"use client";

import { useZodForm } from "../common/form/hooks/useZodForm";
import { UpsertTranslationForm, UpsertTranslationFormSchema } from "./schema";
import { Form } from "../common/form/form";
import SelectProject from "../projects/form/SelectProject";
import { FormSubmitButton } from "../common/form/components/FormSubmitButton";
import TranslationsTableForm from "./TranslationsTableForm";
import LoadTranslationFileInput from "./LoadTranslationFileInput";
import useUpsertTranslation from "@/composables/translations/hooks/useUpsertTranslation";
import { enqueueSnackbar } from "notistack";
import DownloadTranslationButton from "./DownloadTranslationButton";

export default function TranslationForm() {
  const form = useZodForm({
    schema: UpsertTranslationFormSchema,
    mode: "all",
  });

  const projectId = form.watch("projectId");

  const { mutate: upsertTranslation } = useUpsertTranslation(
    (projectId) => {
      enqueueSnackbar(`Translations saved successfully for project `, {
        variant: "success",
      });
    },
    (error) => {
      enqueueSnackbar(error, {
        variant: "error",
      });
    }
  );

  async function onSubmit(data: UpsertTranslationForm) {
    upsertTranslation({ translations: data });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-20 p-20">
          <div className="col-span-12 flex gap-4">
            <SelectProject name="projectId" />
            <LoadTranslationFileInput lang="en" />
            <LoadTranslationFileInput lang="fr" />
          </div>
          <div className="col-span-12 ">
            <TranslationsTableForm />
          </div>
          <div className="col-span-12 flex justify-end gap-4">
            <FormSubmitButton>Save</FormSubmitButton>
            {projectId && (
              <>
                <DownloadTranslationButton
                  projectId={projectId}
                  language="en"
                />
                <DownloadTranslationButton
                  projectId={projectId}
                  language="fr"
                />
              </>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
