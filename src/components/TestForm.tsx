"use client";

import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  InputControl,
  NumberInputControl,
  CheckboxControl,
  SelectControl,
  TextareaControl,
} from "@/components/ui/form-controls";

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  age: z
    .number()
    .min(18, {
      message: "You must be at least 18 years old.",
    })
    .max(120, {
      message: "Age cannot be more than 120.",
    }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  bio: z
    .string()
    .max(500, {
      message: "Bio cannot be more than 500 characters.",
    })
    .optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

// Infer TypeScript type from the schema
type FormData = z.infer<typeof formSchema>;

export function TestForm() {
  // Initialize form with react-hook-form and zod resolver
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      age: undefined,
      country: undefined,
      bio: "",
      termsAccepted: false,
    },
    mode: "onChange", // Enable validation on change
  });

  function onSubmit(data: FormData) {
    console.log("Form submitted:", data);
    // Handle form submission (e.g., API call)
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-6 max-w-md mx-auto p-6 border rounded-lg shadow-sm"
        >
          <h2 className="text-2xl font-bold">User Registration</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Try typing in a field and then delete the content to see validation
            errors. Fields with errors will have red labels.
          </p>

          <div className="space-y-4">
            <InputControl
              name="name"
              label="Full Name"
              required
              placeholder="John Doe"
            />

            <InputControl
              name="email"
              label="Email Address"
              type="email"
              required
              placeholder="john@example.com"
            />

            <NumberInputControl
              name="age"
              label="Age"
              required
              min={18}
              max={120}
              placeholder="25"
            />

            <SelectControl
              name="country"
              label="Country"
              required
              placeholder="Select your country"
              options={[
                { value: "us", label: "United States" },
                { value: "ca", label: "Canada" },
                { value: "uk", label: "United Kingdom" },
                { value: "au", label: "Australia" },
                { value: "jp", label: "Japan" },
              ]}
            />

            <TextareaControl
              name="bio"
              label="Bio"
              placeholder="Tell us about yourself"
              description="Optional: Maximum 500 characters"
              rows={4}
            />

            <CheckboxControl
              name="termsAccepted"
              label="I accept the terms and conditions"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
