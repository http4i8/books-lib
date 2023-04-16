import { useDispatch } from 'react-redux';

import { AppDispatch, deleteBook } from '../../../../../../../store';
import { ShowBookFormModal } from '../../../../../../ShowBookFormModal';

import classes from './BookEditBlock.module.scss';

interface BookEditBlockProps {
  bookId: number;
}
export const BookEditBlock = ({ bookId }: BookEditBlockProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const deleteBookHandler = () => {
    dispatch(deleteBook(bookId));
  };

  return (
    <div className={classes.editBlock}>
      <ShowBookFormModal bookId={bookId} title={'Edit book'}>
        <button type="button">edit</button>
      </ShowBookFormModal>

      <button
        onClick={deleteBookHandler}
        type="button"
        className={classes.editBlock__del}
      >
        ×
      </button>
    </div>
  );
};
