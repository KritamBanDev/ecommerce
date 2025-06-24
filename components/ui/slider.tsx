"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

interface SliderProps extends Omit<React.ComponentProps<typeof SliderPrimitive.Root>, 'value' | 'defaultValue' | 'min' | 'max' | 'className'> {
  className?: string;
  defaultValue?: number[];
  value?: number[];
  min?: number;
  max?: number;
  showValueLabel?: boolean;
  valueLabelFormatter?: (value: number) => string;
}

const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(
  (
    {
      className,
      defaultValue,
      value,
      min = 0,
      max = 100,
      showValueLabel = false,
      valueLabelFormatter = (v: number) => v.toString(),
      ...props
    },
    ref
  ) => {
    const _values = React.useMemo(
      () =>
        Array.isArray(value)
          ? value
          : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
      [value, defaultValue, min, max]
    )

    return (
      <SliderPrimitive.Root
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        className={cn(
          "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
          className
        )}
        ref={ref as React.Ref<HTMLDivElement>}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <React.Fragment key={index}>
            <SliderPrimitive.Thumb
              data-slot="slider-thumb"
              className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
            />
            {showValueLabel && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-semibold bg-primary text-white px-2 py-0.5 rounded shadow-md select-none pointer-events-none animate-fade-in">
                {valueLabelFormatter(_values[index])}
              </span>
            )}
          </React.Fragment>
        ))}
        <style jsx global>{`
          .animate-fade-in {
            animation: fadeIn 0.5s ease-in;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </SliderPrimitive.Root>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }