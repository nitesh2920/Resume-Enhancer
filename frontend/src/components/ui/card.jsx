const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 backdrop-blur-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "", variant = "default", ...props }) => {
  const variants = {
    default: "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950",
    summary: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950",
    experience: "bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950",
    education: "bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950",
    skills: "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950"
  };
  
  return (
    <div
      className={`flex flex-col space-y-1.5 p-6 rounded-t-xl ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

export {
  Card,
  CardHeader,

  CardContent,
}
