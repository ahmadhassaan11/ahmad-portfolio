/**
 * Date helpers. Server-evaluable; no Date locale tricks.
 */

const MONTHS = [
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
] as const;

/** "2025-04" → "Apr 2025". Throws on malformed input. */
export function formatYearMonth(yearMonth: string): string {
  const [year, month] = yearMonth.split("-");
  const m = MONTHS[Number(month) - 1];
  if (!year || !m) throw new Error(`formatYearMonth: invalid input "${yearMonth}"`);
  return `${m} ${year}`;
}

/**
 * Render a `start — end` experience range. `null` end = "Present".
 *   ("2025-04", null)     → "Apr 2025 — Present"
 *   ("2024-01","2025-03") → "Jan 2024 — Mar 2025"
 */
export function formatDateRange(start: string, end: string | null): string {
  return `${formatYearMonth(start)} — ${end ? formatYearMonth(end) : "Present"}`;
}

/** Build-time → "May 2026 · 04:13 UTC" for the footer. */
export function formatBuildTime(date: Date): string {
  const m = MONTHS[date.getUTCMonth()];
  const y = date.getUTCFullYear();
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mm = String(date.getUTCMinutes()).padStart(2, "0");
  return `${m} ${y} · ${hh}:${mm} UTC`;
}
