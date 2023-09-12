import { useSearchParams } from 'react-router-dom';

import { Rating } from 'react-simple-star-rating';

import { BookEditBlock } from '../BookEditBlock/BookEditBlock';
import { BookNotes } from '../BookNotes';

import { BookRecord } from '../../../../../../../types/bookRecord';

import classes from './MobileBookCards.module.scss';

interface BookProps {
  data: BookRecord[];
}

export const MobileBookCards: React.FC<BookProps> = ({ data }) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('p');

  return (
    <div className={classes.bookCard}>
      {data?.map((item, index) => (
        <div key={item.id} className={classes.bookCard__block}>
          <div className={classes.bookCard__booksInfo}>
            <div className={classes.bookCard__score}>
              <Rating initialValue={item.rate} readonly={true} size={16} />
            </div>
            <BookEditBlock bookId={item.id} />
            <div className={classes.bookCard__titleBlock}>
              <span className={classes.bookCard__counter}>
                {+(currentPage || 1) * 10 - 10 + index + 1}.
              </span>
              <span className={classes.bookCard__title}>{item.title}</span>
            </div>
            <div className={classes.bookCard__author}>{item.author}</div>
            {item.date ? (
              <div className={classes.bookCard__date}>{item.date}</div>
            ) : (
              <div className={classes.bookCard__date}>—</div>
            )}

            {item.notes && <BookNotes index={index} notes={item.notes} />}
          </div>
        </div>
      ))}
    </div>
  );
};
