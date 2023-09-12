import { useSearchParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import { BookRecord } from '../../../../../../../types/bookRecord';
import { BookEditBlock } from '../BookEditBlock/BookEditBlock';
import { BookNotes } from '../BookNotes';

import classes from './BookCards.module.scss';

interface BookProps {
  data: BookRecord[];
}

export const BookCards: React.FC<BookProps> = ({ data }) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('p');

  return (
    <div className={classes.bookCard}>
      {data?.map((item, index) => (
        <div key={item.id} className={classes.bookCard__block}>
          <div className={classes.bookCard__booksInfo}>
            <div className={classes.bookCard__counter}>
              {+(currentPage || 1) * 10 - 10 + index + 1}.
            </div>
            <div className={classes.bookCard__title}>{item.title}</div>
            <div className={classes.bookCard__author}>{item.author}</div>
            <div className={classes.bookCard__score}>
              <Rating initialValue={item.rate} readonly={true} size={16} />
            </div>
            {item.date ? <div>{item.date}</div> : <div>—</div>}
            <BookEditBlock bookId={item.id} />
            {item.notes && <BookNotes index={index} notes={item.notes} />}
          </div>
        </div>
      ))}
    </div>
  );
};
