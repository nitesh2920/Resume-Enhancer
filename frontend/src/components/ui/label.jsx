export const Label = ({ children, className = "", ...props }) => (
  <label
    className={`text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300 ${className}`}
    {...props}
  >
    {children}
  </label>
);