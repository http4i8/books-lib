import Joi from 'joi';

export const oneNumberReg = /(?=.*\d)/;
export const oneLowercaseReg = /(?=.*[a-z])/;
export const oneUppercaseReg = /(?=.*[A-Z])/;
export const oneSpecialReg = /(?=.*\W)/;
export const noSpaceReg = /[^-\s]/;

export const passwordStringField: Joi.StringSchema = Joi.string()
  .required()
  .min(6)
  .message('6 characters minimum required')
  .max(16)
  .message('16 characters maximum required')
  .pattern(oneSpecialReg, 'oneSpec')
  .message('One special character required')
  .pattern(oneNumberReg, 'oneNumber')
  .message('One number required')
  .pattern(oneLowercaseReg, 'oneLower')
  .message('One lowercase character required')
  .pattern(oneUppercaseReg, 'oneUpper')
  .message('One uppercase character required')
  .pattern(noSpaceReg, 'noSpace')
  .message('Must not contain spaces')
  .messages({
    'string.empty': 'Password field cannot be empty',
  });

export interface PasswordValidation {
  minLength: boolean;
  numDigit: boolean;
  lowercaseLetter: boolean;
  uppercaseLetter: boolean;
  specialChar: boolean;
}

export const validatePassword = (password?: string): PasswordValidation => {
  const result: PasswordValidation = {
    minLength: false,
    numDigit: false,
    lowercaseLetter: false,
    uppercaseLetter: false,
    specialChar: false,
  };

  if (password) {
    if (password?.length >= 6) {
      result.minLength = true;
    }

    if (new RegExp(oneNumberReg).test(password)) {
      result.numDigit = true;
    }

    if (new RegExp(oneLowercaseReg).test(password)) {
      result.lowercaseLetter = true;
    }

    if (new RegExp(oneUppercaseReg).test(password)) {
      result.uppercaseLetter = true;
    }

    if (
      new RegExp(oneSpecialReg).test(password) &&
      new RegExp(noSpaceReg).test(password)
    ) {
      result.specialChar = true;
    }
  }

  return result;
};
