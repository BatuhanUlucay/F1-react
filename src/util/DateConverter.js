export const convertDate = (dateString) => {
  const [year, month, day] = dateString.split('-');

  return new Date(+year, +month - 1, +day);
};

export const convertTimeZone = (timeString) => {
  if (timeString === undefined) {
    return ['', ''];
  }

  const today = new Date();
  const timeZone = today.getTimezoneOffset() / -60;
  // eslint-disable-next-line no-unused-vars
  let [hours, minutes, second] = timeString.split(':');

  if (+hours + timeZone < 10) {
    hours = '0' + (+hours + timeZone);
  } else {
    hours = +hours + timeZone;
  }

  return [hours, minutes];
};
