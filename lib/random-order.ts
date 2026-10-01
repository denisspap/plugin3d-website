/** A fresh permutation that differs from the previous visit, when possible. */
export function shuffledOrder(length: number, previous: number[] = [], random = Math.random): number[] {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  if (length > 1 && order.every((value, i) => value === previous[i])) {
    const other = 1 + Math.floor(random() * (length - 1));
    [order[0], order[other]] = [order[other], order[0]];
  }
  return order;
}

/** Skip repeated projects, including when fast scrolling jumps over several frames. */
export function differentProjectTarget(history: number[], position: number, direction: number, groups: string[], visible: number): number {
  while (position >= 0 && position < history.length && groups[history[position]] === groups[visible]) position += direction;
  return position;
}
