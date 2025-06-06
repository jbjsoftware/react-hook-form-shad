"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

// Example component that will be shown in the slider
export const SliderContent = ({
  title = "Slider Title",
  description = "This is a description of the slider content.",
  onClose,
  data,
}: {
  title?: string;
  description?: string;
  onClose?: () => void;
  data?: Record<string, unknown>;
}) => {
  return (
    <>
      <SheetHeader>
        <SheetTitle>{title}</SheetTitle>
        <SheetDescription>{description}</SheetDescription>
        {data && (
          <div className="mt-4 text-sm">
            <h3 className="font-medium mb-2">Passed Data:</h3>
            <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </SheetHeader>
      <div className="p-4 flex-1">
        <p>This is the main content area of the slider.</p>
        <p className="text-muted-foreground mt-2">
          You can put any content here that you want to display.
        </p>
      </div>
      <SheetFooter>
        <Button onClick={onClose}>Close</Button>
      </SheetFooter>
    </>
  );
};

export default SliderContent;
