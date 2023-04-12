import { useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';

import { AppDispatch, fetchBooksList } from '../../store';
import {
  Card,
  Input,
  Button,
  Textarea,
  Dropdown,
  StarsRating,
  Modal,
} from '../UI';

import { BookRecord, Response, StatusItem } from '../../types';
import { BASE_URL } from '../../constants';

import classes from './ManageBookForm.module.scss';

interface BookFormProps {
  title: string;
  bookId?: number;
  onClose: () => void;
}

// temp
const statusList: StatusItem[] = [
  { id: 1, title: 'Completed' },
  { id: 2, title: 'Planned' },
  { id: 3, title: 'In process' },
  { id: 4, title: 'Dropped' },
];

const bookField: Joi.StringSchema = Joi.string()
  .required()
  .max(30)
  .message('30 characters maximum')
  .messages({
    'string.empty': 'Text field cannot be empty',
  });

const schema = Joi.object({
  id: Joi.string().optional(),
  title: bookField,
  author: bookField,
  date: Joi.string().required().messages({
    'string.empty': 'Date field cannot be empty',
  }),
  notes: Joi.string().optional().allow('').max(5000),
});

export const ManageBookForm = ({ title, bookId, onClose }: BookFormProps) => {
  const [selectedStatus, setSelectedStatus] = useState(statusList[0]);
  const [selectedRate, setSelectedRate] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setSelectedRate(newRating);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookRecord>({ resolver: joiResolver(schema) });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (bookId) {
      axios.get(`${BASE_URL}/books/${bookId}`).then((response) => {
        reset({
          ...response.data,
          // to fix
          date: new Date(response.data.date).toISOString().slice(0, 10),
        });
        const foundStatus = statusList.find(
          (elm) => elm.id === response.data.status
        );
        setSelectedStatus(foundStatus || statusList[0]);
        setSelectedRate(response.data.rate);
      });
    }
  }, [bookId]);

  const onSubmit: SubmitHandler<BookRecord> = async (data) => {
    try {
      const responseData = {
        ...data,
        rate: selectedRate,
        status: selectedStatus.id,
      };
      await axios.post(`${BASE_URL}/books/add`, responseData);
      dispatch(fetchBooksList());
      onClose();
    } catch (error: unknown) {
      const err = error as AxiosError<Response<void>>;
      console.error(err);
    }
  };

  return (
    <Modal onClose={onClose}>
      <Card>
        <div>
          <div className={classes.form}>
            <h2>{title}</h2>
            <form
              className={classes.form__field}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={classes.form__star}>
                <StarsRating
                  onChangeRating={handleRatingChange}
                  rate={selectedRate}
                />
              </div>
              <Input
                register={register('title')}
                label="Title*"
                id="title"
                type="text"
                error={errors?.title?.message}
              />
              <Input
                register={register('author')}
                label="Author*"
                id="author"
                type="text"
                error={errors?.author?.message}
              />
              <div className={classes.form__miniBlock}>
                <Dropdown
                  dropdownItems={statusList}
                  onStatusChange={setSelectedStatus}
                  defaultItem={selectedStatus}
                />
                <Input
                  register={register('date')}
                  label="Date*"
                  id="date"
                  type="date"
                  error={errors?.date?.message}
                />
              </div>
              <Textarea
                register={register('notes')}
                id="notes"
                label="Notes"
                error={errors?.notes?.message}
              />
              <div className={classes.form__button}>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </Modal>
  );
};
