import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, changeListSelector, listActions } from '../../store';
import { StatusName } from './StatusName';
import { Card } from '../UI';

import { entriesHandler } from '../../utils/entriesHandler';
import { statusList } from '../../constants';
import { StatusItem } from '../../types';

import classes from './BookStatus.module.scss';

export const BookStatus = () => {
  const currentList = useSelector(changeListSelector);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  const onActiveHandler = (status: StatusItem) => {
    const entries = entriesHandler(searchParams);

    setSearchParams({
      ...entries,
      list: status.id.toString(),
    });
  };

  useEffect(() => {
    const list = searchParams.get('list');

    dispatch(listActions.changeCurrentList(list));
  }, [searchParams, dispatch]);

  return (
    <Card>
      <ul className={classes.lists}>
        {statusList.map((status) => (
          <StatusName
            onClick={() => onActiveHandler(status)}
            key={status.id}
            title={status.title}
            isActive={currentList.title}
          />
        ))}
      </ul>
    </Card>
  );
};
