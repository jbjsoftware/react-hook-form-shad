"use client";

import { TestForm } from "@/components/TestForm";

export default function TestFormPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Form Controls Demo
      </h1>
      <div className="max-w-2xl mx-auto">
        <TestForm />
      </div>
    </main>
  );
}
