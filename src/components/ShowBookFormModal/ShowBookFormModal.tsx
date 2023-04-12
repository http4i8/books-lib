import React, { useState } from 'react';

import { ManageBookForm } from '../ManageBookForm';

interface ShowModalProps {
  children: JSX.Element;
  title: string;
  bookId?: number;
}

export const ShowBookFormModal = ({
  children,
  title,
  bookId,
}: ShowModalProps) => {
  const [isShown, setIsShown] = useState(false);

  const closeFormHandler = () => {
    setIsShown(false);
  };

  const showFormHandler = () => {
    setIsShown(true);
  };

  return (
    <>
      {isShown && (
        <ManageBookForm
          bookId={bookId}
          onClose={closeFormHandler}
          title={title}
        />
      )}
      {React.cloneElement(children, { onClick: showFormHandler })}
    </>
  );
};
