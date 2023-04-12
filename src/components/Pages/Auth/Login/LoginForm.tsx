import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import useLocalStorage from '@rehooks/local-storage';
import { useForm, SubmitHandler } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { Input, Button, Spinner } from '../../../UI';

import { routes } from '../../../../App/routes';
import { BASE_URL } from '../../../../constants';
import { passwordStringField } from '../password-validation';
import { User, Response } from '../../../../types';

import classes from '../Form.module.scss';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email field cannot be empty',
    }),
  password: passwordStringField,
});

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<User>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
    resolver: joiResolver(schema),
  });

  const [, setJwt] = useLocalStorage('token');
  const navigate = useNavigate();
  const [formError, setFormError] = useState({
    showError: false,
    message: '',
  });

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/auth`, data);
      setJwt(response.data.token);
      navigate(routes.profile);
    } catch (error: unknown) {
      const err = error as AxiosError<Response<void>>;
      console.error(err);
      if (err.response?.status === 400 || err.response?.status === 401) {
        setFormError({
          showError: true,
          message: 'Password or email is incorrect',
        });
      }
    }
  };

  return (
    <div className={classes.form}>
      {formError.showError && (
        <div className={classes.form__error}>{formError.message}</div>
      )}
      <form className={classes.form__field} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.form__data}>
          <Input
            register={register('email')}
            label="Email"
            id="email"
            type="email"
            autoFocus
            error={errors?.email?.message}
          />
          <Input
            register={register('password')}
            label="Password"
            id="password"
            type="password"
            error={errors?.password?.message}
          />
        </div>
        <Button type="submit" disabled={!isValid}>
          {isSubmitting ? <Spinner /> : 'Log in'}
        </Button>
      </form>
    </div>
  );
};
