import classes from '../Inputs.module.scss';

interface InputProps {
  label?: string;
  id: string;
  type: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: () => void;
  value?: string;
}

export const Input = ({
  label,
  id,
  type,
  placeholder,
  onChange,
  onClick,
  value,
}: InputProps) => {
  return (
    <div className={classes.input}>
      <input
        id={id}
        type={type}
        placeholder={placeholder ? placeholder : ' '}
        className={classes.input__field}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      <label htmlFor={id} className={classes.input__label}>
        {label}
      </label>
      {id === 'search' && !!value?.length && (
        <button onClick={onClick} type="button" className={classes.input__del}>
          ×
        </button>
      )}
    </div>
  );
};
