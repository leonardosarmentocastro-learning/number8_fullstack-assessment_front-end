import { BareFetcher, Fetcher,  } from 'swr';

export const fetchWithoutAuthentication: BareFetcher<any> = async ([ url ]: any[]): Promise<JSON> => {
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      "Accept-Language": 'en-us',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: 'get'
  });

  const data = await response.json();
  if (!response.ok) throw {
    ...data,
    status: response.status, // http status
  };

  return data;
};
