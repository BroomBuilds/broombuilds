/** Join truthy class names. The whole of clsx this site needs. */
export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}
