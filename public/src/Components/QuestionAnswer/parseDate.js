const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'Septempber',
  'October',
  'November',
  'December'
];

const parseDate = (dateTime) => {
  const dateTimeSplit = dateTime.split('T');
  const date = dateTimeSplit[0];
  const dateSplit = date.split('-');
  const year = dateSplit[0];
  const day = dateSplit[2];
  const month = months[Number(dateSplit[1])];
  return `${month} ${day}, ${year}`;
};

export default parseDate;