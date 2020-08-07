export const combineDateAndTime = (date: Date, time: Date) => {
  const timeString = time.getHours() + ":" + time.getMinutes() + ":00";

  const year = date.getFullYear();
  const month = date.getMonth() + 1; //the getMonth method is zero indexed
  const day = date.getDate();

  const dateString = `${year}-${month}-${day}`;

  const theNewDate = new Date(dateString + " " + timeString);
  return theNewDate;
};
