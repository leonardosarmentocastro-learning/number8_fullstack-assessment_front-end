'use client';

import {
  isDate,
  isMobilePhone,
  isPostalCode,
} from 'validator';

import {
  Callback,
  ComboboxOption,
  Validate,
} from '@/ui';
import {
  ERROR_CANT_BE_EMPTY,
  ERROR_INVALID_FIRST_NAME,
  ERROR_INVALID_HIRING_DATE,
  ERROR_INVALID_INTEGER,
  ERROR_INVALID_NAME,
  ERROR_INVALID_PHONE_NUMBER,
  ERROR_INVALID_ZIPCODE,
  ERROR_NEGATIVE_NUMBER,
  PHONE_LOCALES,
  POSTAL_CODE_LOCALES,
  VALIDATION_DATE_FORMAT,
} from './constants';


export const validateEmptyness: Validate = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);
  setError('');
};

export const validateFirstName: Validate = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);

  const hasCharactersOnly = /^[a-zA-Z]+$/;
  if (!hasCharactersOnly.test(value)) return setError(ERROR_INVALID_FIRST_NAME);

  setError('');
};

export const validateLastName: Validate = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);

  const hasCharactersAndSpacesOnly = /^[a-zA-Z\s]*$/;
  if (!hasCharactersAndSpacesOnly.test(value)) return setError(ERROR_INVALID_NAME);

  setError('');
};

export const validateCellphoneNumber: Validate = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);

  if (!isMobilePhone(value, PHONE_LOCALES, { strictMode: false })) return setError(ERROR_INVALID_PHONE_NUMBER);

  setError('');
};

export const validateHiringDate: Validate = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);

  try {
    const isValid = isDate(value, {
      format: VALIDATION_DATE_FORMAT,
      delimiters: ['/'],
      strictMode: true,
    });

    // The validation algorithim can throw if user haven't finished typing the whole string
    if (!isValid) return setError(ERROR_INVALID_HIRING_DATE);
  } catch(err) {
    // If so, mark it as an error regardless
    return setError(ERROR_INVALID_HIRING_DATE);
  }

  setError('');
};

export const validateNumber: Validate = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);

  if (isNaN(Number(value)) || !Number.isInteger(Number(value))) return setError(ERROR_INVALID_INTEGER);

  const number = parseInt(value);
  if (number <= 0) return setError(ERROR_NEGATIVE_NUMBER);

  setError('');
};

export const validateOptionChange: Callback = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);

  setError('');
};

export const validateZipcode: Callback = ({ setError, value }) => {
  if (!value) return setError(ERROR_CANT_BE_EMPTY);

  const isValid = POSTAL_CODE_LOCALES.some(locale => isPostalCode(value, locale));
  if (!isValid) return setError(ERROR_INVALID_ZIPCODE);

  setError('');
};

type Evaluate = ({ fields, errorFields }: {
  fields: Array<string | ComboboxOption | null>,
  errorFields: Array<string>,
}) => {
  borderClassnames: string,
  isInvalid: boolean,
  isValid: boolean,
  isPristine: boolean,
  textClassnames: string,
};
export const evaluateForm: Evaluate = ({ fields, errorFields }) => {
  const isInvalid = errorFields.some(field => !!field);
  const isValid = !isInvalid && fields.every(field => !!field);
  const isPristine = errorFields.every(ef => !ef) && fields.every(f => !f);
  const isIdle = (!isInvalid && !isValid && !isPristine);

  const borderClassnames = isPristine || isIdle ? 'border-[#98A1A8]' : isValid ? 'border-[#DAFDCC]' : 'border-[#FF7D7B]';
  const textClassnames = isPristine || isIdle ? 'text-[#98A1A8]' : isValid ? 'text-[#DAFDCC]' : 'text-[#FF7D7B]';

  return {
    borderClassnames,
    isInvalid,
    isValid,
    isPristine,
    textClassnames,
  };
};
