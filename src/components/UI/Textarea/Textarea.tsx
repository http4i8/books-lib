import { UseFormRegisterReturn } from 'react-hook-form';

import classes from '../Input/Input.module.scss';

interface TextAreaProps {
  register: UseFormRegisterReturn;
  label: string;
  id: string;
  placeholder?: string;
  error?: string;
}

export const Textarea = ({
  register,
  label,
  id,
  placeholder,
  error,
}: TextAreaProps) => {
  return (
    <div className={classes.input}>
      <textarea
        {...register}
        id={id}
        placeholder={placeholder ? placeholder : ' '}
        className={`${classes.input__field} ${classes.textarea__field}`}
      ></textarea>
      <label htmlFor={id} className={classes.input__label}>
        {label}
      </label>
      {error && <p className={classes.input__error}>{error}</p>}
    </div>
  );
};
