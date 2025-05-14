"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { capitalize, cn } from "@/lib/utils";
import { Check } from "lucide-react";
import * as React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  options: (string | { label: string; value: string })[];
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
  options,
}: FormSelectProps<T>) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number | null>(null);

  const updateWidth = React.useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTriggerWidth(rect.width);
    }
  }, []);

  React.useEffect(() => {
    if (!triggerRef.current) return;

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(triggerRef.current);

    window.addEventListener("resize", updateWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, [updateWidth]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedLabel =
          options.find((opt) =>
            typeof opt === "string"
              ? opt === field.value
              : opt.value === field.value,
          ) || "";

        const displayLabel =
          typeof selectedLabel === "string"
            ? selectedLabel
            : selectedLabel?.label || "";

        return (
          <FormItem>
            <FormControl>
              <div className="relative">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      ref={triggerRef}
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      disabled={disabled}
                      className={cn(
                        "peer h-[60px] w-full justify-between pl-3 pt-4 text-muted-foreground outline-none",
                        open &&
                          "ring-2 ring-primary ring-offset-1 ring-offset-accent",
                        field.value && "text-foreground",
                      )}
                    >
                      {displayLabel ? capitalize(displayLabel) : ""}
                      <span
                        className={cn(
                          "absolute left-3 top-1/2 -translate-y-1/2 text-base capitalize text-muted-foreground transition-all peer-focus:top-3 peer-focus:text-sm peer-focus:text-primary",
                          open && "top-3 text-sm text-primary",
                          field.value && "top-3 text-sm",
                        )}
                      >
                        {label || name}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0"
                    style={{ width: triggerWidth ?? "auto" }}
                    align="start"
                  >
                    <Command>
                      <CommandInput placeholder="Search..." />
                      <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                          {options.map((option) => {
                            const value =
                              typeof option === "string"
                                ? option
                                : option.value;
                            const label =
                              typeof option === "string"
                                ? option
                                : option.label;
                            return (
                              <CommandItem
                                key={value}
                                value={value}
                                onSelect={() => {
                                  field.onChange(value);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {capitalize(label)}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
