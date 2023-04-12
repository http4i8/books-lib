import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { AppDispatch, fetchBooksList } from '../../../../../store';
import { BookCards, MobileBookCards } from './components';
import { useViewport } from '../../../../../hooks';
import { Card, Input } from '../../../../UI';

import { BookRecord } from '../../../../../types';

import classes from './CurrentBookList.module.scss';

interface BookProps {
  data: BookRecord[];
}

export const CurrentBookList: React.FC<BookProps> = ({ data }) => {
  const { width } = useViewport();
  const breakpoint = 992;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBooksList());
  }, [dispatch]);

  // temp
  const currentStatus = 'Completed';

  return (
    <div className={classes.bookList}>
      <Card>
        {data?.length === 0 ? (
          <h2 className={classes.bookList__fallback}>Found no books.</h2>
        ) : (
          <div className={classes.bookList__container}>
            <h2>{currentStatus}</h2>
            <div className={classes.bookList__search}>
              <Input type="text" id="search" placeholder="Search..." />
            </div>
            <div className={classes.bookList__list}>
              <div className={classes.bookList__names}>
                <div>#</div>
                <div>Title</div>
                <div>Author</div>
                <div className={classes.bookList__score}>Score</div>
                <div>Date</div>
              </div>
              {width >= breakpoint ? (
                <BookCards data={data} />
              ) : (
                <MobileBookCards data={data} />
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
