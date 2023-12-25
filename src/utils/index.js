export const formatJoinDate = (dateString) => {
  const dateObj = new Date(dateString);
  const monthName = dateObj.toLocaleString("default", { month: "long" }); // Use 'long' for full month name
  const yearName = dateObj.getFullYear();
  return `Joined at ${monthName} ${yearName}`;
};

export function formatDateString(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  return formattedDate;
}

import DOMPurify from "dompurify";
export function calculateReadingTime(content) {
  const cleanContent = DOMPurify.sanitize(content); // Sanitize HTML for security
  const text = cleanContent.replace(/<[^>]+>/g, ""); // Remove HTML tags

  const words = text.trim().split(/\s+/).length;
  const averageWordsPerMinute = 250; // Adjust as needed
  const readingTimeInMinutes = Math.ceil(words / averageWordsPerMinute);

  const formattedTime =
    readingTimeInMinutes === 1 ? "1 min" : `${readingTimeInMinutes} min`;

  return formattedTime;
}
