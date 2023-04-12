import { ShowBookFormModal } from '../ShowBookFormModal';
import { Button } from '../UI';

import classes from './AddNewBookBtn.module.scss';

export const AddNewBookBtn = () => {
  return (
    <div className={classes.newBook__btn}>
      <ShowBookFormModal title={'Add a new book'}>
        <Button type="button">Add a new book</Button>
      </ShowBookFormModal>
    </div>
  );
};
