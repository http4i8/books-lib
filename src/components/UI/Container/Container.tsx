import classes from './Container.module.scss';

interface ContsinerProps {
  children: JSX.Element | JSX.Element[];
}

export const Container = ({ children }: ContsinerProps) => {
  return <div className={classes.container}>{children}</div>;
};
