import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { StatusName } from './StatusName';
import { Card } from '../UI';

import { entriesHandler } from '../../utils/entriesHandler';
import { statusList } from '../../constants';
import { StatusItem } from '../../types';

import classes from './BookStatus.module.scss';

export const BookStatus = () => {
  const [isActive, setIsActive] = useState({ id: 999, title: '' });

  const [searchParams, setSearchParams] = useSearchParams();

  const onActiveHandler = (status: StatusItem) => {
    const entries = entriesHandler(searchParams);

    setSearchParams({
      ...entries,
      list: status.id.toString(),
    });
  };

  useEffect(() => {
    const list = searchParams.get('list');
    const status = statusList.find((elm) => elm.id === Number(list));

    setIsActive(status || statusList[0]);
  }, [searchParams]);

  return (
    <Card>
      <ul className={classes.lists}>
        {statusList.map((status) => (
          <StatusName
            onClick={() => onActiveHandler(status)}
            key={status.id}
            title={status.title}
            isActive={isActive.title}
          />
        ))}
      </ul>
    </Card>
  );
};
