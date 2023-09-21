const FormatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const americanDate = `${month}/${day}/${year}`;
  const americanTime = `${hours}:${minutes}`;

  return `${americanDate} ${americanTime}`;
};

export default FormatDate; 