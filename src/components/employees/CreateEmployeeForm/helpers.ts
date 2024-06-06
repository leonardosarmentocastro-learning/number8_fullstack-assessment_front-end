import dayjs from 'dayjs';

import { EventHandler } from '@/ui';
import { capitalize } from '@/utils';
import { EMPLOYEE_DEFAULT_PROFILE_PICTURES, VALIDATION_DATE_FORMAT } from './constants';

export const capitalizeWords: EventHandler = ({ error, value, setValue }) => {
  if (!!error || !value) return;

  const capitalized: string = value.split(' ')
    .map(word => capitalize(word))
    .join(' ');

  !!setValue && setValue(capitalized);
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const formatDate = (date: Date) => dayjs(date).format(VALIDATION_DATE_FORMAT);

export const randomPicture = ():string => EMPLOYEE_DEFAULT_PROFILE_PICTURES[Math.floor(Math.random() * EMPLOYEE_DEFAULT_PROFILE_PICTURES.length)];
