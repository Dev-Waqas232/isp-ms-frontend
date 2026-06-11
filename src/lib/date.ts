/**
 * Formats a UTC or local date to local YYYY-MM-DD
 */
export function getLocalDateString(dateInput?: string | Date): string {
  const date = dateInput ? new Date(dateInput) : new Date();
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().slice(0, 10);
}

/**
 * Formats a date to local YYYY-MM-DDTHH:MM for datetime-local inputs
 */
export function getLocalDateTimeString(dateInput?: string | Date): string {
  const date = dateInput ? new Date(dateInput) : new Date();
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().slice(0, 16);
}

/**
 * Formats a date to local YYYY-MM
 */
export function getLocalMonthString(dateInput?: string | Date): string {
  const date = dateInput ? new Date(dateInput) : new Date();
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().slice(0, 7);
}

/**
 * Formats a raw YYYY-MM-DD date string (from database) or a Date object to a localized readable format
 */
export function formatLocalDate(dateStr?: string | Date): string {
  if (!dateStr) return "-";
  // If dateStr is a YYYY-MM-DD string, parse it as a local date to prevent timezone shift (don't parse it as UTC midnight)
  if (typeof dateStr === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split("-").map(Number);
    // month is 0-indexed in JS Date constructor
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString();
  }
  return new Date(dateStr).toLocaleDateString();
}
