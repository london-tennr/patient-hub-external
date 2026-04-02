import { FormBuilder } from "./form-builder";
/**
 * FormBuilder is a powerful component that automatically generates forms based on a field configuration.
 * It handles:
 * - Automatic schema generation
 * - Form validation
 * - Responsive layouts
 * - Multiple field types (Input, Select, DatePicker, Switch, Textarea)
 * - Custom field rendering
 *
 * Usage:
 * 1. Define your field configuration
 * 2. Generate the schema using getSchemaFromFieldConfig, make modifications as needed
 * 3. Set up react-hook-form with the schema, all actions controlled by you
 * 4. Render the FormBuilder component
 */
declare const _default: {
    title: string;
    component: typeof FormBuilder;
    parameters: {
        layout: string;
    };
};
export default _default;
export declare const BasicForm: () => import("react/jsx-runtime").JSX.Element;
export declare const ResponsiveForm: () => import("react/jsx-runtime").JSX.Element;
export declare const CustomFieldForm: () => import("react/jsx-runtime").JSX.Element;
export declare const AllFieldTypes: () => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=form-builder.stories.d.ts.map