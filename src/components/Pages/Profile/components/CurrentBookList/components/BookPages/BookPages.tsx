import { useSearchParams } from 'react-router-dom';

import { entriesHandler } from '../../../../../../../utils/entriesHandler';

import classes from './BookPages.module.scss';

interface BookPagesProps {
  pages: number;
  current: number;
}

export const BookPages = (props: BookPagesProps) => {
  const { pages, current } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  /* @ts-ignore */
  const pagesList: Array<number> = Array.apply(null, { length: pages + 1 }).map(
    Number.call,
    Number
  );

  pagesList.shift();

  const onActiveHandler = (event: any) => {
    const entries = entriesHandler(searchParams);

    setSearchParams({
      ...entries,
      p: event.target.innerText,
    });
  };

  return (
    <ul className={classes.pages}>
      {pagesList?.map((page: number) => (
        <li
          key={page}
          onClick={onActiveHandler}
          className={
            current === page
              ? `${classes.page} ${classes.current}`
              : classes.page
          }
        >
          {page}
        </li>
      ))}
    </ul>
  );
};
