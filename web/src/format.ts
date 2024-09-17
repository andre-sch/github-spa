function formatCount(count: number): string {
  if (count >= 1000000)
    return `${Math.floor(count / 1000000)}M`;

  else if (count >= 1000)
    return `${Math.floor(count / 1000)}k`; 

  else return count.toString();
}

export { formatCount };
