import { motion } from 'framer-motion';

const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  whileHover = { scale: 1.02 },
  whileTap = { scale: 0.98 },
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors duration-200 ease-in-out rounded-md';

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'border border-primary text-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed',
    danger: 'bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed',
    'outline-red': 'border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={disabled ? {} : whileHover}
      whileTap={disabled ? {} : whileTap}
      onClick={disabled ? undefined : onClick}
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;