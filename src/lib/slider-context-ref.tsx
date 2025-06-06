"use client";

import * as React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { createPortal } from "react-dom";

type SliderContextRefOptions = {
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  onClose?: () => void;
};

type SliderContentProps = {
  component: React.ComponentType<Record<string, unknown>>;
  props?: Record<string, unknown>;
  options?: SliderContextRefOptions;
  onClose: () => void;
  open: boolean;
};

// Context to manage the slider state
const SliderContext = React.createContext<{
  open: <T extends React.ComponentType<Record<string, unknown>>>(
    component: T,
    props?: React.ComponentProps<T>,
    options?: SliderContextRefOptions
  ) => void;
  close: () => void;
} | null>(null);

// Internal component to render the slider content
const SliderContent = ({
  component: Component,
  props = {},
  options = {},
  onClose,
  open,
}: SliderContentProps) => {
  const [isSheetOpen, setIsSheetOpen] = React.useState(open);
  const { side = "right", className = "" } = options;

  // Handle closing with animation
  const handleClose = React.useCallback(() => {
    setIsSheetOpen(false);
    // Wait for animation to complete before fully removing
    setTimeout(() => {
      onClose();
      options.onClose?.();
    }, 300); // Match the duration from the sheet component
  }, [onClose, options]);

  // Update open state if parent state changes
  React.useEffect(() => {
    setIsSheetOpen(open);
  }, [open]);

  return (
    <Sheet open={isSheetOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent side={side} className={className}>
        <Component {...props} onClose={handleClose} />
      </SheetContent>
    </Sheet>
  );
};

// Provider component
export const SliderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sliderState, setSliderState] = React.useState<{
    component: React.ComponentType<Record<string, unknown>> | null;
    props?: Record<string, unknown>;
    options?: SliderContextRefOptions;
    key: number;
  }>({
    component: null,
    props: {},
    options: {},
    key: 0,
  });

  const open = React.useCallback(
    <T extends React.ComponentType<Record<string, unknown>>>(
      component: T,
      props?: React.ComponentProps<T>,
      options?: SliderContextRefOptions
    ) => {
      setSliderState({
        component,
        props,
        options,
        key: Date.now(), // Ensure a new instance on each open
      });
    },
    []
  );

  const close = React.useCallback(() => {
    setSliderState((prev) => ({
      ...prev,
      component: null,
    }));
  }, []);

  return (
    <SliderContext.Provider value={{ open, close }}>
      {children}
      {sliderState.component &&
        createPortal(
          <SliderContent
            key={sliderState.key}
            component={sliderState.component}
            props={sliderState.props}
            options={sliderState.options}
            onClose={close}
            open={!!sliderState.component}
          />,
          document.body
        )}
    </SliderContext.Provider>
  );
};

// Hook to use the slider
export const useSlider = () => {
  const context = React.useContext(SliderContext);
  if (!context) {
    throw new Error("useSlider must be used within a SliderProvider");
  }
  return context;
};

// Namespace for better organization (like Angular Material)
export const SliderContextRef = {
  Provider: SliderProvider,
  useSlider,
};

export default SliderContextRef;
