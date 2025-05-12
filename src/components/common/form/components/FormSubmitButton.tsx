import { Button, ButtonProps } from "@/components/common/button";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

type SubmitButtonProps = {
  shouldDirty?: boolean;
  forceDisable?: boolean;
} & Omit<ButtonProps, "disabled">;

export const FormSubmitButton: FC<SubmitButtonProps> = ({
  children,
  shouldDirty = true,
  forceDisable = false,
  ...props
}) => {
  const form = useFormContext();

  if (!form) {
    throw new Error("<SubmitButton/> must be used within a <Form/> component");
  }

  const { isDirty, isSubmitting, isValid } = form.formState;

  const isDisabled =
    form.control._options.mode === "onSubmit"
      ? isSubmitting || !isValid
      : (shouldDirty ? !isDirty : false) || isSubmitting || !isValid;

  return (
    <Button
      type="submit"
      {...props}
      disabled={isSubmitting || forceDisable ? true : isDisabled}
    >
      {children}
    </Button>
  );
};
