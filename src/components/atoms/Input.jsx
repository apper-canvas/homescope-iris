const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = '',
  hasError = false,
  options = [], // For select type
  ...props
}) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors';
  const errorClasses = hasError ? 'border-red-500' : 'border-gray-300';

  if (type === 'select') {
    return (
      <select
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (type === 'textarea') {
    return (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseClasses} ${errorClasses} resize-none ${className}`}
        {...props}
      />
    );
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    />
  );
};

export default Input;