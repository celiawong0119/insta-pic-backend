import { getUnixTime } from 'date-fns';
export const getNowInUnixTimeFormat = (): number => getUnixTime(Date.now());
