"use client";

import { Spinner } from "@phosphor-icons/react";
import { type, Type } from "arktype";
import * as React from "react";
import {
  FormProvider,
  type Control,
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
  type SubmitHandler,
  type UseFormReturn,
  type UseFormStateReturn,
} from "react-hook-form";

import { Button } from "../button/button";
import { Combobox } from "../combobox/combobox";
import { DatePicker } from "../date-picker/date-picker";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  Form as UIForm,
  FormField as UIFormField,
} from "../form/form";
import { Input } from "../input/input";
import { Switch } from "../switch/switch";
import { Textarea } from "../textarea/textarea";
import { cn } from "../utils/cn";

/**
 * Configuration options for a single form field in the FormBuilder.
 *
 * @example
 * ```tsx
 * const fieldConfig: Record<string, FieldConfig> = {
 *   email: {
 *     label: "Email Address",
 *     placeholder: "Enter your email",
 *     fieldType: "Input",
 *     width: "half",
 *   },
 * };
 * ```
 */
export interface FieldConfig {
  /** Label text displayed above the field. */
  label?: string;
  /** Help text displayed below the field. */
  description?: string;
  /** Placeholder text for Input and Textarea fields. */
  placeholder?: string;
  /** Additional CSS classes for the field container. */
  className?: string;
  /** Additional CSS classes for the field input element. */
  fieldClassName?: string;
  /** Additional CSS classes for the label element. */
  labelClassName?: string;
  /** Additional CSS classes for the description element. */
  descriptionClassName?: string;
  /** If true, the field is not rendered. Useful for conditional fields. */
  hidden?: boolean;
  /** Field width in the responsive 12-column grid. Defaults to "full". */
  width?: "full" | "half" | "third" | "quarter";
  /** @deprecated Use fieldType: "Textarea" instead. */
  isTextArea?: boolean;
  /** Custom render function for complete control over field rendering. */
  renderField?: (props: RenderFieldProps) => React.ReactNode;
  /** The type of field to render. Defaults to "Input". */
  fieldType?: "Input" | "Textarea" | "Switch" | "Select" | "DatePicker";
  /** Options for Select field type. Each string becomes a selectable option. */
  selectOptions?: string[];
}

/**
 * Props passed to custom field render functions.
 * Provides access to react-hook-form's field controller props.
 *
 * @template T - The form values type
 */
export interface RenderFieldProps<T extends FieldValues = FieldValues> {
  /** Field props from react-hook-form including value, onChange, onBlur, name, and ref. */
  field: ControllerRenderProps<T>;
  /** Field state including error, invalid, isTouched, and isDirty. */
  fieldState: ControllerFieldState;
  /** Overall form state including isSubmitting, isValid, errors, etc. */
  formState: UseFormStateReturn<T>;
}

/**
 * Generates an arktype validation schema from a field configuration object.
 *
 * This utility function creates a basic schema based on field types:
 * - Input/Textarea → string
 * - Switch → boolean
 * - Select → enum of selectOptions (or string if no options)
 * - DatePicker → string.date.parse
 *
 * The generated schema can be used as a starting point and modified to add
 * custom validation rules.
 *
 * @param fieldConfig - The field configuration object
 * @returns An arktype Type schema for form validation
 *
 * @example
 * ```tsx
 * const fieldConfig = {
 *   name: { fieldType: "Input" },
 *   active: { fieldType: "Switch" },
 * };
 * const schema = getSchemaFromFieldConfig(fieldConfig);
 * // Results in: type({ name: "string", active: "boolean" })
 * ```
 */
export function getSchemaFromFieldConfig(
  fieldConfig: Record<string, FieldConfig>,
): Type {
  const schemaShape: Record<string, Type> = {};

  for (const [fieldName, config] of Object.entries(fieldConfig)) {
    if (config.hidden) continue;

    switch (config.fieldType) {
      case "Input":
        schemaShape[fieldName] = type("string");
        break;
      case "Textarea":
        schemaShape[fieldName] = type("string");
        break;
      case "Switch":
        schemaShape[fieldName] = type("boolean");
        break;
      case "Select":
        if (config.selectOptions && config.selectOptions.length > 0) {
          schemaShape[fieldName] = type.enumerated(...config.selectOptions);
        } else {
          schemaShape[fieldName] = type("string");
        }
        break;
      case "DatePicker":
        schemaShape[fieldName] = type("string.date.parse");
        break;
      default:
        schemaShape[fieldName] = type("string");
    }
  }

  return type(schemaShape);
}

/**
 * Union type representing possible form field values.
 */
export type FormValues = Record<string, string | boolean | Date>;

/**
 * FormBuilder Component
 *
 * A powerful form generation component that automatically creates forms based on a
 * field configuration object. It integrates with react-hook-form for state management
 * and validation, supports multiple field types out of the box, and provides
 * responsive grid layouts.
 *
 * @see [react-hook-form](https://react-hook-form.com/)
 *
 * @see [Lasso FormBuilder README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/form-builder/README.md)
 *
 * @template T - The form values type, should extend FieldValues from react-hook-form
 *
 * @example
 * ```tsx
 * const form = useForm<FormData>({
 *   resolver: arktypeResolver(schema),
 *   defaultValues: { name: "", email: "" },
 * });
 *
 * <FormBuilder<FormData>
 *   form={form}
 *   fieldConfig={fieldConfig}
 *   onSubmit={(data) => console.log(data)}
 * >
 *   <SubmitButton>Submit</SubmitButton>
 * </FormBuilder>
 * ```
 */
export function FormBuilder<T extends FieldValues>({
  onSubmit,
  fieldConfig = {},
  className,
  children,
  form,
  onFieldChange,
}: {
  /** Handler called when form is submitted and validation passes. */
  onSubmit?: SubmitHandler<T>;
  /** Configuration object defining form fields. Keys become field names. */
  fieldConfig?: Record<string, FieldConfig>;
  /** Additional CSS classes for the form container. */
  className?: string;
  /** Content rendered after the form fields (typically SubmitButton). */
  children?: React.ReactNode;
  /** The react-hook-form instance returned by useForm(). Required. */
  form: UseFormReturn<T>;
  /** Callback fired when any field value changes. */
  onFieldChange?: (
    name: string,
    value: string | boolean | Date | undefined,
  ) => void;
}) {
  return (
    <UIForm {...form}>
      <form
        onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
        className={cn("space-y-4", className)}
      >
        <div className="grid grid-cols-12 gap-2">
          {Object.entries(fieldConfig).map(([name, config]) => {
            if (config.hidden) {
              return null;
            }

            const widthClasses = {
              full: "col-span-12",
              half: "col-span-6",
              third: "col-span-4",
              quarter: "col-span-3",
            };

            const widthClass = widthClasses[config.width || "full"];

            return (
              <div key={name} className={cn(widthClass, config.className)}>
                <DynamicFormField<T>
                  control={form.control}
                  name={name}
                  config={config}
                  label={config.label}
                  description={config.description}
                  placeholder={config.placeholder}
                  fieldClassName={config.fieldClassName}
                  labelClassName={config.labelClassName}
                  descriptionClassName={config.descriptionClassName}
                  renderField={
                    config.renderField as (
                      props: RenderFieldProps<T>,
                    ) => React.ReactNode
                  }
                  onFieldChange={onFieldChange}
                />
              </div>
            );
          })}
        </div>
        {children}
      </form>
    </UIForm>
  );
}

/**
 * DynamicFormField - Internal component that renders a single form field.
 *
 * This component handles the rendering of individual fields based on the
 * provided configuration, including custom render functions if specified.
 *
 * @internal
 * @template T - The form values type
 */
function DynamicFormField<T extends FieldValues>({
  control,
  name,
  config,
  label,
  description,
  placeholder,
  fieldClassName,
  labelClassName,
  descriptionClassName,
  renderField,
  onFieldChange,
}: {
  /** The react-hook-form control object. */
  control: Control<T>;
  /** The field name (key from fieldConfig). */
  name: string;
  /** The field configuration object. */
  config: FieldConfig;
  /** Label text displayed above the field. */
  label?: string;
  /** Help text displayed below the field. */
  description?: string;
  /** Placeholder text for the field. */
  placeholder?: string;
  /** Additional CSS classes for the field input. */
  fieldClassName?: string;
  /** Additional CSS classes for the label. */
  labelClassName?: string;
  /** Additional CSS classes for the description. */
  descriptionClassName?: string;
  /** Custom render function for the field. */
  renderField?: (props: RenderFieldProps<T>) => React.ReactNode;
  /** Callback fired when the field value changes. */
  onFieldChange?: (
    name: string,
    value: string | boolean | Date | undefined,
  ) => void;
}) {
  return (
    <UIFormField
      control={control}
      name={name as Path<T>}
      render={({
        field,
        fieldState: _fieldState,
        formState: _formState,
      }: {
        field: ControllerRenderProps<T>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<T>;
      }) => (
        <FormItem>
          {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
          <FormControl className={fieldClassName}>
            {renderField
              ? renderField({
                  field,
                  fieldState: _fieldState,
                  formState: _formState,
                })
              : renderFieldByType<T>(config, field, placeholder, onFieldChange)}
          </FormControl>
          {description && (
            <FormDescription className={descriptionClassName}>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/**
 * SubmitButton Component
 *
 * A specialized submit button that integrates with FormBuilder's form context
 * to automatically display loading state during form submission. Shows a spinner
 * and customizable loading text while the form is being submitted.
 *
 * @param children - Button content when not submitting
 * @param className - Additional CSS classes
 * @param variant - Button variant, defaults to "default"
 * @param loadingText - Text displayed while submitting, defaults to "Submitting..."
 *
 * @example
 * ```tsx
 * <FormBuilder form={form} onSubmit={handleSubmit}>
 *   {/* form fields *\/}
 *   <SubmitButton loadingText="Saving...">Save Changes</SubmitButton>
 * </FormBuilder>
 * ```
 */
export function SubmitButton({
  children,
  className,
  variant = "default",
  loadingText = "Submitting...",
  ...props
}: React.ComponentProps<typeof Button> & {
  /** Text displayed while the form is submitting. Defaults to "Submitting...". */
  loadingText?: string;
}) {
  const form = React.useContext(
    FormProvider as unknown as React.Context<UseFormReturn<FieldValues>>,
  );
  const isSubmitting = form?.formState?.isSubmitting;

  return (
    <Button
      type="submit"
      variant={variant}
      className={cn("w-full", className)}
      disabled={isSubmitting}
      {...props}
    >
      {isSubmitting ? (
        <>
          <Spinner weight="light" className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

/**
 * Renders the appropriate field component based on the fieldType configuration.
 *
 * @internal
 * @template T - The form values type
 * @param config - The field configuration
 * @param field - The react-hook-form field controller props
 * @param placeholder - Optional placeholder text
 * @param onFieldChange - Optional callback for field value changes
 * @returns The rendered field component
 */
function renderFieldByType<T extends FieldValues>(
  config: FieldConfig,
  field: ControllerRenderProps<T>,
  placeholder?: string,
  onFieldChange?: (
    name: string,
    value: string | boolean | Date | undefined,
  ) => void,
) {
  const fieldType = config.fieldType || "Input";

  const handleChange = (value: string | boolean | Date | undefined) => {
    field.onChange(value);
    onFieldChange?.(field.name, value);
  };

  switch (fieldType) {
    case "Input":
      return (
        <Input
          {...field}
          placeholder={placeholder}
          value={field.value || ""}
          onChange={(e) => handleChange(e.target.value)}
        />
      );
    case "Textarea":
      return (
        <Textarea
          {...field}
          placeholder={placeholder}
          value={field.value || ""}
          onChange={(e) => handleChange(e.target.value)}
        />
      );
    case "Switch":
      return (
        /* TODO: Update both Switch component and default Switch styling in FormBuilder */
        <div className="flex h-full w-full justify-items-center items-center justify-between">
          <Switch
            checked={field.value}
            onCheckedChange={(checked) => handleChange(checked)}
          />
          <FormLabel>{field.name}</FormLabel>
        </div>
      );
    case "Select":
      if (config.selectOptions && config.selectOptions.length > 0) {
        return (
          <Combobox
            options={config.selectOptions.map((opt) => ({
              value: opt,
              label: opt,
            }))}
            value={field.value}
            onValueChange={(value) => handleChange(value)}
          />
        );
      }
      return (
        <Input
          {...field}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
        />
      );
    case "DatePicker":
      return (
        <DatePicker
          date={field.value}
          onDateChange={(date) => {
            handleChange(date);
          }}
          className="w-full"
        />
      );
    default:
      return (
        <Input
          {...field}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
        />
      );
  }
}
