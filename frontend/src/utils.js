export function formatDate(dateStr) {
  const day = dateStr.substring(0, 2);
  const month = dateStr.substring(2, 4);
  const year = dateStr.substring(4, 8);

  return `${day}-${month}-${year}`;
}
