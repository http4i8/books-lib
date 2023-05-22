import { useState } from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

import classes from '../Inputs.module.scss';

interface FormInputProps {
  register?: UseFormRegisterReturn;
  label?: string;
  id: string;
  type: string;
  autoFocus?: boolean;
  placeholder?: string;
  error?: string;
}

export const FormInput = ({
  register,
  label,
  id,
  type,
  autoFocus,
  placeholder,
  error,
}: FormInputProps) => {
  const close = classes.input__iconEye;
  const open = classes.input__iconEye_open;

  const [eye, setEye] = useState(close);

  const toggleEye = () => {
    eye === close ? setEye(open) : setEye(close);
  };

  return (
    <div className={classes.input}>
      <input
        {...register}
        id={id}
        type={
          type === 'password' ? (eye === close ? 'password' : 'text') : type
        }
        placeholder={placeholder ? placeholder : ' '}
        className={classes.input__field}
        autoFocus={type === 'email' ? autoFocus : false}
      />
      <label htmlFor={id} className={classes.input__label}>
        {label}
      </label>
      {type === 'password' && eye && (
        <button
          type="button"
          className={eye === close ? close : open}
          onClick={toggleEye}
        ></button>
      )}
      {error && <p className={classes.input__error}>{error}</p>}
    </div>
  );
};
