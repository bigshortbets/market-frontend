import { differenceInDays, format } from 'date-fns';

export const calculateMarketClosing = (
  blockHeight: number,
  lifetime: number
): {
  newDate: Date;
  isClosed: boolean;
  daysLeft: number;
  formattedDate: string;
} => {
  let isClosed = false;
  const diff = lifetime - blockHeight;
  const currentDate = new Date();
  const targetDate = new Date();

  targetDate.setSeconds(targetDate.getSeconds() + diff);

  if (diff < 0) {
    isClosed = true;
  }

  const daysLeft = differenceInDays(targetDate, currentDate);

  let formattedDate = '';
  if (!isNaN(targetDate.getTime())) {
    formattedDate = format(targetDate, 'dd MMM yyyy');
  } else {
    formattedDate = 'Invalid Date';
  }

  return {
    newDate: targetDate,
    isClosed: isClosed,
    daysLeft: daysLeft,
    formattedDate: formattedDate,
  };
};
