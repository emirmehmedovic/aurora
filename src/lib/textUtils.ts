// Bosnian/Serbian/Croatian diacritics mapping
const DIACRITICS_MAP: Record<string, string> = {
  'š': 's', 'Š': 'S',
  'đ': 'd', 'Đ': 'D',
  'č': 'c', 'Č': 'C',
  'ć': 'c', 'Ć': 'C',
  'ž': 'z', 'Ž': 'Z',
};

export function removeDiacritics(text: string): string {
  return text
    .split('')
    .map(char => DIACRITICS_MAP[char] || char)
    .join('');
}

export function normalizeNameForMatching(name: string): string {
  return removeDiacritics(name)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Calculate Levenshtein distance for fuzzy matching
 */
export function calculateLevenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function isNameSimilar(name1: string, name2: string, threshold: number = 2): boolean {
  const normalized1 = normalizeNameForMatching(name1);
  const normalized2 = normalizeNameForMatching(name2);

  if (normalized1 === normalized2) return true;

  const distance = calculateLevenshteinDistance(normalized1, normalized2);
  return distance <= threshold;
}
