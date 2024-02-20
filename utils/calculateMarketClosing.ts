import { differenceInDays, format } from "date-fns";

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

  // Check if targetDate is a valid date before formatting
  let formattedDate = "";
  if (!isNaN(targetDate.getTime())) {
    // Checks if targetDate is valid
    formattedDate = format(targetDate, "dd.MM.yyyy");
  } else {
    // Handle the invalid date case (e.g., by setting a default string or handling the logic differently)
    formattedDate = "Invalid Date"; // You can adjust this as needed
  }

  return {
    newDate: targetDate,
    isClosed: isClosed,
    daysLeft: daysLeft,
    formattedDate: formattedDate,
  };
};
