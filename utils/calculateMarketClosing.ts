import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";

export const calculateMarketClosing = (
  blockHeight: number,
  lifetime: number
): {
  newDate: Date;
  isClosed: boolean;
  timeLeft: string;
  formattedDate: string;
} => {
  let isClosed = false;
  const diff = lifetime - blockHeight;
  const targetDate = new Date();

  targetDate.setSeconds(targetDate.getSeconds() + 3600);

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
    timeLeft: calculateTimeLeft(targetDate),
    formattedDate: formattedDate,
  };
};

const calculateTimeLeft = (targetDate: Date): string => {
  const currentDate = new Date();

  const daysDifference = differenceInDays(targetDate, currentDate);
  let message = "";

  if (daysDifference > 0) {
    message += `${daysDifference} day${daysDifference > 1 ? "s" : ""} left`;
  } else {
    const hoursDifference = differenceInHours(targetDate, currentDate);
    if (hoursDifference > 0) {
      message += `${hoursDifference} hour${
        hoursDifference > 1 ? "s" : ""
      } left`;
    } else {
      const minutesDifference = differenceInMinutes(targetDate, currentDate);
      if (minutesDifference > 0) {
        message += `${minutesDifference} minute${
          minutesDifference > 1 ? "s" : ""
        } left`;
      } else {
        return "Market closed";
      }
    }
  }

  return message;
};
