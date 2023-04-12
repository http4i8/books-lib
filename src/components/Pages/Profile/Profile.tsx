import { useSelector } from 'react-redux';

import { booksListSelector } from '../../../store/slices/selectors';
import { useViewport } from '../../../hooks';
import { BookStatus, AddNewBookBtn, Chart, CurrentBookList } from './';
import { Container } from '../../UI/';

import classes from './Profile.module.scss';

export const Profile = () => {
  const { width } = useViewport();
  const breakpoint = 1070;

  const bookList = useSelector(booksListSelector);

  return (
    <Container>
      <div className={classes.profile}>
        <main className={classes.profile__container}>
          {width > breakpoint ? (
            <div className={classes.profile__buttons}>
              <AddNewBookBtn />
              <BookStatus />
            </div>
          ) : (
            ''
          )}
          <div className={classes.profile__chart}>
            <Chart />
          </div>
          <div className={classes.profile__list}>
            <CurrentBookList data={bookList} />
          </div>
        </main>
      </div>
    </Container>
  );
};
