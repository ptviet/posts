import moment from 'moment';

export const millisecToDate = (milisec: any) => {
  return moment(parseInt(milisec, 10)).format('DD MMM YYYY, HH:MM:SS');
};
