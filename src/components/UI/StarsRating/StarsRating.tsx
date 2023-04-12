import { useEffect, useState } from 'react';

import { Rating } from 'react-simple-star-rating';

interface StarsRatingProps {
  rate?: number;
  onChangeRating: (newRating: number) => void;
}

export const StarsRating = ({ onChangeRating, rate }: StarsRatingProps) => {
  const [rating, setRating] = useState(0);

  const handleRating = (newRating: number) => {
    setRating(newRating);
    onChangeRating(newRating);
  };

  useEffect(() => {
    setRating(rate || 0);
  }, [rate]);

  return (
    <Rating onClick={handleRating} initialValue={rating} transition={true} />
  );
};
