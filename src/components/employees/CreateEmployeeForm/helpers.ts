import { EventHandler } from '@/ui';
import { capitalize } from '@/utils';

export const capitalizeWords: EventHandler = ({ error, value, setValue }) => {
  if (!!error || !value) return;

  const capitalized: string = value.split(' ')
    .map(word => capitalize(word))
    .join(' ');

  !!setValue && setValue(capitalized);
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
