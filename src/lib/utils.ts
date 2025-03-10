/**
 * Validates a URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Truncates a string to a specified length
 */
export function truncateString(str: string, len: number): string {
  if (str.length <= len) return str;
  return `${str.substring(0, len)}...`;
}

/**
 * Formats a number with commas for thousands
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
