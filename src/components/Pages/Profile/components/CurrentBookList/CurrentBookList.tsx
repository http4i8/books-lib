import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  AppDispatch,
  changeListSelector,
  fetchBooksList,
} from '../../../../../store';
import { BookCards, MobileBookCards, SearchBar } from './components';
import { useViewport } from '../../../../../hooks';
import { Card } from '../../../../UI';

import { entriesHandler } from '../../../../../utils/entriesHandler';
import { BookRecord } from '../../../../../types';

import classes from './CurrentBookList.module.scss';

interface BookProps {
  data: BookRecord[];
}

export const CurrentBookList: React.FC<BookProps> = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentList = useSelector(changeListSelector);

  const { width } = useViewport();
  const breakpoint = 992;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const list = searchParams.get('list');
    if (!list) {
      const entries = entriesHandler(searchParams);
      setSearchParams({
        ...entries,
        list: '1',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchBooksList());
  }, [searchParams, dispatch]);

  return (
    <div className={classes.bookList}>
      <Card>
        <div className={classes.bookList__container}>
          <h2>{currentList.title}</h2>
          <SearchBar />
          {data?.length === 0 ? (
            <p className={classes.bookList__fallback}>Found no books.</p>
          ) : (
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
          )}
        </div>
      </Card>
    </div>
  );
};
