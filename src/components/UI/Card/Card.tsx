import classes from './Card.module.scss';

interface CardProps {
  children: JSX.Element | JSX.Element[];
}

export const Card = ({ children }: CardProps) => {
  return <div className={classes.card}>{children}</div>;
};
