import classes from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={classes.spinner__container}>
      <div className={classes.spinner__loading}></div>
    </div>
  );
};
