import { LOCALE } from './constants';

/**
 * Format a number to a locale string
 * @param value number to format
 * @param options options for formatting
 * @returns formatted number
 */
export function formatNumber(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(LOCALE, options).format(value);
}

/**
 * Format a date to a short date style
 * @param value date to format
 * @returns formatted date
 */
export function formatMediumDateStyle(value: string | number | Date) {
  return new Intl.DateTimeFormat(LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}