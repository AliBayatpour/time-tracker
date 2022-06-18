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

export const formatDateV1 = (d: Date) => {
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
};

export const getLastNDays = (n: number): string[] => {
  var result = [];
  for (let i = 0; i < n; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    result.push(formatDateV1(d));
  }

  return result.reverse();
};

export const convertMinToReadable = (min: number) => {
  const floorMin = Math.floor(min);
  const floorHour = Math.floor(floorMin / 60);
  return `${floorHour} h and ${floorMin % 60} min`;
};
