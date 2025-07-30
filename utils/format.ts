import { format } from "date-fns";

export function formatDate(
  date: string | null,
  dateFormat: string = "MMM dd, yyyy",
) {
  return date ? format(new Date(date), dateFormat) : null;
}
