// Import React library for building the component
import React from "react";
// Import all exports from Radix UI Avatar primitive for building avatar components
import * as AvatarPrimitive from "@radix-ui/react-avatar";

/**
 * Utility function to join CSS class names, filtering out falsy values.
 * This is a simple implementation of a class name utility like clsx or classnames.
 */
const cn = (...classes) => classes.filter(Boolean).join(' ');

/**
 * Avatar component - A circular user avatar component using Radix UI primitives.
 * Displays user profile images with fallback support.
 * Props: className (string) - Additional CSS classes, ...props - Other props passed to Radix Avatar.Root
 */
const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  // Radix Avatar Root component with forwardRef for external ref access
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", // Base styles: circular, fixed size, no shrink
      className // Additional custom classes
    )}
    {...props} // Spread remaining props
  />
));
// Set display name for better debugging in React DevTools
Avatar.displayName = AvatarPrimitive.Root.displayName;

/**
 * AvatarImage component - Displays the actual avatar image.
 * Should be used as a child of Avatar component.
 * Props: className (string) - Additional CSS classes, ...props - Props passed to Radix Avatar.Image
 */
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  // Radix Avatar Image component with forwardRef
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)} // Maintain square aspect ratio, fill container
    {...props} // Spread props
  />
));
// Set display name for debugging
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

/**
 * AvatarFallback component - Displays fallback content when avatar image fails to load.
 * Typically shows initials or an icon.
 * Props: className (string) - Additional CSS classes, ...props - Props passed to Radix Avatar.Fallback
 */
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  // Radix Avatar Fallback component with forwardRef
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted", // Center content, circular background
      className // Additional classes
    )}
    {...props} // Spread props
  />
));
// Set display name for debugging
AvatarFallback.displayName = AvatarFallback.displayName;

// Export all avatar components for use in other parts of the application
export { Avatar, AvatarImage, AvatarFallback };
