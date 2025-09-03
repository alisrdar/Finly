/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Controller } from "react-hook-form";
import type {
  Control,
  RegisterOptions,
  FieldValues,
  Path,
  ControllerRenderProps,
  ControllerFieldState
} from "react-hook-form";

export interface InputProps<T extends FieldValues> {
  id?: string;
  name: Path<T>;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
  control: Control<T>;
  label?: string;
  rules?: RegisterOptions<T, Path<T>>;
  render?: (field: ControllerRenderProps<T>, fieldState: ControllerFieldState) => React.ReactNode;
}

const Input = <T extends FieldValues>({
  id,
  name,
  type = "text",
  placeholder,
  control,
  label,
  rules,
  render,
  className = "",
}: InputProps<T> & { className?: string }) => {
  
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={"" as any} // Always start with empty string
      render={({ field, fieldState }) => {
        
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          
          switch (type) {
            case "number":
              if (value === "") {
                field.onChange("");
              } else {
                const numValue = parseFloat(value);
                field.onChange(isNaN(numValue) ? "" : numValue);
              }
              break;
              
            case "date":
              // Validate date format
              field.onChange(value);
              break;
              
            default:
              field.onChange(value);
          }
        };

        // Ensure value is never undefined/null
        const displayValue = field.value ?? "";
        
        return (
          <div className="space-y-1">
            {/* Label */}
            {label && (
              <label
                htmlFor={id}
                className="block text-sm font-medium text-foreground"
              >
                {label}
              </label>
            )}

            {render ? (
              render(field, fieldState)
            ) : (
              <input
                {...field}
                id={id}
                type={type}
                placeholder={placeholder}
                className={`
                  w-full px-3 py-2 rounded-lg border 
                  ${fieldState.error ? 'border-red-500' : 'border-border'} 
                  bg-accent shadow-sm placeholder-muted-foreground 
                  text-foreground focus:outline-none focus:ring-2 
                  focus:ring-primary focus:border-primary 
                  sm:text-sm transition-colors
                  ${className}
                `}
                value={displayValue}
                onChange={handleChange}
              />
            )}

            {/* Error */}
            {fieldState.error && (
              <span className="text-xs text-red-500 mt-1 block">
                {fieldState.error.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};

export default Input;
