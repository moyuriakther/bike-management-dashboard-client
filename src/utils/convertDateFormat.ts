export const convertDateFormat = (dateString: string): string => {
  console.log(dateString);
  const parts: string[] | undefined = dateString?.split(".");
  if (parts && parts.length === 3) {
    const year: number = parseInt(parts[2], 10);
    const month: number = parseInt(parts[0], 10) - 1;
    const day: number = parseInt(parts[1], 10);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      const dateObject: Date = new Date(year + 2000, month, day, 12, 30, 0, 0);
      if (!isNaN(dateObject.getTime())) {
        const formattedDate: string = dateObject.toISOString();
        return formattedDate;
      } else {
        console.error("Invalid dateObject:", dateObject);
      }
    } else {
      console.error("Invalid year, month, or day:", year, month, day);
    }
  } else {
    console.error("Invalid parts array:", parts);
  }
  return "";
};
