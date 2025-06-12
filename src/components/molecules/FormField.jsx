import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';

const FormField = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  className = '',
  options = [], // For select type
  rows, // For textarea type
  ...props
}) => {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-1">
        {label} {props.required && '*'}
      </Label>
      {type === 'textarea' ? (
        <Input
          type="textarea"
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          hasError={!!error}
          rows={rows}
          {...props}
        />
      ) : type === 'select' ? (
        <Input
          type="select"
          id={id}
          value={value}
          onChange={onChange}
          hasError={!!error}
          options={options}
          {...props}
        />
      ) : (
        <Input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          hasError={!!error}
          {...props}
        />
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default FormField;