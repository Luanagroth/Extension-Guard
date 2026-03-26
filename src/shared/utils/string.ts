export const truncate = (value: string, maxLength = 120) =>
  value.length <= maxLength ? value : `${value.slice(0, maxLength - 1)}...`;
