import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";

const getTimeLeftMessage = (targetDate: Date): string => {
  const currentDate = new Date();
  const daysDifference = differenceInDays(targetDate, currentDate);

  if (daysDifference > 0) {
    return `${daysDifference} day${daysDifference > 1 ? "s" : ""} left`;
  }

  const hoursDifference = differenceInHours(targetDate, currentDate);
  if (hoursDifference > 0) {
    return `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} left`;
  }

  const minutesDifference = differenceInMinutes(targetDate, currentDate);
  if (minutesDifference > 0) {
    return `${minutesDifference} minute${minutesDifference > 1 ? "s" : ""} left`;
  }

  return "Market closed";
};

export const calculateMarketClosing = (
  blockHeight: number,
  lifetime: number
): {
  newDate: Date;
  isClosed: boolean;
  timeDiff: number;
  timeLeftMessage: string;
  formattedDate: string;
} => {
  let isClosed = false;
  const diff = lifetime - blockHeight;
  const targetDate = new Date();

  targetDate.setSeconds(targetDate.getSeconds() + diff);

  if (diff < 0) {
    isClosed = true;
  }

  let formattedDate = "";

  if (!isNaN(targetDate.getTime())) {
    formattedDate = format(targetDate, "dd MMM yyyy");
  } else {
    formattedDate = "Invalid Date";
  }

  return {
    newDate: targetDate,
    isClosed: isClosed,
    timeDiff: diff,
    timeLeftMessage: getTimeLeftMessage(targetDate),
    formattedDate: formattedDate,
  };
};
