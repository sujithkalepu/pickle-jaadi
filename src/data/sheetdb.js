/**
 * Paste your SheetDB API URL here.
 * Example: https://sheetdb.io/api/v1/xxxxxxxx
 *
 * Google Sheet header row should be:
 * Date | Name | Phone | Address | Items | Weight | Total | Status
 */
export const SHEETDB_API_URL = (
  import.meta.env.VITE_SHEETDB_URL || 'https://sheetdb.io/api/v1/6hz5lv9h4a5ez'
).trim();
