import { MouseEvent } from 'react';

import classes from './DropdownElm.module.scss';

interface DropdownElmProps {
  title: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const DropdownElm = ({ title, onClick }: DropdownElmProps) => {
  return (
    <li className={classes.dropdown__item}>
      <button
        type="button"
        onClick={onClick}
        className={classes.dropdown__itemBtn}
      >
        {title}
      </button>
    </li>
  );
};
