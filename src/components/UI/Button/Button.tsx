import classes from './Button.module.scss';

interface BtnProps {
  type: string;
  disabled?: boolean;
  children: string | JSX.Element | JSX.Element[];
  onClick?: () => void;
}

export const Button = ({ disabled, children, onClick }: BtnProps) => {
  return (
    <button disabled={disabled} className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
};
