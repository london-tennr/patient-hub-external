# ActionButton Component

## Overview

The ActionButton component is a smart button designed to handle asynchronous actions with built-in state management and visual feedback. It automatically transitions through states (idle → loading → success/error) and provides smooth animations to communicate the action's progress to users. It's ideal for operations like form submissions, API calls, data mutations, and any action that requires user feedback.

## What It Is

The ActionButton is a self-contained button component that:

- **Manages Async Actions**: Handles Promise-based operations with automatic state transitions
- **Provides Visual Feedback**: Shows loading, success, and error states with animated transitions
- **Expands on Interaction**: Transforms from a compact icon-only button to an expanded button with text
- **Handles Errors Gracefully**: Automatically catches and displays errors, with special handling for cancellation
- **Supports Callbacks**: Provides hooks for success and error handling
- **Customizable**: Allows customization of icons, text, and styling for each state

### Key Features

- **State Management**: Automatically manages idle, loading, success, and error states
- **Animated Transitions**: Smooth layout animations using Framer Motion
- **Error Handling**: Built-in error catching with special "cancelled" error handling
- **Post-Action Handlers**: Supports different click behaviors after success or error states
- **Accessible**: Properly disabled during loading to prevent double-clicks
- **Flexible Styling**: State-specific className props for custom styling

## When to Use

Use the ActionButton component when you need to:

1. **Async Operations**: Handle any asynchronous action that requires user feedback

   - Form submissions
   - API calls (create, update, delete operations)
   - File uploads
   - Data mutations
   - Background job triggers

2. **Visual State Feedback**: Provide clear visual indication of action progress

   - Save operations
   - Submit buttons
   - Add/remove actions
   - Approval/rejection workflows
   - Status changes

3. **Compact UI**: Need a space-efficient button that expands to show status

   - Toolbars
   - Action panels
   - Dense interfaces
   - Mobile-friendly interfaces

4. **Error Recovery**: Need built-in error handling with user-friendly error states

   - Network requests that might fail
   - Operations that can be cancelled
   - Actions requiring retry logic

5. **Success Confirmation**: Provide immediate visual confirmation of successful actions

   - Add to cart/collection
   - Save confirmations
   - Status updates
   - Quick actions

## When NOT to Use

Avoid using the ActionButton component when:

1. **Synchronous Actions**: The action is immediate and doesn't require loading states

   - Navigation buttons (use a regular Button or Link)
   - Toggle switches (use a Switch component)
   - Simple state changes (use a regular Button)
   - Modal triggers (use a regular Button)

2. **Multiple Actions**: You need a button that performs different actions based on context

   - Context menus (use a DropdownMenu)
   - Multi-purpose buttons (use a regular Button with conditional logic)
   - Navigation buttons (use a NavLink or Button)

3. **Static Content**: The button doesn't need to show dynamic state changes

   - Static links
   - Navigation items
   - Simple form buttons that don't submit
   - Display-only buttons

4. **Complex State Management**: You need more control over state transitions than the component provides

   - Multi-step workflows (use a Wizard or Stepper)
   - Complex form validation flows
   - Custom state machines

5. **Non-Interactive Elements**: The element doesn't trigger an action

   - Status indicators (use a Badge or Status component)
   - Display-only icons
   - Labels or headings

6. **Immediate Feedback Not Needed**: The action is so fast that loading states would be jarring

   - Local state updates
   - UI-only interactions
   - Instant toggles

## Usage Example

```tsx
import { ActionButton } from "@tennr/lasso/action-button";

function MyComponent() {
  const handleSave = async () => {
    // Simulate API call
    const response = await fetch("/api/save", {
      method: "POST",
      body: JSON.stringify({ data: "example" }),
    });
    if (!response.ok) throw new Error("Save failed");
    return response.json();
  };

  return (
    <ActionButton
      onClick={handleSave}
      loadingText="Saving..."
      successText="Saved!"
      errorText="Failed to save"
      onSuccess={(result) => {
        console.log("Save successful:", result);
      }}
      onError={(error) => {
        console.error("Save error:", error);
      }}
    />
  );
}
```

### Example with Post-Success Action

```tsx
<ActionButton
  onClick={async () => {
    await saveData();
  }}
  postSuccessClick={async () => {
    // Reset to idle state after success
    // This allows the button to be clicked again
  }}
  loadingText="Adding..."
  successText="Added!"
/>
```

### Example with Custom Icons and Styling

```tsx
import { Icon } from "@iconify/react";

import { ActionButton } from "@tennr/lasso/action-button";

<ActionButton
  onClick={handleAction}
  idleIcon={<Icon icon="ph:plus-circle-light" className="h-5 w-5" />}
  successIcon={<Icon icon="ph:check-circle-light" className="h-5 w-5" />}
  errorIcon={<Icon icon="ph:x-circle-light" className="h-5 w-5" />}
  className="bg-blue-600 hover:bg-blue-700"
  successClassName="bg-green-600"
  errorClassName="bg-red-600"
/>;
```

## Props Reference

### ActionButtonProps

- `onClick`: `(event?: React.MouseEvent<HTMLElement>) => Promise<unknown>` - **Required**. The async function to execute when the button is clicked
- `loadingText`: `string` - Text to display during loading state (default: "Loading...")
- `successText`: `string` - Text to display on success (default: "Success")
- `errorText`: `string` - Text to display on error (default: "Error")
- `className`: `string` - Base CSS classes for the button
- `idleIcon`: `React.ReactNode` - Icon to display in idle state (default: Plus icon)
- `successIcon`: `React.ReactNode` - Icon to display in success state (default: Check icon)
- `errorIcon`: `React.ReactNode` - Icon to display in error state (default: X icon)
- `onSuccess`: `(result: unknown) => void` - Callback fired when action succeeds
- `onError`: `(error: unknown) => void` - Callback fired when action fails
- `postSuccessClick`: `(event?: React.MouseEvent<HTMLElement>) => Promise<unknown>` - Handler for clicks when in success state
- `postErrorClick`: `(event?: React.MouseEvent<HTMLElement>) => Promise<unknown>` - Handler for clicks when in error state
- `loadingClassName`: `string` - Additional CSS classes applied during loading state
- `successClassName`: `string` - Additional CSS classes applied during success state
- `errorClassName`: `string` - Additional CSS classes applied during error state
- `defaultState`: `ActionButtonState` - Initial state of the button (default: "idle")

### ActionButtonState

- `"idle"` - Initial state, shows only the icon
- `"loading"` - Action in progress, shows spinner and loading text
- `"success"` - Action completed successfully, shows success icon and text
- `"error"` - Action failed, shows error icon and text

## State Behavior

1. **Idle → Loading**: When clicked, the button expands and shows loading state
2. **Loading → Success**: If the Promise resolves, transitions to success state
3. **Loading → Error**: If the Promise rejects, transitions to error state
4. **Loading → Idle**: If error message is "cancelled", returns to idle state
5. **Success/Error → Action**: Clicking in success or error state triggers `postSuccessClick` or `postErrorClick` respectively

## Error Handling

The component has special handling for cancellation:

- If an error is thrown with `message === "cancelled"`, the button returns to idle state instead of error state
- This is useful for operations that can be cancelled by the user
- All other errors transition to the error state

## Accessibility

The ActionButton component includes accessibility features:

- Button is disabled during loading state to prevent double-clicks
- Proper button semantics for screen readers
- Visual state changes are clear and distinct
- Keyboard accessible (standard button behavior)

## Related Components

- For simple buttons without async state management, use the `Button` component
- For form submissions, consider using ActionButton with form validation
- For multiple related actions, use a `ButtonGroup` with multiple ActionButtons
- For destructive actions, use ActionButton with `errorClassName` for appropriate styling
