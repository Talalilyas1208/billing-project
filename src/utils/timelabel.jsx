
export const getTimeLabel = (lastSignIn) => { 
  if (!lastSignIn) return "Never";
  const lastDate = new Date(lastSignIn);
  const now = new Date();
  const diffInMs = now - lastDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return "This Week";
  if (diffInDays < 30 ) return "One month ago"
  return lastDate.toLocaleDateString();
};