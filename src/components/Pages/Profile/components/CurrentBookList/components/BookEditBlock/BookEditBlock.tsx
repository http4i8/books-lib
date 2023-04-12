import { ShowBookFormModal } from '../../../../../../ShowBookFormModal';

import classes from './BookEditBlock.module.scss';

interface BookEditBlockProps {
  bookId: number;
}
export const BookEditBlock = ({ bookId }: BookEditBlockProps) => {
  return (
    <div className={classes.editBlock}>
      <ShowBookFormModal bookId={bookId} title={'Edit book'}>
        <button type="button">edit</button>
      </ShowBookFormModal>

      <button type="button" className={classes.editBlock__del}>
        ×
      </button>
    </div>
  );
};
