import { DateTime } from "luxon";

export const getTimeLabel = (lastSignIn) => {
  if (!lastSignIn) return "Never";

  const lastDate = DateTime.fromISO(lastSignIn);
  const now = DateTime.now();
  const diffInDays = Math.floor(now.diff(lastDate, "days").days);

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return "This Week";
  if (diffInDays < 30) return "One month ago";
  return lastDate.toLocaleString(DateTime.DATE_SHORT);
};