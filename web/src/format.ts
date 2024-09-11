function formatCount(count: number): string {
  return count >= 1000
    ? `${Math.floor(count / 1000)}k`
    : count.toString();
}

export { formatCount };
