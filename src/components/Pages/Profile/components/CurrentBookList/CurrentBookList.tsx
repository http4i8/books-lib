import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  AppDispatch,
  changeListSelector,
  fetchBooksList,
} from '../../../../../store';
import { BookCards, MobileBookCards, SearchBar, BookPages } from './components';
import { useViewport } from '../../../../../hooks';
import { Card } from '../../../../UI';

import { entriesHandler } from '../../../../../utils/entriesHandler';
import { BookRecord } from '../../../../../types';

import classes from './CurrentBookList.module.scss';
import { BookList } from '../../../../../types/bookList';

interface BookProps {
  bookList: BookList;
}

export const CurrentBookList: React.FC<BookProps> = ({ bookList }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentList = useSelector(changeListSelector);

  const currentPage = searchParams.get('p');

  const { width } = useViewport();
  const breakpoint = 992;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let additionalEntries = {};

    const list = searchParams.get('list');
    const p = searchParams.get('p');
    const entries = entriesHandler(searchParams);
    if (!list) {
      additionalEntries = {
        ...additionalEntries,
        list: '1',
      };
    }

    if (!p) {
      additionalEntries = {
        ...additionalEntries,
        p: '1',
      };
    }

    setSearchParams({
      ...entries,
      ...additionalEntries,
    });
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
          {bookList?.booksList.length === 0 ? (
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
                <BookCards data={bookList.booksList} />
              ) : (
                <MobileBookCards data={bookList.booksList} />
              )}
            </div>
          )}
          <BookPages
            current={+(currentPage || 1)}
            pages={bookList.totalPages}
          />
        </div>
      </Card>
    </div>
  );
};
