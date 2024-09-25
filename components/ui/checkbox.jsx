import React from 'react';

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
    <input
        type="checkbox"
        ref={ref}
        className={`h-4 w-4 rounded border border-primary text-primary focus:ring-primary ${className}`}
        {...props}
    />
));

Checkbox.displayName = "Checkbox";

export { Checkbox };