import classes from '../BookStatus.module.scss';

interface listProps {
  title: string;
  isActive: string;
  onClick: () => void;
}

export const StatusName = ({ title, isActive, onClick }: listProps) => {
  const highlight =
    isActive === title
      ? `${classes.list__button} ${classes.active}`
      : classes.list__button;

  return (
    <li className={classes.list}>
      <button onClick={onClick} type="button" className={highlight}>
        {title}
      </button>
    </li>
  );
};
