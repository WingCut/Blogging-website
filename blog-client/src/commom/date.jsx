export const getDay = (timestamp) => {
  // Ensure the input timestamp is valid
  if (!timestamp) return "Invalid date";

  const date = new Date(timestamp);
  const currentYear = new Date().getFullYear();
  const inputYear = date.getFullYear();

  // Ensure the date object is valid
  if (isNaN(date.getTime())) return "Invalid date";

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  let formattedTimestamp;
  if (inputYear === currentYear) {
    formattedTimestamp = `${day} thg ${month}`;
  } else {
    formattedTimestamp = `${day} thg ${month},${inputYear}`;
  }

  return formattedTimestamp;
};
