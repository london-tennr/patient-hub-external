import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

/**
 * Collapsible Component
 *
 * A simple expand/collapse container for showing and hiding content. The Collapsible
 * is the building block for expandable sections - it provides the state management and
 * accessibility features while leaving visual styling entirely to the consumer.
 * Built on top of Radix UI's Collapsible primitive for the Tennr design system.
 *
 * @see [Radix UI Collapsible](https://www.radix-ui.com/primitives/docs/components/collapsible)
 *
 * @see [Lasso Collapsible README](https://github.com/Tennr-Inc/Tennr/blob/main/libs/lasso/src/collapsible/README.md)
 *
 * @example
 * ```tsx
 * <Collapsible open={isOpen} onOpenChange={setIsOpen}>
 *   <CollapsibleTrigger>Toggle Content</CollapsibleTrigger>
 *   <CollapsibleContent>Hidden content here</CollapsibleContent>
 * </Collapsible>
 * ```
 */
function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

/**
 * CollapsibleTrigger - The clickable element that toggles the collapsible content.
 *
 * Can be used directly or with `asChild` to render a custom trigger element
 * while preserving all accessibility features and event handling.
 *
 * @param asChild - When true, the trigger will render its child element instead of a button
 * @param className - Additional CSS classes to apply to the trigger
 */
function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

/**
 * CollapsibleContent - The container for content that will be shown/hidden.
 *
 * This content is mounted/unmounted based on the open state of the parent Collapsible.
 * For animation support, consider using CSS transitions or animation libraries
 * with the `data-state` attribute which is set to "open" or "closed".
 *
 * @param forceMount - When true, content remains in the DOM when closed (useful for animations)
 * @param className - Additional CSS classes to apply to the content container
 */
function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
