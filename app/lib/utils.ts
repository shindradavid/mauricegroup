import { format } from 'date-fns';

export function formatCurrency(amount: number, currencyCode: string = 'UGX', locale: string = 'en-US'): string {
  return amount?.toLocaleString(locale, {
    style: 'currency',
    currency: currencyCode,
  });
}

export const combineDateAndTime = (date: Date, time: string): string => {
  return `${format(date, 'yyyy-MM-dd')}T${time}`;
};
