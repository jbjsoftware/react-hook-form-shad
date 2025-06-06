"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import SliderContextRef from "@/lib/slider-context-ref";
import SliderContent from "@/components/example-slider-component";

export default function SliderExamplePage() {
  // Use the slider hook
  const { open, close } = SliderContextRef.useSlider();

  // Function to open the slider with default options
  const handleOpenSlider = () => {
    open(SliderContent, {
      title: "Example Slider",
      description: "This slider was opened programmatically",
      data: {
        timestamp: new Date().toISOString(),
        example: "This is example data passed to the slider",
      },
    });
  };

  // Function to open the slider with custom options
  const handleOpenCustomSlider = () => {
    open(
      SliderContent,
      {
        title: "Custom Side Slider",
        description: "This slider opens from the bottom",
        data: {
          custom: true,
          options: "Using custom options",
        },
      },
      {
        side: "bottom",
        className: "h-1/2", // Half height for bottom slider
        onClose: () => {
          console.log("Slider closed with custom onClose handler!");
        },
      }
    );
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Slider Context Example</h1>

      <div className="flex flex-col gap-4 md:flex-row">
        <Button onClick={handleOpenSlider}>Open Default Slider</Button>

        <Button onClick={handleOpenCustomSlider} variant="outline">
          Open Bottom Slider
        </Button>

        <Button onClick={close} variant="destructive">
          Close Any Open Slider
        </Button>
      </div>

      <div className="mt-8 p-6 border rounded-md bg-gray-50 dark:bg-gray-900">
        <h2 className="text-lg font-semibold mb-4">How It Works</h2>
        <p className="mb-4">
          The SliderContextRef service allows you to open a slider component
          programmatically, similar to Angular Material&apos;s dialog service.
        </p>
        <p className="mb-4">
          You can pass any component to the <code>open()</code> method along
          with props and options.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Use <code>open(Component, props, options)</code> to open a slider
          </li>
          <li>
            Use <code>close()</code> to close any open slider
          </li>
          <li>Control the side, animation, and other options</li>
        </ul>
      </div>
    </div>
  );
}
