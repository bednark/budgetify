export const getCurrentMonthRange = (): { firstDay: string; lastDay: string } => {
  const now: Date = new Date();
  const year: number = now.getFullYear();
  const month: number = now.getMonth();

  const firstDay: string = new Date(year, month, 1).toISOString().split("T")[0];
  const lastDay: string = new Date(year, month + 1, 0).toISOString().split("T")[0];

  return { firstDay, lastDay };
};

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}