const PALETTE = [
  "#8B5E34",
  "#4B6355",
  "#A63D40",
  "#3E5C76",
  "#6B4226",
  "#556B2F",
];

export function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}
