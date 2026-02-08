import type { SourceLocation } from 'estree'

export default function getLineFromLoc(
  loc: SourceLocation | null | undefined
): number {
  if (loc) {
    return loc.start.line
  }
  return 0
}
