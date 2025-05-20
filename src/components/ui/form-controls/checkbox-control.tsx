import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext, FieldPath, FieldValues } from "react-hook-form";

interface CheckboxControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
}

export function CheckboxControl<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  required = false,
  disabled = false,
}: CheckboxControlProps<TFieldValues, TName>) {
  const { control, formState } = useFormContext<TFieldValues>();
  const hasError = !!formState.errors[name];

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-1 rounded-md p-4">
          <div className="flex flex-row items-center space-x-3">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
              />
            </FormControl>
            {label && (
              <div className="space-y-1 leading-none">
                <FormLabel className={hasError ? "text-destructive" : ""}>
                  {label}
                  {required && <span className="ml-1">*</span>}
                </FormLabel>
                {description && (
                  <FormDescription>{description}</FormDescription>
                )}
              </div>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
