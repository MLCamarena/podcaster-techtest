import { checkMaxAgePersistence, getParsedDate, getParsedDuration } from '@utils/date';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

describe('Date utils', () => {
  test('Should be true if more than 24h till date received', () => {
    const securedDate = new Date(2023, 5, 10).getTime();
    const bool = checkMaxAgePersistence(securedDate);
    expect(bool).toBe(true);
  });

  test('Should be false if less than 24h till date received', () => {
    const securedDate = Date.now() - 123;
    const bool = checkMaxAgePersistence(securedDate);
    expect(bool).toBe(false);
  });

  test('Should return a valid date string with a valid timestamp provided', () => {
    const timestamp = 1692401990830;

    const result = getParsedDate(timestamp);
    expect(result).toBe('19/08/2023');
  });

  test('Should return Unknown if no valid date is provided', () => {
    const result = getParsedDate(0);
    expect(result).toBe('Unknown');
  });

  test('should return formatted duration when timestamp is provided', () => {
    const timestamp = 9835000;
    const result = getParsedDuration(timestamp);
    expect(result).toBe('02:43:55');
  });

  test('Should return Unknown if no valid duration is provided', () => {
    const result = getParsedDuration(0);
    expect(result).toBe('Unknown');
  });
});
