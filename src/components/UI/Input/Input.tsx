import { useState } from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

import classes from './Input.module.scss';

interface InputProps {
  register?: UseFormRegisterReturn;
  label?: string;
  id: string;
  type: string;
  autoFocus?: boolean;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: () => void;
  value?: string;
}

export const Input = ({
  register,
  label,
  id,
  type,
  autoFocus,
  placeholder,
  error,
  onChange,
  onClick,
  value,
}: InputProps) => {
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
        autoComplete="off"
        onChange={onChange}
        value={value}
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
      {id === 'search' && !!value?.length && (
        <button onClick={onClick} type="button" className={classes.input__del}>
          ×
        </button>
      )}
      {error && <p className={classes.input__error}>{error}</p>}
    </div>
  );
};
