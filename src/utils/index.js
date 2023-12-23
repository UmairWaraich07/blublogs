export const formatJoinDate = (dateString) => {
  const dateObj = new Date(dateString);
  const monthName = dateObj.toLocaleString("default", { month: "long" }); // Use 'long' for full month name
  const yearName = dateObj.getFullYear();
  return `Joined at ${monthName} ${yearName}`;
};
