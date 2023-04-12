import { useState } from 'react';

import { StatusName } from './StatusName';
import { Card } from '../UI';

import { bookStatus } from '../../constants';

import classes from './BookStatus.module.scss';

export const BookStatus = () => {
  const [isActive, setIsActive] = useState(bookStatus[0]);

  const onActiveHandler = (title: string) => {
    setIsActive(title);
  };

  return (
    <Card>
      <ul className={classes.lists}>
        {bookStatus.map((status) => (
          <StatusName
            onClick={() => onActiveHandler(status)}
            key={status}
            title={status}
            isActive={isActive}
          />
        ))}
      </ul>
    </Card>
  );
};
