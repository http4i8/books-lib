import { useState } from 'react';

import { useClickOutside } from '../../../../../../../hooks';

import classes from './BookNotes.module.scss';

interface NoteProps {
  index: number;
  notes: string;
}

export const BookNotes = ({ index, notes }: NoteProps) => {
  const [spoilerIndex, setSpoilerIndex] = useState<number | null>(null);

  const toggleSpoiler = (index: number) => {
    if (spoilerIndex === index) {
      setSpoilerIndex(null);
    } else {
      setSpoilerIndex(index);
    }
  };

  const onCloseHandler = () => {
    setSpoilerIndex(null);
  };

  const dropdownRef = useClickOutside(onCloseHandler);

  return (
    <div ref={dropdownRef} className={classes.notes}>
      <button
        onClick={() => toggleSpoiler(index)}
        className={classes.notes__button}
      >
        Show notes
      </button>
      {spoilerIndex === index && (
        <div
          className={`${classes.notes__note} ${
            spoilerIndex === index ? classes.open : classes.closed
          }`}
        >
          {notes}
        </div>
      )}
    </div>
  );
};
