import {
  MobilePhoneLocale,
  PostalCodeLocale,
} from 'validator';
import { ComboboxOption } from '@/ui';

// TODO: move to own file
export const ERROR_CANT_BE_EMPTY = "Can't be empty";
export const ERROR_INVALID_NAME = "Characters only.";
export const ERROR_INVALID_FIRST_NAME = "Single word with characters only.";
export const ERROR_INVALID_PHONE_NUMBER = "Invalid phone number.";
export const ERROR_INVALID_HIRING_DATE = 'Invalid date.';
export const ERROR_INVALID_INTEGER = 'Invalid numeric value';
export const ERROR_NEGATIVE_NUMBER = 'Number must be above 0.';
export const ERROR_INVALID_ZIPCODE = 'Invalid zip code.';

const PHONE_LOCALE_ARGENTINA = 'es-AR';
const PHONE_LOCALE_BRAZIL = 'pt-BR';
const PHONE_LOCALE_UNITED_STATES = 'en-US';
export const PHONE_LOCALES: MobilePhoneLocale[] = [
  PHONE_LOCALE_ARGENTINA,
  PHONE_LOCALE_BRAZIL,
  PHONE_LOCALE_UNITED_STATES,
];

const POSTAL_CODE_AMERICA_LOCALE = 'US';
// const POSTAL_CODE_ARGENTINA_LOCALE = 'AR'; // unavailable
const POSTAL_CODE_BRAZIL_LOCALE = 'BR';
export const POSTAL_CODE_LOCALES: PostalCodeLocale[] = [
  POSTAL_CODE_AMERICA_LOCALE,
  // POSTAL_CODE_ARGENTINA_LOCALE, // unavailable
  POSTAL_CODE_BRAZIL_LOCALE,
];

const EMPLOYEE_DEFAULT_PROFILE_PICTURE_1 = 'https://i.pinimg.com/564x/24/cb/d0/24cbd09ac15f566a5b89eca6c52aca26.jpg';
const EMPLOYEE_DEFAULT_PROFILE_PICTURE_2 = 'https://i.pinimg.com/564x/24/cb/d0/24cbd09ac15f566a5b89eca6c52aca26.jpg';
const EMPLOYEE_DEFAULT_PROFILE_PICTURE_3 = 'https://i.pinimg.com/564x/9e/41/d7/9e41d75c7b842b3da6f1c182a4c9f04f.jpg';
const EMPLOYEE_DEFAULT_PROFILE_PICTURE_4 = 'https://i.pinimg.com/564x/1d/b7/f5/1db7f5423caa43a23f86585f8de50960.jpg';
const EMPLOYEE_DEFAULT_PROFILE_PICTURE_5 = 'https://i.pinimg.com/564x/a5/87/df/a587df534c24274bdcf8ff3f3cdb334c.jpg';
const EMPLOYEE_DEFAULT_PROFILE_PICTURE_6 = 'https://i.pinimg.com/564x/ed/e4/40/ede440670624cb6e6caf792e04e982fd.jpg';
const EMPLOYEE_DEFAULT_PROFILE_PICTURE_7 = 'https://i.pinimg.com/564x/63/e1/be/63e1be3f90c536e69d8d2b6cab921109.jpg';
export const EMPLOYEE_DEFAULT_PROFILE_PICTURES = [
  EMPLOYEE_DEFAULT_PROFILE_PICTURE_1,
  EMPLOYEE_DEFAULT_PROFILE_PICTURE_2,
  EMPLOYEE_DEFAULT_PROFILE_PICTURE_3,
  EMPLOYEE_DEFAULT_PROFILE_PICTURE_4,
  EMPLOYEE_DEFAULT_PROFILE_PICTURE_5,
  EMPLOYEE_DEFAULT_PROFILE_PICTURE_6,
  EMPLOYEE_DEFAULT_PROFILE_PICTURE_7,
];

export const EMPLOYEE_STATUS_OPTION_ACTIVE = {
  id: '0',
  name: 'Active',
  value: true,
};
export const EMPLOYEE_STATUS_OPTION_INACTIVE = {
  id: '1',
  name: 'Inactive',
  value: false,
};
export const EMPLOYEE_STATUSES: ComboboxOption[] = [ EMPLOYEE_STATUS_OPTION_ACTIVE, EMPLOYEE_STATUS_OPTION_INACTIVE ];

export const ELEMENTS_BUSY_CLASSNAMES = 'aria-busy:opacity-0';
export const FORM_BUSY_CLASSNAMES = 'relative aria-busy:border-0 after:aria-busy:absolute after:aria-busy:content-[""] after:aria-busy:w-full after:aria-busy:h-full after:aria-busy:bg-gray-600 after:aria-busy:animate-pulse after:aria-busy:top-0 after:aria-busy:left-0 after:aria-busy:rounded-[1rem]';
export const PICTURE_BUSY_CLASSNAMES = 'after:aria-busy:absolute after:aria-busy:content-[""] after:aria-busy:w-[14rem] after:aria-busy:h-[14rem] after:aria-busy:bg-gray-600 after:aria-busy:animate-pulse after:aria-busy:rounded-[.5rem]';

export const VALIDATION_DATE_FORMAT = 'MM/DD/YYYY';
