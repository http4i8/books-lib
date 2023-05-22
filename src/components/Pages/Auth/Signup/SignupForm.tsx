import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import axios, { AxiosError } from 'axios';
import useLocalStorage from '@rehooks/local-storage';

import { FormInput, Button, Spinner } from '../../../UI';

import { BASE_URL } from '../../../../constants';
import { routes } from '../../../../App/routes';
import {
  passwordStringField,
  PasswordValidation,
  validatePassword,
} from '../password-validation';
import { User, RegUser, Response } from '../../../../types';

import classes from '../Form.module.scss';

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email field cannot be empty',
    }),
  password: passwordStringField,
  confirm: Joi.string()
    .required()
    .equal(Joi.ref('password'))
    .messages({ 'any.only': 'Confirmation password does not match' }),
});

export const SignupForm = () => {
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      minLength: false,
      numDigit: false,
      lowercaseLetter: false,
      uppercaseLetter: false,
      specialChar: false,
    });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<RegUser>({
    mode: 'onChange',
    resolver: joiResolver(schema),
  });

  const [formError, setFormError] = useState({
    showError: false,
    message: '',
  });

  const [, setJwt] = useLocalStorage('token');
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegUser> = async (data: User) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/register`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        const response = await axios.post(`${BASE_URL}/user/auth`, data);
        setJwt(response.data.token);
        navigate(routes.profile);
      }
    } catch (error: unknown) {
      const err = error as AxiosError<Response<void>>;
      console.error(err);
      if (err.response?.status === 400) {
        setFormError({
          showError: true,
          message: 'User already exists',
        });
      }
    }
  };

  const passwordWatcher: string | undefined = watch('password');

  useEffect((): void => {
    setPasswordValidation(validatePassword(passwordWatcher));
  }, [passwordWatcher]);

  return (
    <div className={classes.form}>
      {formError.showError && (
        <div className={classes.form__error}>{formError.message}</div>
      )}
      <form className={classes.form__field} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.form__data}>
          <FormInput
            register={register('email')}
            label="Email"
            id="email"
            type="email"
            autoFocus
            error={errors?.email?.message}
          />
          <FormInput
            register={register('password')}
            label="Password"
            id="password"
            type="password"
            error={errors?.password?.message}
          />
          <FormInput
            register={register('confirm')}
            label="Repeat password"
            id="confirm"
            type="password"
            error={errors?.confirm?.message}
          />
          <div className={classes.form__passwordReq}>
            <label>Password requirements:</label>
            <ul>
              <li
                className={
                  passwordValidation.minLength ? classes.highlight : ''
                }
              >
                At least 6 characters in length
              </li>
              <li
                className={
                  passwordValidation.uppercaseLetter ? classes.highlight : ''
                }
              >
                At least one uppercase character
              </li>
              <li
                className={
                  passwordValidation.lowercaseLetter ? classes.highlight : ''
                }
              >
                At least one lowercase character
              </li>
              <li
                className={passwordValidation.numDigit ? classes.highlight : ''}
              >
                At least one digit
              </li>
              <li
                className={
                  passwordValidation.specialChar ? classes.highlight : ''
                }
              >
                At least one special character
              </li>
            </ul>
          </div>
        </div>

        <Button type="submit" disabled={!isDirty || !isValid}>
          {isSubmitting ? <Spinner /> : 'Sign up'}
        </Button>
      </form>
    </div>
  );
};
